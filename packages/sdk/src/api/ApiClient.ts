import axios, { AxiosError, Method } from 'axios';
import { Configuration } from '../Configuration';
import { KriptonioError } from '../Error';
import { ApiError } from '../model/ApiError';
import { ApiErrorCode } from '../types/api/apiErrorCode';
import { ApiErrorResponse } from '../types/api/apiErrorResponse';
import { OrganizationResponse } from '../types/api/organizationResponse';

export type IHttpOkResponse<R> = {
  ok: true;
  data: R;
  httpStatusCode: number;
};

export type IHttpNotOkResponse = {
  ok: false;
  httpStatusCode: number;
  error: ApiError;
};

export type IHttpResponse<R> = IHttpOkResponse<R> | IHttpNotOkResponse;

export interface AuthenticationData {
  accessToken?: string;
  sessionToken?: string;
  organizationId?: string;
}

export interface AjaxOptions {
  host?: string;
  method?: Method;
}

export interface IAjaxCallOptions {
  baseURL?: string;
  data?: unknown;
  timeout?: number;
}

export class ApiClient {
  #authentication: AuthenticationData | null = null;

  constructor(authentication: AuthenticationData) {
    this.setAuthentication(authentication);
  }

  private readonly call = async <T = unknown>(
    method: Method,
    url: string,
    options: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    try {
      const requestHeaders: { [key: string]: string } = {};

      if (this.authenticationHeader) {
        requestHeaders[this.authenticationHeader.key] =
          this.authenticationHeader.value;
      }

      if (options.data) {
        requestHeaders['Content-Type'] = 'application/json';
      }

      const response = await axios.request<T>({
        method,
        url,
        data: options.data
          ? JSON.stringify(options.data, (_, value) =>
              typeof value === 'bigint' ? value.toString() : value
            )
          : undefined,
        headers: requestHeaders,
        baseURL: options.baseURL ?? Configuration.apiUrl,
        timeout: options.timeout ?? 100_000,
      });

      return {
        ok: true,
        data: response.data,
        httpStatusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (axiosError.response?.status) {
        return {
          ok: false,
          httpStatusCode: axiosError.response.status,
          error: ApiError.from(
            axiosError.response.data,
            axiosError.response.status
          ),
        };
      }

      if (error instanceof Error) {
        return {
          ok: false,
          httpStatusCode: 0,
          error: ApiError.from(
            {
              message: error.message,
              code: ApiErrorCode.Unknown,
            },
            0
          ),
        };
      }

      return {
        ok: false,
        httpStatusCode: 0,
        error: ApiError.from(
          {
            message: 'Unknown error',
            code: ApiErrorCode.Unknown,
          },
          0
        ),
      };
    }
  };

  private get authenticationHeader() {
    if (!this.#authentication) {
      return null;
    }

    if (this.#authentication.accessToken) {
      return { key: 'X-Access-Token', value: this.#authentication.accessToken };
    }

    if (this.#authentication.sessionToken) {
      return {
        key: 'X-Session-Token',
        value: this.#authentication.sessionToken,
      };
    }

    return null;
  }

  public currentOrganization = async (): Promise<string> => {
    if (this.#authentication?.organizationId) {
      return this.#authentication.organizationId;
    }

    if (!this.#authentication?.accessToken) {
      throw new KriptonioError({ message: 'access token is not set' });
    }

    const response = await this.get<OrganizationResponse>(
      `/v1/access-tokens/${this.#authentication.accessToken}/organization`
    );

    if (response.ok) {
      // cache current organization
      this.#authentication.organizationId = response.data.id;

      return response.data.id;
    }

    throw new KriptonioError({
      message: `error while fetching organization for current access token. ${response.error.stringify()}`,
    });
  };

  public setAuthentication = (authentication: AuthenticationData) => {
    this.#authentication = authentication;
  };

  public get = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('GET', url, opts);
  };

  public post = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('POST', url, opts);
  };

  public put = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('PUT', url, opts);
  };

  public delete = <T>(
    url: string,
    opts: IAjaxCallOptions = {}
  ): Promise<IHttpResponse<T>> => {
    return this.call<T>('DELETE', url, opts);
  };
}
