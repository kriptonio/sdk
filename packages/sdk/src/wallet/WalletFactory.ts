import { KriptonioError } from '../Error';
import { EoaWallet } from './EoaWallet';
import { EoaWalletWrapperConfig, WalletConfig } from './WalletConfig';
import { KernelSmartWallet } from './smart-wallet/KernelSmartWallet';

export class WalletFactory {
  public static async from<TConfig extends WalletConfig>(
    config: TConfig
  ): Promise<
    TConfig extends EoaWalletWrapperConfig ? EoaWallet : KernelSmartWallet
  >;

  public static from<TConfig extends WalletConfig>(
    config: TConfig
  ): Promise<EoaWallet | KernelSmartWallet> {
    if ('eoa' in config) {
      return Promise.resolve(EoaWallet.create(config));
    }

    if ('kernel' in config) {
      return KernelSmartWallet.create(config);
    }

    throw new KriptonioError({ message: 'invalid wallet config' });
  }
}
