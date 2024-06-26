import { ChainId } from '../../src/Chain';
import { createSdk } from '../test.utils';

describe('PaymasterService', () => {
  it('can create new paymaster', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.create({
      title: 'test paymaster',
      chainId: ChainId.BaseSepolia,
      wallet: '0x123',
    });

    expect(paymaster.title).toBe('test paymaster');
    expect(paymaster.wallet).toBe('0x123');
    expect(paymaster.chainId).toBe(ChainId.BaseSepolia);
  });

  it('can get paymaster with provided id', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.create({
      title: 'test paymaster',
      chainId: ChainId.BaseSepolia,
      wallet: '0x123',
    });

    const retrievedPaymaster = await sdk.paymaster.get({ id: paymaster.id });
    expect(retrievedPaymaster.id).toBeDefined();
    expect(retrievedPaymaster.id).toBe(paymaster.id);
  });

  it('can get or create paymaster for provided chain id', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.getOrCreate({
      chainId: ChainId.BaseSepolia,
      wallet: '0x123',
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    });

    expect(paymaster.chainId).toBe(ChainId.BaseSepolia);
  });
});
