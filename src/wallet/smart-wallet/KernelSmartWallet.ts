import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import { createKernelAccount, createKernelAccountClient } from '@zerodev/sdk';
import { CallType } from '@zerodev/sdk/types';
import {
  EstimateUserOperationGasReturnType,
  UserOperation,
  deepHexlify,
  estimateUserOperationGas,
  isSmartAccountDeployed,
} from 'permissionless';
import {
  Account,
  Address,
  Chain,
  EstimateGasParameters,
  Hex,
  HttpTransport,
  RpcError,
  SendTransactionParameters,
  TimeoutError,
  SignableMessage as ViemSignableMessage,
  createPublicClient,
  encodeFunctionData,
  http,
  parseAbi,
  parseEventLogs,
  publicActions,
  toHex,
} from 'viem';
import { KriptonioError } from '../../Error';
import { sponsorUserOperation } from '../../api/PaymasterApi';
import { OperationStatus } from '../../enum/OperationStatus';
import { getChain } from '../../utils/chain';
import { assertHex } from '../../utils/error';
import { sleep } from '../../utils/time';
import { exportSource, isValidSource, sourceToAccount } from '../Helpers';
import {
  DeployResponse,
  DeployWallet,
  OperationOptions,
  SignableMessage,
  TypedData,
} from '../Wallet';
import {
  ExportedKernelWallet,
  KernelWalletConfig,
  KernelWalletWrapperConfig,
} from '../WalletConfig';
import {
  PartialUserOperation,
  SmartWallet,
  UserOperationInfo,
} from './SmartWallet';

export type KernelClient = Awaited<
  ReturnType<typeof KernelSmartWallet.createKernelClient>
>;

// source-code https://github.com/safe-global/safe-contracts/blob/0acdd35a203299585438f53885df630f9d486a86/contracts/libraries/CreateCall.sol
const createCallAddress = '0x9b35Af71d77eaf8d7e40252370304687390A1A52';

const createCallAbi = parseAbi([
  'function performCreate(uint256 value, bytes memory deploymentData) public returns (address newContract)',
  'function performCreate2(uint256 value, bytes memory deploymentData, bytes32 salt) public returns (address newContract)',
  'event ContractCreation(address indexed newContract)',
]);

export class KernelSmartWallet extends SmartWallet {
  #config: KernelWalletWrapperConfig;
  #client: KernelClient;

  constructor(config: KernelWalletWrapperConfig, client: KernelClient) {
    super(client.chain);
    this.#client = client;
    this.#config = config;
  }

  public get client(): KernelClient {
    return this.#client;
  }

  public override get rpcUrl(): string | undefined {
    return this.#config.kernel.rpcUrl;
  }

  public override get address(): Hex {
    return this.#client.account.address;
  }

  public override get entryPoint(): Hex {
    return this.#client.account.entryPoint;
  }

  public override getNonce(): Promise<bigint> {
    return this.#client.account.getNonce();
  }

