import { ApiClient } from '../api/ApiClient';
import { SmartContractApi } from '../api/SmartContractApi';
import { CreateSmartContractFromStandardJsonBody } from '../types/api/createSmartContractFromStandardJsonBody';
import { Wallet } from '../wallet/Wallet';

export interface SmartContractSignerOptions {
  walletPassword?: string;
  smartContractId: string;
}

export class SmartContractService {
  #smartContractApi: SmartContractApi;

  constructor(apiClient: ApiClient) {
    this.#smartContractApi = new SmartContractApi(apiClient);
  }

  public get = (id: string, wallet?: Wallet) => {
    return this.#smartContractApi.get(id, wallet);
  };

  public createFromStandardJson = (
    data: CreateSmartContractFromStandardJsonBody,
    wallet?: Wallet
  ) => {
    return this.#smartContractApi.createFromStandardJson(data, wallet);
  };
}
