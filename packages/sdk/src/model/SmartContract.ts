import {
  Abi,
  Hex,
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

export type SmartContractCall = {
  params?: unknown[];
  value?: bigint;
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
    readonly smartContractApi: SmartContractApi,
    readonly wallet?: Wallet
  ) {
    this.#smartContractApi = smartContractApi;
  }

  public write = async (
    functionName: string,
    opts?: SmartContractCall
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
        args: opts?.params ?? [],
      });

      return await this.wallet.sendTransaction(
        {
          to: this.deployment.address,
          data,
          value: opts?.value,
        },
        opts?.options
      );
    } catch (e) {
      throw parseError(e);
    }
  };

  public read = async (functionName: string, opts?: SmartContractCall) => {
    try {
      return await this.readContract.read[functionName](opts?.params ?? []);
    } catch (e) {
      throw parseError(e);
    }
  };

  public estimate = async (
    functionName: string,
    opts?: SmartContractCall
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
          args: opts?.params ?? [],
        }),
      });
    } catch (e) {
      throw parseError(e);
    }
  };

  public estimateDeploy = async (params: unknown[] = []) => {
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
          args: params,
        }),
      });
    } catch (e) {
      throw parseError(e);
    }
  };

  public deploy = async (
    params: unknown[] = [],
    options?: OperationOptions
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
        args: params as unknown[],
      });

      const deployment = await this.wallet?.deployContract(
        {
          bytecode: deploymentData,
        },
        options
      );

      try {
        this.deployment = SmartContract.fromDeployment(
          await this.#smartContractApi.createDeployment(this.id, {
            address: deployment.address,
            deployer: this.wallet.address,
            transactionHash: deployment.hash,
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
      throw new KriptonioError({
        message:
          'cannot call deployed() function before smart contract is deployed',
      });
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
    const chain = getChain(this.chainId);

    return createPublicClient({
      transport: http(chain.rpcUrls.default.http[0], { batch: true }),
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
