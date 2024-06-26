/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallType } from '@zerodev/sdk/types';
import {
  EstimateUserOperationGasReturnType,
  UserOperation,
  estimateUserOperationGas,
  isSmartAccountDeployed,
} from 'permissionless';
import {
  EntryPoint,
  GetEntryPointVersion,
} from 'permissionless/types/entrypoint';
import {
  Account,
  Chain,
  EstimateGasParameters,
  Hex,
  HttpTransport,
  PublicClient,
  RpcError,
  SendTransactionParameters,
  TimeoutError,
  encodeFunctionData,
  parseAbi,
  parseEventLogs,
  toHex,
} from 'viem';
import { PartialBy } from 'viem/chains';
import { KriptonioError } from '../../Error';
import { ApiClient } from '../../api/ApiClient';
import { RpcApi } from '../../api/RpcApi';
import { OperationStatus } from '../../enum/OperationStatus';
import { assertHex, parseError } from '../../utils/error';
import { sleep } from '../../utils/time';
import {
  DeployContract,
  DeployResponse,
  GasData,
  OperationOptions,
  Wallet,
} from '../Wallet';
import { UserOperationEventAbi } from './abi/UserOperationEventAbi';

export type PartialUserOperation<TEntryPoint extends EntryPoint> =
  GetEntryPointVersion<TEntryPoint> extends 'v0.6'
    ? PartialBy<
        UserOperation<'v0.6'>,
        | 'sender'
        | 'nonce'
        | 'initCode'
        | 'callGasLimit'
        | 'verificationGasLimit'
        | 'preVerificationGas'
        | 'maxFeePerGas'
        | 'maxPriorityFeePerGas'
        | 'paymasterAndData'
        | 'signature'
      >
    : PartialBy<
        UserOperation<'v0.7'>,
        | 'sender'
        | 'nonce'
        | 'factory'
        | 'factoryData'
        | 'callGasLimit'
        | 'verificationGasLimit'
        | 'preVerificationGas'
        | 'maxFeePerGas'
        | 'maxPriorityFeePerGas'
        | 'paymaster'
        | 'paymasterVerificationGasLimit'
        | 'paymasterPostOpGasLimit'
        | 'paymasterData'
        | 'signature'
      >;

export type UserOperationInfo = {
  success: boolean | undefined;
  transactionHash: Hex;
};

// source-code https://github.com/safe-global/safe-contracts/blob/0acdd35a203299585438f53885df630f9d486a86/contracts/libraries/CreateCall.sol
export const createCallAddress = '0x9b35Af71d77eaf8d7e40252370304687390A1A52';

export const createCallAbi = parseAbi([
  'function performCreate(uint256 value, bytes memory deploymentData) public returns (address newContract)',
  'function performCreate2(uint256 value, bytes memory deploymentData, bytes32 salt) public returns (address newContract)',
  'event ContractCreation(address indexed newContract)',
]);

export abstract class SmartWallet<
  TEntryPoint extends EntryPoint,
