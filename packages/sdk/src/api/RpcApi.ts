import { Configuration } from '../Configuration';
import { KriptonioError } from '../Error';
import { RpcDto } from '../response/RpcDto';
import { BlockchainEndpointResponse } from '../types/rpc/blockchainEndpointResponse';
import { CreateBlockchainEndpointBody } from '../types/rpc/createBlockchainEndpointBody';
import { ApiClient } from './ApiClient';

export type GetRpcProps = {
  id: string;
};

export type GetOrCreateRpcProps = {
  organizationId: string;
  chainId: number;
  wallet?: string;
};

export class RpcApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public create = async (
    data: CreateBlockchainEndpointBody
  ): Promise<RpcDto> => {
    const organizationId = await this.#apiClient.currentOrganization();
    const response = await this.#apiClient.post<BlockchainEndpointResponse>(
      `/v1/organizations/${organizationId}/endpoints`,
      { data, baseURL: Configuration.rpcApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while creating rpc endpoint. ${response.error.stringify()}`,
    });
  };

  public get = async (props: GetRpcProps): Promise<RpcDto> => {
    const response = await this.#apiClient.get<BlockchainEndpointResponse>(
      `/v1/endpoints/${props.id}`,
      { baseURL: Configuration.rpcApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while creating rpc endpoint. ${response.error.stringify()}`,
    });
  };

  public getOrCreate = async (props: GetOrCreateRpcProps): Promise<RpcDto> => {
    const options: { [key: string]: unknown } = { wallet: props.wallet };

    const populatedOptions = Object.keys(options).reduce((acc, key) => {
      if (options[key] != null) {
        acc.push(`${key}=${options[key]}`);
      }

      return acc;
    }, [] as string[]);

    const response = await this.#apiClient.get<BlockchainEndpointResponse>(
      `/v1/organizations/${props.organizationId}/endpoints/chains/${props.chainId}?${populatedOptions.join('&')}`,
      { baseURL: Configuration.rpcApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while getting/creating rpc endpoint. ${response.error.stringify()}`,
    });
  };

  private createResponse = (response: BlockchainEndpointResponse): RpcDto => {
    return {
      id: response.id,
      title: response.title,
      chainId: response.chainId,
      url: response.url,
    };
  };
}
