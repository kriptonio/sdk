import { ApiClient } from '../api/ApiClient';
import {
  GetOrCreatePaymasterProps,
  GetPaymasterProps,
  PaymasterApi,
} from '../api/PaymasterApi';
import { CreatePaymasterEndpointRequest } from '../types/paymaster/createPaymasterEndpointRequest';

export class PaymasterService {
  #apiClient: ApiClient;
  #paymasterApi: PaymasterApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#paymasterApi = new PaymasterApi(apiClient);
  }

  public create = (body: CreatePaymasterEndpointRequest) => {
    return this.#paymasterApi.create(body);
  };

  public get = (props: GetPaymasterProps) => {
    return this.#paymasterApi.get(props);
  };

  public getOrCreate = async (
    props: Omit<GetOrCreatePaymasterProps, 'organizationId'>
  ) => {
    const organizationId = await this.#apiClient.currentOrganization();
    return this.#paymasterApi.getOrCreate({
      organizationId,
      ...props,
    });
  };
}
