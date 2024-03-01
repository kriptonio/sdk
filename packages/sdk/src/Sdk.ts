import { Configuration } from './Configuration';
import { ApiClient, AuthenticationData } from './api/ApiClient';
import { PaymasterService } from './service/PaymasterService';
import { RpcService } from './service/RpcService';
import { SmartContractService } from './service/SmartContractService';
import { WalletService } from './wallet/WalletService';

export type SdkConfiguration = {
  accessToken: string;
};

export type SdkReconfiguration = AuthenticationData & {
  apiUrl?: string;
  rpcApiUrl?: string;
  paymasterApiUrl?: string;
  organizationId?: string;
};

export class KriptonioSdk {
  #apiClient: ApiClient;
  public readonly wallet: WalletService;
  public readonly smartContract: SmartContractService;
  public readonly rpc: RpcService;
  public readonly paymaster: PaymasterService;

  constructor(config: SdkConfiguration) {
    this.#apiClient = new ApiClient({ accessToken: config.accessToken });
    this.rpc = new RpcService(this.#apiClient);
    this.paymaster = new PaymasterService(this.#apiClient);
    this.wallet = new WalletService(this.rpc, this.paymaster);
    this.smartContract = new SmartContractService(this.#apiClient);
  }

  public configure = (config: SdkReconfiguration) => {
    if (config.accessToken || config.sessionToken) {
      this.#apiClient.setAuthentication(config);
    }

    if (config.apiUrl) {
      Configuration.apiUrl = config.apiUrl;
    }

    if (config.rpcApiUrl) {
      Configuration.rpcApiUrl = config.rpcApiUrl;
    }

    if (config.paymasterApiUrl) {
      Configuration.paymasterApiUrl = config.paymasterApiUrl;
    }
  };
}
