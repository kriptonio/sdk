import { ApiClient } from '../api/ApiClient';
import { GetOrCreateRpcProps, GetRpcProps, RpcApi } from '../api/RpcApi';
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

  public get = (props: GetRpcProps) => {
    return this.#rpcApi.get(props);
  };

  public getOrCreate = async (
    props: Omit<GetOrCreateRpcProps, 'organizationId'>
  ) => {
    const organizationId = await this.#apiClient.currentOrganization();
    return this.#rpcApi.getOrCreate({
      organizationId,
      ...props,
    });
  };
}
