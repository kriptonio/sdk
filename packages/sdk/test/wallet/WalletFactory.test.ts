import { Hex } from 'viem';
import { polygon } from 'viem/chains';
import { WalletFactory } from '../../src';
import { testEnv } from '../testEnv';

describe('WalletFactory', () => {
  it('can import eoa wallet from private key', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey as Hex,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    expect(await wallet.getAddress()).toBe(
      '0x62EF59F5350613287560A42e0032aa6Ce731565f'
    );
  });

  it('can import eoa wallet from private key', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        mnemonic: testEnv.eoa.mnemonic,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    expect(await wallet.getAddress()).toBe(
      '0xfcDed8cc6655c890CB600d5f5C4080ABcac0E271'
    );
  });

  it('can import kernel wallet from private key', async () => {
    const wallet = await WalletFactory.from({
      kernel: {
        privateKey: testEnv.kernel.privateKey as Hex,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    expect(await wallet.getAddress()).toBe(
      '0xf1bc7d6e56836c3A653356A4a8B1928BE98Af729'
    );
  });

  it('can import kernel wallet from mnemonic', async () => {
    const wallet = await WalletFactory.from({
      kernel: {
        mnemonic: testEnv.kernel.mnemonic as Hex,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    expect(await wallet.getAddress()).toBe(
      '0x609234284Cc17619944f9c9CF43b418aB94a97d0'
    );
  });

  it('throws an error when mnemonic and private key not provided', async () => {
    await expect(async () => {
      await WalletFactory.from({
        kernel: {
          rpcUrl: polygon.rpcUrls.default.http[0],
        } as never,
      });
    }).rejects.toThrow('privateKey or mnemonic must be provided');
  });
});
