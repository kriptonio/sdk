import { Configuration } from '../Configuration';
import { KriptonioError } from '../Error';
import { BundlerFeesDto } from '../response/BundlerFeesDto';
import { RpcDto } from '../response/RpcDto';
import { BlockchainEndpointResponse } from '../types/rpc/blockchainEndpointResponse';
import { BundlerFeesResponse } from '../types/rpc/bundlerFeesResponse';
import { CreateBlockchainEndpointBody } from '../types/rpc/createBlockchainEndpointBody';
import { ApiClient } from './ApiClient';

export type GetRpcProps = {
  id: string;
};

export type GetBundlerGasPriceProps = {
  chainId: number;
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

  public getBundlerGasPrice = async (
    props: GetBundlerGasPriceProps
  ): Promise<BundlerFeesDto | null> => {
    const response = await this.#apiClient.get<BundlerFeesResponse>(
      `/v1/chains/${props.chainId}/bundler-gas-price`,
      { baseURL: Configuration.rpcApiUrl }
    );

    if (response.ok) {
      if (response.data.fees?.maxFeePerGas) {
        return {
          maxFeePerGas: BigInt(response.data.fees.maxFeePerGas),
          maxPriorityFeePerGas: BigInt(response.data.fees.maxPriorityFeePerGas),
        };
      }

      return null;
    }

    throw new KriptonioError({
      message: `error while getting bundler gas price. ${response.error.stringify()}`,
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
