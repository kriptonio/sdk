import { english, generateMnemonic, generatePrivateKey } from 'viem/accounts';
import { PaymasterService } from '../service/PaymasterService';
import { RpcService } from '../service/RpcService';
import { EoaWallet } from './EoaWallet';
import { exportSource } from './Helpers';
import {
  ExportedBiconomyWallet,
  ExportedEoaWallet,
  ExportedKernelWallet,
  ExportedWallet,
  SdkBiconomyWalletType,
  SdkEoaWalletConfig,
  SdkEoaWalletType,
  SdkSmartWalletConfig,
  SdkWalletConfig,
  SdkWalletType,
} from './WalletConfig';
import { WalletFactory } from './WalletFactory';
import { BiconomySmartWallet } from './smart-wallet/BiconomySmartWallet';
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
    TSdkWalletConfig extends SdkEoaWalletType
      ? EoaWallet
      : TSdkWalletConfig extends SdkBiconomyWalletType
        ? BiconomySmartWallet
        : KernelSmartWallet
  >;

  public generate<TSdkWalletConfig extends SdkWalletConfig & SdkWalletType>(
    config: TSdkWalletConfig
  ): Promise<EoaWallet | KernelSmartWallet | BiconomySmartWallet> {
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
      : SdkSmartWalletConfig
  ): Promise<
    TWalletConfig extends ExportedEoaWallet
      ? EoaWallet
      : TWalletConfig extends ExportedKernelWallet
        ? KernelSmartWallet
        : BiconomySmartWallet
  >;

  public from<TConfig extends ExportedWallet>(
    exportedWallet: TConfig,
    config: SdkWalletConfig
  ): Promise<EoaWallet | KernelSmartWallet | BiconomySmartWallet> {
    if ('eoa' in exportedWallet) {
      return this.createEoaWallet(exportedWallet, config as SdkEoaWalletConfig);
    }

    return this.createSmartWallet(
      exportedWallet,
      config as SdkSmartWalletConfig
    );
  }

  private createSmartWallet = async (
    exportedWallet: ExportedKernelWallet | ExportedBiconomyWallet,
    config: SdkSmartWalletConfig
  ) => {
    const initialRpc = await this.#rpcService.getOrCreate({
      chainId: config.chainId,
    });

    const transientWallet =
      'biconomy' in exportedWallet
        ? await BiconomySmartWallet.create({
            ...exportedWallet.biconomy,
            rpcUrl: initialRpc.url,
          })
        : await KernelSmartWallet.create({
            ...exportedWallet.kernel,
            rpcUrl: initialRpc.url,
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

    if ('biconomy' in exportedWallet) {
      return WalletFactory.from({
        biconomy: {
          rpcUrl: walletRpc.url,
          paymasterUrl,
          ...exportSource(exportedWallet.biconomy),
        },
      });
    }

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
