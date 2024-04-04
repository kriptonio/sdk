import { ChainId, KernelSmartWallet } from '../../src';
import { EoaWallet } from '../../src/wallet/EoaWallet';
import { createSdk } from '../test.utils';
import { testEnv } from '../testEnv';

describe('WalletService', () => {
  it('can generate a smart wallet for a chain id', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.generate({
      chainId: ChainId.BaseSepolia,
      type: 'kernel',
    });

    expect(wallet.address).toBeDefined();
    expect(wallet).toBeInstanceOf(KernelSmartWallet);
  });

  it('can generate a smart wallet for a provided config', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.generate({
      chainId: ChainId.BaseSepolia,
      type: 'eoa',
    });

    expect(wallet.address).toBeDefined();
    expect(wallet).toBeInstanceOf(EoaWallet);
  });

  it('can create a smart wallet from a provided config', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        version: '1.0',
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    expect(wallet.address).toBeDefined();
    expect(wallet).toBeInstanceOf(KernelSmartWallet);
  });

  it('can create an eoa from a provided config', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        version: '1.0',
        eoa: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    expect(wallet.address).toBeDefined();
    expect(wallet).toBeInstanceOf(EoaWallet);
  });
});
