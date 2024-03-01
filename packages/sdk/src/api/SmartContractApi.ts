import { KriptonioError } from '../Error';
import { SmartContract } from '../model/SmartContract';
import { CreateSmartContractDeploymentBody } from '../types/api/createSmartContractDeploymentBody';
import { CreateSmartContractFromStandardJsonBody } from '../types/api/createSmartContractFromStandardJsonBody';
import { CreateSmartContractResponse } from '../types/api/createSmartContractResponse';
import { SmartContractDeploymentResponse } from '../types/api/smartContractDeploymentResponse';
import { SmartContractDetailResponse } from '../types/api/smartContractDetailResponse';
import { UpdateDeploymentTransactionBody } from '../types/api/updateDeploymentTransactionBody';
import { Wallet } from '../wallet/Wallet';
import { ApiClient } from './ApiClient';

export type GetSmartContractProps = {
  id: string;
  wallet?: Wallet;
};

export type CreateFromStandardJsonProps = {
  data: CreateSmartContractFromStandardJsonBody;
  wallet?: Wallet;
};

export type CreateDeploymentProps = {
  id: string;
  data: CreateSmartContractDeploymentBody;
};

export class SmartContractApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public get = async (props: GetSmartContractProps): Promise<SmartContract> => {
    const result = await this.#apiClient.get<SmartContractDetailResponse>(
      `/v1/smart-contracts/${props.id}`
    );

    if (result.ok) {
      return SmartContract.fromDto(result.data, this, props.wallet);
    }

    throw new KriptonioError({
      message: `error while fetching smart contract with id ${props.id}. ${result.error.stringify()}`,
    });
  };

  public createFromStandardJson = async (
    props: CreateFromStandardJsonProps
  ) => {
    const result = await this.#apiClient.post<CreateSmartContractResponse>(
      '/v1/smart-contracts/standard-json',
      { data: props.data }
    );

    if (result.ok) {
      return this.get({ id: result.data.id, wallet: props.wallet });
    }

    throw new KriptonioError({
      message: `error while creating smart contract. ${result.error.stringify()}`,
    });
  };

  public createDeployment = async (props: CreateDeploymentProps) => {
    const result = await this.#apiClient.post<SmartContractDeploymentResponse>(
      `/v1/smart-contracts/${props.id}/deployment`,
      { data: props.data }
    );

    if (result.ok) {
      return result.data;
    }

    throw new KriptonioError({
      message: `error while creating smart contract deployment. ${result.error.stringify()}`,
    });
  };

  public updateDeploymentTransaction = async (
    id: string,
    hash: string,
    data: UpdateDeploymentTransactionBody
  ) => {
    const result = await this.#apiClient.put(
      `/v1/smart-contracts/${id}/transactions/${hash}`,
      { data }
    );

    if (result.ok) {
      return result.data;
    }

    throw new KriptonioError({
      message: `error while updating smart contract deployment transaction. ${result.error.stringify()}`,
    });
  };
}
