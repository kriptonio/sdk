import {
  Abi,
  Account,
  Chain,
  Hex,
  SendTransactionParameters,
  createPublicClient,
  encodeDeployData,
  encodeFunctionData,
  getContract,
  http,
} from 'viem';
import { KriptonioError } from '../Error';
import { SmartContractApi } from '../api/SmartContractApi';
import { DeploymentDto } from '../response/DeploymentDto';
import { SmartContractDeploymentResponse } from '../types/api/smartContractDeploymentResponse';
import { SmartContractDetailResponse } from '../types/api/smartContractDetailResponse';
import { TransactionStatus } from '../types/api/transactionStatus';
import { getChain } from '../utils/chain';
import { assertHex, parseError } from '../utils/error';
import { sleep } from '../utils/time';
import { OperationOptions, Wallet } from '../wallet/Wallet';

export type EstimateDeployProps = {
  params: unknown[];
};

export type DeployProps = {
  params: unknown[];
  options?: OperationOptions;
};

export type SmartContractCallProps = {
  params?: unknown[];
  value?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  options?: OperationOptions;
};

export type SmartContractDeployment = {
  hash: Hex;
  address: Hex;
};

export class SmartContract {
  #smartContractApi: SmartContractApi;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly abi: unknown[],
    public readonly bin: string,
    public readonly chainId: number,
    public deployment: DeploymentDto | undefined,
    public readonly createdAt: Date,
    private readonly smartContractApi: SmartContractApi,
    private readonly rpcUrl: string,
    private readonly wallet?: Wallet
  ) {
    this.#smartContractApi = smartContractApi;
  }

  public write = async (
    functionName: string,
    props?: SmartContractCallProps
  ): Promise<Hex> => {
    if (!this.wallet) {
      throw new KriptonioError({
        message: 'please provide a wallet to write to the contract',
      });
    }

    if (!this.deployment) {
      throw new KriptonioError({
        message: 'please deploy the contract before writing to it',
      });
    }

    try {
      const data = encodeFunctionData({
        abi: this.abi as Abi,
        functionName,
        args: props?.params ?? [],
      });

      const tx: SendTransactionParameters<Chain, Account> = {
        to: this.deployment.address,
        data,
        value: props?.value,
        maxFeePerGas: props?.maxFeePerGas,
        maxPriorityFeePerGas: props?.maxPriorityFeePerGas,
      };

      return await this.wallet!.sendTransaction(tx, props?.options);
    } catch (e) {
      throw parseError(e);
    }
  };

  public read = async <TResult = unknown>(
    functionName: string,
    props?: SmartContractCallProps
  ): Promise<TResult> => {
    try {
      return (await this.readContract.read[functionName](
        props?.params ?? []
      )) as Promise<TResult>;
    } catch (e) {
      throw parseError(e);
    }
  };

  public estimate = async (
    functionName: string,
    props?: SmartContractCallProps
  ): Promise<bigint> => {
    try {
      if (!this.wallet) {
        throw new KriptonioError({
          message: 'please attach a wallet to estimate the gas',
        });
      }

      if (!this.deployment) {
        throw new KriptonioError({
          message: 'please deploy the contract before estimating gas',
        });
      }

      return await this.wallet.estimateGas({
        to: this.deployment.address,
        data: encodeFunctionData({
          abi: this.abi as Abi,
          functionName,
          args: props?.params ?? [],
        }),
      });
    } catch (e) {
      throw parseError(e);
    }
  };

  public estimateDeploy = async (props?: EstimateDeployProps) => {
    if (!this.wallet) {
      throw new KriptonioError({
        message: 'please attach a wallet to estimate the deployment gas',
      });
    }

    try {
      return await this.wallet.estimateGas({
        to: null,
        data: encodeDeployData({
          abi: this.abi as Abi,
          bytecode: assertHex(this.bin, 'bin'),
          args: props?.params ?? [],
        }),
      });
    } catch (e) {
      throw parseError(e);
    }
  };

  public deploy = async (
    props?: DeployProps
  ): Promise<SmartContractDeployment> => {
    if (!this.wallet) {
      throw new KriptonioError({
        message: 'please provide a wallet to deploy the contract',
      });
    }

    try {
      const deploymentData = encodeDeployData({
        abi: this.abi,
        bytecode: assertHex(this.bin, 'bin'),
        args: props?.params ?? [],
      });

      const deployment = await this.wallet?.deployContract(
        {
          bytecode: deploymentData,
        },
        props?.options
      );

      try {
        this.deployment = SmartContract.fromDeployment(
          await this.#smartContractApi.createDeployment({
            id: this.id,
            data: {
              address: deployment.address,
              deployer: this.wallet.address,
              transactionHash: deployment.hash,
            },
          })
        );
      } catch (e) {
        console.error('error while creating deployment', e);
      }

      return {
        hash: deployment.hash,
        address: deployment.address,
      };
    } catch (e) {
      throw parseError(e);
    }
  };

  public deployed = async (timeoutMs: number = 60000): Promise<boolean> => {
    if (!this.deployment?.transaction?.hash) {
      return false;
    }

    if (this.deployment.transaction.status === TransactionStatus.Success) {
      return true;
    }

    try {
      let expiredTime = 0;
      while (expiredTime < timeoutMs) {
        try {
          const receipt = await this.publicClient.getTransactionReceipt({
            hash: this.deployment.transaction.hash as Hex,
          });

          if (receipt.status === 'success') {
            await this.smartContractApi.updateDeploymentTransaction(
              this.id,
              this.deployment.transaction.hash,
              {
                success: true,
              }
            );
            this.deployment.transaction.status = TransactionStatus.Success;

            return true;
          }
        } catch (e) {
          console.error(
            'transient error while waiting for deployment transaction',
            e
          );
        } finally {
          const sleepMs = 500;
          await sleep(sleepMs);
          expiredTime += sleepMs;
        }
      }

      return false;
    } catch (e) {
      throw parseError(e);
    }
  };

  private get publicClient() {
    return createPublicClient({
      transport: http(this.rpcUrl, { batch: true }),
      chain: getChain(this.chainId),
      batch: {
        multicall: true,
      },
    });
  }

  private get readContract() {
    return getContract({
      abi: this.abi,
      address: this.deployment?.address ?? '0x',
      client: this.publicClient,
    });
  }

  public static fromDto = (
    dto: SmartContractDetailResponse,
    smartContractApi: SmartContractApi,
    rpcUrl: string,
    wallet?: Wallet
  ) => {
    return new SmartContract(
      dto.id,
      dto.title,
      dto.abi,
      dto.bin,
      dto.chainId,
      dto.deployment ? this.fromDeployment(dto.deployment) : undefined,
      new Date(dto.createdAt),
      smartContractApi,
      rpcUrl,
      wallet
    );
  };

  private static fromDeployment = (
    deployment: SmartContractDeploymentResponse
  ): DeploymentDto => {
    return {
      id: deployment.id,
      address: deployment.address as Hex,
      deployer: deployment.deployer as Hex,
      transaction: deployment.transaction,
    };
  };
}
