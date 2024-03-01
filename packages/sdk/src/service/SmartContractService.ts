import { ApiClient } from '../api/ApiClient';
import {
  CreateFromStandardJsonProps,
  GetSmartContractProps,
  SmartContractApi,
} from '../api/SmartContractApi';

export class SmartContractService {
  #smartContractApi: SmartContractApi;

  constructor(apiClient: ApiClient) {
    this.#smartContractApi = new SmartContractApi(apiClient);
  }

  public get = (props: GetSmartContractProps) => {
    return this.#smartContractApi.get(props);
  };

  public createFromStandardJson = (props: CreateFromStandardJsonProps) => {
    return this.#smartContractApi.createFromStandardJson(props);
  };
}
