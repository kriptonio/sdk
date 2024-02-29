import { english, generateMnemonic, generatePrivateKey } from 'viem/accounts';
import { PaymasterService } from '../service/PaymasterService';
import { RpcService } from '../service/RpcService';
import { EoaWallet } from './EoaWallet';
import { exportSource } from './Helpers';
import {
  ExportedEoaWallet,
  ExportedKernelWallet,
  ExportedWallet,
  SdkEoaWalletConfig,
  SdkEoaWalletType,
  SdkKernelWalletConfig,
  SdkWalletConfig,
  SdkWalletType,
} from './WalletConfig';
import { WalletFactory } from './WalletFactory';
import { KernelSmartWallet } from './smart-wallet/KernelSmartWallet';

export class WalletService {
  #rpcService: RpcService;
  #paymasterService: PaymasterService;

  constructor(rpcService: RpcService, paymasterService: PaymasterService) {
    this.#rpcService = rpcService;
    this.#paymasterService = paymasterService;
  }

  public generate<TSdkWalletConfig extends SdkWalletConfig & SdkWalletType>(
    config: TSdkWalletConfig
  ): Promise<
    TSdkWalletConfig extends SdkEoaWalletType ? EoaWallet : KernelSmartWallet
  >;

  public generate<TSdkWalletConfig extends SdkWalletConfig & SdkWalletType>(
    config: TSdkWalletConfig
  ): Promise<EoaWallet | KernelSmartWallet> {
    if (config.type === 'eoa') {
      return this.createEoaWallet(
        {
          version: '1.0',
          eoa: {
            mnemonic: generateMnemonic(english),
          },
        },
        config
      );
    }

    return this.createSmartWallet(
      {
        version: '1.0',
        kernel: {
          privateKey: generatePrivateKey(),
        },
      },
      config
    );
  }

  public from<TWalletConfig extends ExportedWallet>(
    config: TWalletConfig,
    options: TWalletConfig extends ExportedEoaWallet
      ? SdkEoaWalletConfig
      : SdkKernelWalletConfig
  ): Promise<
    TWalletConfig extends ExportedEoaWallet ? EoaWallet : KernelSmartWallet
  >;

  public from<TConfig extends ExportedWallet>(
    exportedWallet: TConfig,
    config: SdkWalletConfig
  ): Promise<EoaWallet | KernelSmartWallet> {
    if ('eoa' in exportedWallet) {
      return this.createEoaWallet(exportedWallet, config as SdkEoaWalletConfig);
    }

    return this.createSmartWallet(
      exportedWallet,
      config as SdkKernelWalletConfig
    );
  }

  private createSmartWallet = async (
    exportedWallet: ExportedKernelWallet,
    config: SdkKernelWalletConfig
  ) => {
    const initialRpc = await this.#rpcService.getOrCreate({
      chainId: config.chainId,
    });

    const transientWallet = await KernelSmartWallet.create({
      kernel: {
        ...exportedWallet.kernel,
        rpcUrl: initialRpc.url,
      },
    });

    const walletRpc = await this.#rpcService.getOrCreate({
      chainId: config.chainId,
      wallet: transientWallet.address,
    });

    const paymasterUrl = !config.paymaster?.disabled
      ? (
          await this.#paymasterService.getOrCreate({
            chainId: config.chainId,
            entryPoint: transientWallet.entryPoint,
            wallet: transientWallet.address,
          })
        ).url
      : undefined;

    return WalletFactory.from({
      kernel: {
        rpcUrl: walletRpc.url,
        paymasterUrl,
        ...exportSource(exportedWallet.kernel),
      },
    });
  };

  private createEoaWallet = async (
    exportedWallet: ExportedEoaWallet,
    config: SdkEoaWalletConfig
  ) => {
    const initialRpc = await this.#rpcService.getOrCreate({
      chainId: config.chainId,
    });
    const address = await EoaWallet.computeAddress(
      exportedWallet,
      initialRpc.url
    );

    const walletRpc = await this.#rpcService.getOrCreate({
      chainId: config.chainId,
      wallet: address,
    });

    return WalletFactory.from({
      eoa: {
        rpcUrl: walletRpc.url,
        ...exportSource(exportedWallet.eoa),
      },
    });
  };
}
