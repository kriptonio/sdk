import { ChainId } from '../../src/Chain';
import { createSdk } from '../test.utils';

describe('PaymasterService', () => {
  it('can create new paymaster', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.create({
      title: 'test paymaster',
      chainId: ChainId.PolygonMumbai,
      wallet: '0x123',
    });

    expect(paymaster.title).toBe('test paymaster');
    expect(paymaster.wallet).toBe('0x123');
    expect(paymaster.chainId).toBe(ChainId.PolygonMumbai);
  });

  it('can get paymaster with provided id', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.create({
      title: 'test paymaster',
      chainId: ChainId.PolygonMumbai,
      wallet: '0x123',
    });

    const retrievedPaymaster = await sdk.paymaster.get({ id: paymaster.id });
    expect(retrievedPaymaster.id).toBeDefined();
    expect(retrievedPaymaster.id).toBe(paymaster.id);
  });

  it('can get or create paymaster for provided chain id', async () => {
    const sdk = createSdk();
    const paymaster = await sdk.paymaster.getOrCreate({
      chainId: ChainId.PolygonMumbai,
      wallet: '0x123',
      entryPoint: '0x123',
    });

    expect(paymaster.chainId).toBe(ChainId.PolygonMumbai);
  });
});
