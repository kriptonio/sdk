import axios, { AxiosError } from 'axios';
import { UserOperation } from 'permissionless';
import type { Hex } from 'viem';
import { Configuration } from '../Configuration';
import { KriptonioError } from '../Error';
import { PaymasterDto } from '../response/PaymasterDto';
import { SponsoredUserOperation } from '../types/UserOperation';
import { ApiErrorResponse } from '../types/api/apiErrorResponse';
import { CreatePaymasterEndpointRequest } from '../types/paymaster/createPaymasterEndpointRequest';
import { PaymasterEndpointDetailResponse } from '../types/paymaster/paymasterEndpointDetailResponse';
import { PaymasterEndpointResponse } from '../types/paymaster/paymasterEndpointResponse';
import { SponsorTransactionBody } from '../types/paymaster/sponsorTransactionBody';
import { SponsorTransactionResponse } from '../types/paymaster/sponsorTransactionResponse';
import { ApiClient } from './ApiClient';

export type GetPaymasterProps = {
  id: string;
};

export type GetOrCreatePaymasterProps = {
  organizationId: string;
  chainId: number;
  entryPoint: string;
  wallet?: string;
};

export class PaymasterApi {
  #apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.#apiClient = apiClient;
  }

  public create = async (
    data: CreatePaymasterEndpointRequest
  ): Promise<PaymasterDto> => {
    const organizationId = await this.#apiClient.currentOrganization();
    const response = await this.#apiClient.post<PaymasterEndpointResponse>(
      `/v1/organizations/${organizationId}/endpoints`,
      { data, baseURL: Configuration.paymasterApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while creating paymaster endpoint. ${response.error.stringify()}`,
    });
  };

  public get = async (props: GetPaymasterProps): Promise<PaymasterDto> => {
    const response = await this.#apiClient.get<PaymasterEndpointDetailResponse>(
      `/v1/endpoints/${props.id}`,
      { baseURL: Configuration.paymasterApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while getting paymaster endpoint. ${response.error.stringify()}`,
    });
  };

  public getOrCreate = async (
    props: GetOrCreatePaymasterProps
  ): Promise<PaymasterDto> => {
    const response = await this.#apiClient.get<PaymasterEndpointResponse>(
      `/v1/organizations/${props.organizationId}/endpoints/chains/${props.chainId}?entryPoint=${props.entryPoint}&${props.wallet ? `wallet=${props.wallet}` : ''}`,
      { baseURL: Configuration.paymasterApiUrl }
    );

    if (response.ok) {
      return this.createResponse(response.data);
    }

    throw new KriptonioError({
      message: `error while getting paymaster endpoint. ${response.error.stringify()}`,
    });
  };

  private createResponse = (
    response: PaymasterEndpointResponse | PaymasterEndpointDetailResponse
  ): PaymasterDto => {
    return {
      id: response.id,
      title: response.title,
      wallet: response.wallet?.toString(),
      chainId: response.paymaster.chainId,
      url: `${Configuration.paymasterApiUrl}/v1/endpoints/${response.accessToken}/sponsor`,
    };
  };
}

export async function sponsorUserOperation(
  paymasterUrl: string,
  userOperation: UserOperation,
  entryPoint: Hex
): Promise<SponsoredUserOperation> {
  try {
    const body: SponsorTransactionBody = { userOperation, entryPoint };
    const response = await axios.post<SponsorTransactionResponse>(
      paymasterUrl,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      paymasterAndData: response.data.paymasterAndData as Hex,
      preVerificationGas: response.data.preVerificationGas as Hex,
      verificationGasLimit: response.data.verificationGasLimit as Hex,
      callGasLimit: response.data.callGasLimit as Hex,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (!axiosError.response?.data) {
        throw error;
      }

      throw new KriptonioError(axiosError.response.data);
    }

    throw error;
  }
}
