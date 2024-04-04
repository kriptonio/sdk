import { KriptonioError } from '../Error';
import { EoaWallet } from './EoaWallet';
import {
  EoaWalletWrapperConfig,
  KernelWalletWrapperConfig,
  WalletConfig,
} from './WalletConfig';
import { BiconomySmartWallet } from './smart-wallet/BiconomySmartWallet';
import { KernelSmartWallet } from './smart-wallet/KernelSmartWallet';

export class WalletFactory {
  public static async from<TConfig extends WalletConfig>(
    config: TConfig
  ): Promise<
    TConfig extends EoaWalletWrapperConfig
      ? EoaWallet
      : TConfig extends KernelWalletWrapperConfig
        ? KernelSmartWallet
        : BiconomySmartWallet
  >;

  public static from<TConfig extends WalletConfig>(
    config: TConfig
  ): Promise<EoaWallet | KernelSmartWallet | BiconomySmartWallet> {
    if ('eoa' in config) {
      return Promise.resolve(EoaWallet.create(config));
    }

    if ('kernel' in config) {
      return KernelSmartWallet.create(config.kernel);
    }

    if ('biconomy' in config) {
      return BiconomySmartWallet.create(config.biconomy);
    }

    throw new KriptonioError({ message: 'invalid wallet config' });
  }
}
