import { ChainId } from '../../src/Chain';
import { createSdk } from '../test.utils';

describe('RpcService', () => {
  it('can create new rpc', async () => {
    const sdk = createSdk();
    const rpc = await sdk.rpc.create({
      title: 'test rpc',
      chainId: ChainId.BaseSepolia,
    });

    expect(rpc.title).toBe('test rpc');
    expect(rpc.chainId).toBe(ChainId.BaseSepolia);
  });

  it('can get rpc with provided id', async () => {
    const sdk = createSdk();
    const rpc = await sdk.rpc.create({
      title: 'test rpc',
      chainId: ChainId.BaseSepolia,
    });

    const retrievedRpc = await sdk.rpc.get({ id: rpc.id });
    expect(retrievedRpc.id).toBeDefined();
    expect(retrievedRpc.id).toBe(rpc.id);
  });

  it('can get or create rpc for provided chain id', async () => {
    const sdk = createSdk();
    const rpc = await sdk.rpc.getOrCreate({
      chainId: ChainId.BaseSepolia,
      wallet: '0x123',
    });

    expect(rpc.chainId).toBe(ChainId.BaseSepolia);
  });
});
