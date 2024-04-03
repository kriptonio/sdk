import { Hex } from 'viem';

export const testEnv = {
  sdk: {
    accessToken: process.env.KRIPTONIO_SDK_ACCESS_TOKEN as string,
  },
  eoa: {
    privateKey: process.env.EOA_PRIVATE_KEY as Hex,
    mnemonic: process.env.EOA_MNEMONIC as string,
  },
  kernel: {
    privateKey: process.env.KERNEL_PRIVATE_KEY as Hex,
    mnemonic: process.env.KERNEL_MNEMONIC as string,
    chainId: parseInt(process.env.KERNEL_CHAIN_ID as string),
  },
  biconomy: {
    privateKey: process.env.KERNEL_PRIVATE_KEY as Hex,
    mnemonic: process.env.KERNEL_MNEMONIC as string,
    chainId: parseInt(process.env.KERNEL_CHAIN_ID as string),
  },
};
