import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import {
  KernelAccountAbi,
  KernelAccountClient,
  KernelSmartAccount,
  createKernelAccount,
  createKernelAccountClient,
} from '@zerodev/sdk';
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
  BaseError,
  Chain,
  EstimateGasParameters,
  Hex,
  HttpTransport,
  ParseAccount,
  PublicClient,
  RpcError,
  SendTransactionParameters,
  TimeoutError,
  SignableMessage as ViemSignableMessage,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
  parseAbi,
  parseEventLogs,
  toHex,
} from 'viem';
import { KriptonioError } from '../../Error';
import { ApiClient } from '../../api/ApiClient';
import { sponsorUserOperation } from '../../api/PaymasterApi';
import { RpcApi } from '../../api/RpcApi';
import { OperationStatus } from '../../enum/OperationStatus';
import { getChain } from '../../utils/chain';
import { assertHex, parseError } from '../../utils/error';
import { sleep } from '../../utils/time';
import { exportSource, isValidSource, sourceToAccount } from '../Helpers';
import {
  DeployResponse,
  DeployWallet,
  GasData,
  OperationOptions,
  SignableMessage,
  TypedData,
} from '../Wallet';
import {
  ExportedKernelWallet,
  KernelWalletWrapperConfig,
} from '../WalletConfig';
import {
  PartialUserOperation,
  SmartWallet,
  UserOperationInfo,
} from './SmartWallet';
import { UserOperationEventAbi } from './abi/UserOperationEventAbi';

export type KernelClient = KernelAccountClient<
  HttpTransport,
  Chain,
  ParseAccount<KernelSmartAccount>
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
  #publicClient: PublicClient;

  constructor(
    config: KernelWalletWrapperConfig,
    client: KernelClient,
    publicClient: PublicClient
  ) {
    super(client.chain);
    this.#client = client;
    this.#publicClient = publicClient;
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

  public get vendor(): string {
    return 'ZeroDev Kernel';
  }

  public async getVersion(): Promise<string | null> {
    try {
      const contract = getContract({
        abi: KernelAccountAbi,
        address: this.address,
        client: this.#publicClient,
      });

      return await contract.read.version();
    } catch (e) {
      if (e instanceof BaseError) {
        return null;
      }

      throw new KriptonioError({
        message: 'error while getting smart wallet version',
      });
    }
  }

  public override getNonce(): Promise<bigint> {
    return this.#client.account.getNonce();
  }

  public getFeeData = async (): Promise<GasData> => {
    const rpcApi = new RpcApi(new ApiClient({}));

    try {
      const bundlerFees = await rpcApi.getBundlerGasPrice({
        chainId: this.chain.id,
      });

      if (bundlerFees) {
        return bundlerFees;
      }
    } catch (e) {
      console.error('error while getting bundler fees', e);
    }

    const result = await this.#publicClient.estimateFeesPerGas();
    return {
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
    };
  };

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
    try {
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
    } catch (e) {
      throw parseError(e);
    }
  };

  public isDeployed = (): Promise<boolean> => {
    return isSmartAccountDeployed(this.#publicClient, this.address);
  };

  public override async estimateGas(
    tx: EstimateGasParameters<Chain>
  ): Promise<bigint> {
    try {
      const isDeployment = !tx.to;

      const userOperation = await this.prepareUserOperation(
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
    } catch (e) {
      throw parseError(e);
    }
  }

  public override async sendTransaction(
    tx: SendTransactionParameters<Chain, Account>,
    options?: OperationOptions
  ): Promise<Hex> {
    try {
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
      const userOperation = await this.prepareUserOperation({
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
    } catch (e) {
      throw parseError(e);
    }
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
    try {
      return this.#client.sendUserOperation({
        userOperation: userOperation,
      });
    } catch (e) {
      throw parseError(e);
    }
  }

  public override export(): ExportedKernelWallet {
    return {
      version: '1.0',
      kernel: {
        ...exportSource(this.#config.kernel),
      },
    };
  }

  public deployContract = async (
    deploy: DeployWallet,
    options?: OperationOptions
  ): Promise<DeployResponse> => {
    try {
      options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
      const userOperation = await this.prepareUserOperation({
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
    } catch (e) {
      throw parseError(e);
    }
  };

  private prepareUserOperation = async (args: {
    userOperation: PartialUserOperation;
  }) => {
    if (!args.userOperation.maxFeePerGas) {
      const feeData = await this.getFeeData();
      if (feeData) {
        args.userOperation.maxFeePerGas = feeData.maxFeePerGas;
        args.userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }
    }

    return this.#client.prepareUserOperationRequest({
      userOperation: args.userOperation,
    });
  };

  public waitForUserOperation = async (
    userOpHash: Hex,
    timeout = 60_000
  ): Promise<UserOperationInfo | null> => {
    const publicClient = this.#publicClient;
    const currentBlock = await publicClient.getBlockNumber();
    let elapsed = 0;
    const stepWaitTime = 1000; // 1 sec

    while (elapsed < timeout) {
      elapsed += 1000;

      try {
        const logs = await publicClient.getLogs({
          address: this.entryPoint,
          event: UserOperationEventAbi,
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

        console.error('unexpected error while waiting for user operation', e);
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
    const publicClient = this.#publicClient;
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
      throw new KriptonioError({
        message: 'deployment failed. cannot find contract creation event',
      });
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

    const publicClient = createPublicClient({
      transport: http(config.kernel.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const client = await this.createKernelClient(config, chain, publicClient);
    return new KernelSmartWallet(config, client, publicClient);
  }

  public static async createKernelClient(
    config: KernelWalletWrapperConfig,
    chain: Chain,
    publicClient: PublicClient
  ): Promise<KernelClient> {
    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: sourceToAccount(config.kernel),
    });

    const account = await createKernelAccount(publicClient, {
      // will use kernel 2.4 when creating the account
      // ref: https://github.com/zerodevapp/kernel
      accountLogicAddress: '0xd3082872F8B06073A021b4602e022d5A070d7cfC',
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

    return client as KernelClient;
  }

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
