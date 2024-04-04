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

export type WalletConfig =
  | EoaWalletWrapperConfig
  | KernelWalletWrapperConfig
  | BiconomyWalletWrapperConfig;

export type EoaWalletWrapperConfig = {
  eoa: EoaWalletConfig;
};

export type KernelWalletWrapperConfig = { kernel: KernelWalletConfig };

export type BiconomyWalletWrapperConfig = { biconomy: BiconomyWalletConfig };

export type KernelWalletConfig = {
  rpcUrl: string;
  bundlerUrl?: string;
  paymasterUrl?: string;
} & PrivateKeyOrMnemonic;

export type BiconomyWalletConfig = {
  rpcUrl: string;
  bundlerUrl?: string;
  paymasterUrl?: string;
} & PrivateKeyOrMnemonic;

export type ExportVersion = '1.0';

export type ExportedWallet =
  | ExportedEoaWallet
  | ExportedKernelWallet
  | ExportedBiconomyWallet;

export type ExportedEoaWallet = {
  version?: ExportVersion;
  eoa: PrivateKeyOrMnemonic;
};

export type ExportedKernelWallet = {
  version?: ExportVersion;
  kernel: Omit<KernelWalletConfig, 'rpcUrl' | 'bundlerUrl' | 'paymasterUrl'> &
    PrivateKeyOrMnemonic;
};

export type ExportedBiconomyWallet = {
  version?: ExportVersion;
  biconomy: Omit<
    BiconomyWalletConfig,
    'rpcUrl' | 'bundlerUrl' | 'paymasterUrl'
  > &
    PrivateKeyOrMnemonic;
};

export type SdkKernelWalletType = {
  type: 'kernel';
};

export type SdkBiconomyWalletType = {
  type: 'biconomy';
};

export type SdkEoaWalletType = {
  type: 'eoa';
};

export type SdkWalletType =
  | SdkKernelWalletType
  | SdkEoaWalletType
  | SdkBiconomyWalletType;

export type SdkSmartWalletConfig = {
  chainId: ChainId;
  paymaster?: {
    disabled?: boolean;
  };
};

export type SdkEoaWalletConfig = {
  chainId: ChainId;
};

export type SdkWalletConfig = SdkEoaWalletConfig | SdkSmartWalletConfig;
