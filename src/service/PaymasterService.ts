import { ApiClient } from '../api/ApiClient';
import { GetOrCreateParams, PaymasterApi } from '../api/PaymasterApi';
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

  public get = (id: string) => {
    return this.#paymasterApi.get(id);
  };

  public getOrCreate = async (
    params: Omit<GetOrCreateParams, 'organizationId'>
  ) => {
    const organizationId = await this.#apiClient.currentOrganization();
    return this.#paymasterApi.getOrCreate({
      organizationId,
      ...params,
    });
  };
}
