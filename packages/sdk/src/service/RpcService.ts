import { ApiClient } from '../api/ApiClient';
import { GetOrCreateParams, RpcApi } from '../api/RpcApi';
import { CreateBlockchainEndpointBody } from '../types/rpc/createBlockchainEndpointBody';

export class RpcService {
  #apiClient: ApiClient;
  #rpcApi: RpcApi;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
    this.#rpcApi = new RpcApi(apiClient);
  }

  public create = (data: CreateBlockchainEndpointBody) => {
    return this.#rpcApi.create(data);
  };

  public get = (id: string) => {
    return this.#rpcApi.get(id);
  };

  public getOrCreate = async (
    params: Omit<GetOrCreateParams, 'organizationId'>
  ) => {
    const organizationId = await this.#apiClient.currentOrganization();
    return this.#rpcApi.getOrCreate({
      organizationId,
      ...params,
    });
  };
}