  public override signMessage(message: SignableMessage): Promise<Hex> {
    return this.#client.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public override signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#client.signTypedData({
      message: typedData.message,
      primaryType: typedData.primaryType,
      types: typedData.types,
      domain: typedData.domain,
    });
  }

  public deploy = async (options?: OperationOptions): Promise<Hex | null> => {
    const deployed = await this.isDeployed();
    if (deployed) {
      return null;
    }

    return this.sendTransaction(
      {
        to: this.address,
      },
      options
    );
  };

  public isDeployed = (): Promise<boolean> => {
    return isSmartAccountDeployed(
      this.#client.extend(publicActions),
      this.address
    );
  };

  public override async estimateGas(
    tx: EstimateGasParameters<Chain>
  ): Promise<bigint> {
    const isDeployment = !tx.to;

    const userOperation = await this.#client.prepareUserOperationRequest(
      isDeployment
        ? {
            userOperation: await this.buildDeployUserOperation({
              data: tx.data ?? '0x',
              value: tx.value ?? BigInt(0),
            }),
          }
        : {
            userOperation: await this.buildCallUserOperation({
              to: tx.to ?? '0x',
              data: tx.data ?? '0x',
              value: tx.value ?? BigInt(0),
            }),
          }
    );

    const estimation = await this.estimateUserOperationGas(userOperation);
    return (
      estimation.callGasLimit +
      estimation.verificationGasLimit +
      estimation.preVerificationGas
    );
  }

  public override async sendTransaction(
    tx: SendTransactionParameters<Chain, Account>,
    options?: OperationOptions
  ): Promise<Hex> {
    // deployment transaction
    if (!tx.to) {
      const deployment = await this.deployContract(
        {
          bytecode: tx.data ?? '0x',
          value: tx.value,
        },
        options
      );

      return deployment.hash;
    }

    // regular transaction
    const callData = await this.createCallData({
      to: tx.to,
      value: tx.value,
      data: tx.data,
    });

    options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
    const userOperation = await this.#client.prepareUserOperationRequest({
      userOperation: {
        callData,
      },
    });

    options?.onStatusChange?.(OperationStatus.SendingUserOperation);
    const userOpHash = await this.sendUserOperation(userOperation);

    options?.onStatusChange?.(OperationStatus.WaitingForUserOperation);
    const userOpInfo = await this.waitForUserOperation(userOpHash);

    if (!userOpInfo) {
      throw new KriptonioError({
        message: `user operation receipt ${userOpHash} not found. transaction failed`,
      });
    }

    if (!userOpInfo.success) {
      throw new KriptonioError({
        message: `user operation ${userOpHash} failed`,
      });
    }

    return userOpInfo.transactionHash;
  }

  public createCallData(input: {
    to: string;
    value?: bigint | undefined;
    data?: string | undefined;
    callType?: CallType;
  }): Promise<Hex> {
    return this.#client.account.encodeCallData({
      to: assertHex(input.to, 'to'),
      value: input.value ?? 0n,
      data: (input.data as Hex | undefined) ?? '0x',
      callType: input.callType,
    });
  }

  public override estimateUserOperationGas(
    userOperation: UserOperation
  ): Promise<EstimateUserOperationGasReturnType> {
    return estimateUserOperationGas(this.#client, {
      userOperation,
      entryPoint: this.entryPoint,
    });
  }

  public override sendUserOperation(
    userOperation: PartialUserOperation
  ): Promise<Hex> {
    return this.#client.sendUserOperation({
      userOperation: userOperation,
    });
  }

  public override export(): ExportedKernelWallet {
    return {
      version: '1.0',
      kernel: {
        version: this.#config.kernel.version,
        ...exportSource(this.#config.kernel),
      },
    };
  }

  public deployContract = async (
    deploy: DeployWallet,
    options?: OperationOptions
  ): Promise<DeployResponse> => {
    options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
    const userOperation = await this.#client.prepareUserOperationRequest({
      userOperation: await this.buildDeployUserOperation({
        data: assertHex(deploy.bytecode, 'bytecode'),
        value: deploy.value ?? BigInt(0),
      }),
    });

    options?.onStatusChange?.(OperationStatus.SendingUserOperation);
    const userOpHash = await this.sendUserOperation(userOperation);

    options?.onStatusChange?.(OperationStatus.WaitingForUserOperation);
    const userOpInfo = await this.waitForUserOperation(userOpHash);

    if (!userOpInfo) {
      throw new KriptonioError({
        message: `user operation receipt ${userOpHash} not found`,
      });
    }

    if (!userOpInfo.success) {
      throw new KriptonioError({
        message: `user operation ${userOpHash} failed`,
      });
    }

    options?.onStatusChange?.(OperationStatus.GettingContractAddress);
    const address = await this.getContractAddress(userOpInfo.transactionHash);

    return {
      hash: userOpInfo.transactionHash,
      address,
    };
  };

  public waitForUserOperation = async (
    userOpHash: Hex,
    timeout = 60_000
  ): Promise<UserOperationInfo | null> => {
    const publicClient = this.#client.extend(publicActions);

    const currentBlock = await publicClient.getBlockNumber();
    let elapsed = 0;
    const stepWaitTime = 1000; // 1 sec

    while (elapsed < timeout) {
      elapsed += 1000;

      try {
        const logs = await publicClient.getLogs({
          address: this.entryPoint,
          event: userOperationEventAbi,
          args: {
            userOpHash,
          },
          fromBlock: currentBlock - 50n,
          toBlock: 'latest',
        });

        if (!logs.length) {
          await sleep(stepWaitTime);
          continue;
        }

        return {
          success: logs[0].args.success,
          transactionHash: logs[0].transactionHash,
        };
      } catch (e) {
        if (e instanceof RpcError) {
          await sleep(stepWaitTime);
          continue;
        }

        if (e instanceof TimeoutError) {
          continue;
        }

        return null;
      }
    }

    return null;
  };

  private buildCallUserOperation = (input: {
    to: Hex;
    data: Hex;
    value: bigint;
  }) => {
    return this.buildUserOperation(
      {
        to: input.to,
        data: input.data,
        value: input.value,
      },
      'call'
    );
  };

  private buildDeployUserOperation = (input: { data: Hex; value: bigint }) => {
    return this.buildUserOperation(
      {
        to: createCallAddress,
        data: this.buildDeployData(input.value, input.data),
        value: input.value,
      },
      'delegatecall'
    );
  };

  private buildUserOperation = async (
    input: {
      to: Hex;
      data: Hex;
      value: bigint;
    },
    callType: CallType
  ) => {
    return {
      callData: await this.createCallData({
        callType,
        data: input.data,
        to: input.to,
        value: input.value,
      }),
    };
  };

  private buildDeployData = (value: bigint, data: Hex) => {
    return encodeFunctionData({
      abi: createCallAbi,
      functionName: 'performCreate',
      args: [value, data],
    });
  };

  private async getContractAddress(transactionHash: Hex): Promise<Hex> {
    const publicClient = this.#client.extend(publicActions);
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });

    const logs = parseEventLogs({
      abi: createCallAbi,
      eventName: 'ContractCreation',
      logs: receipt.logs.map((log) => {
        return {
          data: log.data,
          topics: log.topics as [Hex, ...Hex[]],
          address: log.address,
          blockHash: log.blockHash,
          blockNumber: toHex(log.blockNumber),
          logIndex: toHex(log.logIndex),
          transactionHash: log.transactionHash,
          transactionIndex: toHex(log.transactionIndex),
          removed: false,
        };
      }),
    });

    if (!logs.length) {
      return '0x';
    }

    return logs[0].args.newContract;
  }

  public static async create(
    config: KernelWalletWrapperConfig
  ): Promise<KernelSmartWallet> {
    if (!isValidSource(config.kernel)) {
      throw new KriptonioError({
        message: 'privateKey or mnemonic must be provided',
      });
    }

    config.kernel.version = config.kernel.version ?? '2.3';

    const publicClient = createPublicClient({
      transport: http(config.kernel.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const client = await this.createKernelClient(config, chain);
    return new KernelSmartWallet(config, client);
  }

  public static async createKernelClient(
    config: KernelWalletWrapperConfig,
    chain: Chain
  ) {
    const publicClient = createPublicClient<HttpTransport, Chain>({
      transport: http(config.kernel.rpcUrl),
      chain,
    });

    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: sourceToAccount(config.kernel),
    });

    const account = await createKernelAccount(publicClient, {
      accountLogicAddress: this.getAccountLogicAddress(config.kernel),
      plugins: {
        sudo: ecdsaValidator,
      },
      index: BigInt(0),
    });

    const client = createKernelAccountClient({
      account,
      chain,
      transport: http(config.kernel.rpcUrl),
      sponsorUserOperation: config.kernel.paymasterUrl
        ? async (args) => {
            const paymasterInfo = await sponsorUserOperation(
              config.kernel.paymasterUrl!,
              deepHexlify(args.userOperation),
              account.entryPoint
            );

            return {
              ...args.userOperation,
              paymasterAndData: paymasterInfo.paymasterAndData,
              callGasLimit: BigInt(paymasterInfo.callGasLimit),
              verificationGasLimit: BigInt(paymasterInfo.verificationGasLimit),
              preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
            };
          }
        : undefined,
    });

    return client;
  }

  private static getAccountLogicAddress = (
    config: KernelWalletConfig
  ): Address => {
    if (config.version === '2.3') {
      return '0xD3F582F6B4814E989Ee8E96bc3175320B5A540ab';
    }

    throw new KriptonioError({
      message: `unsupported kernel wallet version ${config.version}`,
    });
  };

  public static async computeAddress(
    config: ExportedKernelWallet,
    rpcUrl: string
  ) {
    const wallet = await KernelSmartWallet.create({
      kernel: {
        ...exportSource(config.kernel),
        rpcUrl,
      },
    });

    return wallet.address;
  }
}

const userOperationEventAbi = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: 'bytes32',
      name: 'userOpHash',
      type: 'bytes32',
    },
    {
      indexed: true,
      internalType: 'address',
      name: 'sender',
      type: 'address',
    },
    {
      indexed: true,
      internalType: 'address',
      name: 'paymaster',
      type: 'address',
    },
    {
      indexed: false,
      internalType: 'uint256',
      name: 'nonce',
      type: 'uint256',
    },
    {
      indexed: false,
      internalType: 'bool',
      name: 'success',
      type: 'bool',
    },
    {
      indexed: false,
      internalType: 'uint256',
      name: 'actualGasCost',
      type: 'uint256',
    },
    {
      indexed: false,
      internalType: 'uint256',
      name: 'actualGasUsed',
      type: 'uint256',
    },
  ],
  name: 'UserOperationEvent',
  type: 'event',
} as const;