> extends Wallet {
  protected publicClient: PublicClient<HttpTransport>;

  constructor(chain: Chain, publicClient: PublicClient<HttpTransport>) {
    super(chain);
    this.publicClient = publicClient;
  }

  public isDeployed = (): Promise<boolean> => {
    return isSmartAccountDeployed(this.publicClient, this.address);
  };

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

    const result = await this.publicClient.estimateFeesPerGas();
    return {
      maxFeePerGas: result.maxFeePerGas,
      maxPriorityFeePerGas: result.maxPriorityFeePerGas,
    };
  };

  public waitForUserOperation = async (
    userOpHash: Hex,
    timeout = 60_000
  ): Promise<UserOperationInfo | null> => {
    const publicClient = this.publicClient;
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

  public estimateUserOperationGas = (
    userOperation: UserOperation<GetEntryPointVersion<TEntryPoint>>
  ): Promise<EstimateUserOperationGasReturnType<TEntryPoint>> => {
    return estimateUserOperationGas<TEntryPoint>(this.publicClient, {
      userOperation,
      entryPoint: this.entryPoint,
    });
  };

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

  public override async estimateGas(
    tx: EstimateGasParameters<Chain>
  ): Promise<bigint> {
    try {
      const isDeployment = !tx.to;

      const userOperation = isDeployment
        ? await this.buildDeployUserOperation({
            data: tx.data ?? '0x',
            value: tx.value ?? BigInt(0),
            maxFeePerGas: tx.maxFeePerGas,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
          })
        : await this.buildCallUserOperation({
            to: tx.to ?? '0x',
            data: tx.data ?? '0x',
            value: tx.value ?? BigInt(0),
            maxFeePerGas: tx.maxFeePerGas,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
          });

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

  protected buildDeployUserOperation = (input: {
    data: Hex;
    value: bigint;
    maxFeePerGas: bigint | undefined;
    maxPriorityFeePerGas: bigint | undefined;
  }): Promise<UserOperation<GetEntryPointVersion<TEntryPoint>>> => {
    return this.buildUserOperation(
      {
        to: createCallAddress,
        data: this.buildDeployData(input.value, input.data),
        value: input.value,
        maxFeePerGas: input.maxFeePerGas,
        maxPriorityFeePerGas: input.maxPriorityFeePerGas,
      },
      'delegatecall'
    );
  };

  protected abstract buildUserOperation(
    input: {
      to: Hex;
      data: Hex;
      value: bigint;
      maxFeePerGas: bigint | undefined;
      maxPriorityFeePerGas: bigint | undefined;
    },
    callType: CallType
  ): Promise<UserOperation<GetEntryPointVersion<TEntryPoint>>>;

  protected buildCallUserOperation = (input: {
    to: Hex;
    data: Hex;
    value: bigint;
    maxFeePerGas: bigint | undefined;
    maxPriorityFeePerGas: bigint | undefined;
  }) => {
    return this.buildUserOperation(input, 'call');
  };

  private buildDeployData = (value: bigint, data: Hex) => {
    return encodeFunctionData({
      abi: createCallAbi,
      functionName: 'performCreate',
      args: [value, data],
    });
  };

  public deployContract = async (
    deploy: DeployContract,
    options?: OperationOptions
  ): Promise<DeployResponse> => {
    try {
      options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
      const userOperation = await this.buildDeployUserOperation({
        data: assertHex(deploy.bytecode, 'bytecode'),
        value: deploy.value ?? BigInt(0),
        maxFeePerGas: deploy.maxFeePerGas,
        maxPriorityFeePerGas: deploy.maxPriorityFeePerGas,
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

  public sendTransaction = async (
    tx: SendTransactionParameters<Chain, Account>,
    options?: OperationOptions | undefined
  ): Promise<Hex> => {
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

      options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
      const userOperation = await this.buildUserOperation(
        {
          to: tx.to,
          value: tx.value ?? 0n,
          data: tx.data ?? '0x',
          maxFeePerGas: tx.maxFeePerGas,
          maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        },
        'call'
      );

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
  };

  protected async getContractAddress(transactionHash: Hex): Promise<Hex> {
    const publicClient = this.publicClient;
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

  public override get rpcUrl(): string | undefined {
    return this.publicClient.transport.url;
  }

  /**
   * Sign transaction is not supported for smart wallets
   * @throws KriptonioError
   */
  public override signTransaction(): Promise<Hex> {
    throw new KriptonioError({
      message:
        'smart accounts cannot sign transactions. send user operation instead',
    });
  }

  public abstract createCallData(input: {
    to: string;
    value?: bigint | undefined;
    data?: string | undefined;
  }): Promise<Hex>;

  /**
   * Gets the entry point address of the smart wallet
   */
  public abstract get entryPoint(): TEntryPoint;

  /**
   * Gets the smart wallet version
   * @returns smart wallet version if deployed, null if not deployed
   */
  public abstract getVersion(): Promise<string | null>;

  /**
   * Gets the smart wallet vendor
   */
  public abstract get vendor(): string;

  /**
   * Sends a user operation from the smart wallet
   * @returns user operation hash
   */
  public abstract sendUserOperation(
    op: PartialUserOperation<TEntryPoint>
  ): Promise<Hex>;
}
