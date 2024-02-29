import { ChainId } from '../Chain';

export type PrivateKeyOrMnemonic =
  | {
      privateKey: string;
    }
  | {
      mnemonic: string;
    };

export type EoaWalletConfig = {
  rpcUrl: string;
} & PrivateKeyOrMnemonic;

export type WalletConfig = EoaWalletWrapperConfig | KernelWalletWrapperConfig;

export type EoaWalletWrapperConfig = {
  eoa: EoaWalletConfig;
};

export type KernelWalletWrapperConfig = {
  kernel: KernelWalletConfig;
};

export type KernelWalletConfig = {
  rpcUrl: string;
  bundlerUrl?: string;
  paymasterUrl?: string;
} & PrivateKeyOrMnemonic;

export type ExportVersion = '1.0';

export type ExportedWallet = ExportedEoaWallet | ExportedKernelWallet;

export type ExportedEoaWallet = {
  version?: ExportVersion;
  eoa: PrivateKeyOrMnemonic;
};

export type ExportedKernelWallet = {
  version?: ExportVersion;
  kernel: Omit<KernelWalletConfig, 'rpcUrl' | 'bundlerUrl' | 'paymasterUrl'> &
    PrivateKeyOrMnemonic;
};

export type SdkKernelWalletType = {
  type?: 'kernel';
};

export type SdkEoaWalletType = {
  type: 'eoa';
};

export type SdkWalletType = SdkKernelWalletType | SdkEoaWalletType;

export type SdkKernelWalletConfig = {
  chainId: ChainId;
  paymaster?: {
    disabled?: boolean;
  };
};

export type SdkEoaWalletConfig = {
  chainId: ChainId;
};

export type SdkWalletConfig = SdkEoaWalletConfig | SdkKernelWalletConfig;
