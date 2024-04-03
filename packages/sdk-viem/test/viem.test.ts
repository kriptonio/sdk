import { ChainId } from '@kriptonio/sdk';
import { publicActions } from 'viem';
import { generatePrivateKey } from 'viem/accounts';
import { createKriptonioClient } from '../src';
import { createSdk } from './test.utils';
import { testEnv } from './testEnv';

describe('viem plugin', () => {
  it('can get address', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const client = createKriptonioClient(wallet);
    const addresses = await client.getAddresses();
    expect(addresses.length).toBe(1);
    expect(addresses[0]).toBe(wallet.address);
  });

  it('can send transaction', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const client = createKriptonioClient(wallet).extend(publicActions);
    const hash = await client.sendTransaction({
      to: wallet.address,
      value: 0n,
    });

    const receipt = await client.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe('success');
  });

  it('can estimate with empty account', async () => {
    const sdk = createSdk();
    const privateKey = generatePrivateKey();
    const wallet = await sdk.wallet.from(
      {
        eoa: {
          privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const client = createKriptonioClient(wallet).extend(publicActions);
    const estimation = client.estimateGas({
      to: wallet.address,
      value: 0n,
    });

    expect(estimation).resolves.toBeGreaterThan(150_000n);
  });

  it('can deploy contract', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const client = createKriptonioClient(wallet).extend(publicActions);
    const hash = await client.deployContract({
      abi,
      bytecode:
        '0x608060405234801561001057600080fd5b506000805560e8806100236000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063a87d942c146037578063cc95d5aa14604c575b600080fd5b60005460405190815260200160405180910390f35b605b60573660046074565b605d565b005b80600080828254606c9190608c565b909155505050565b600060208284031215608557600080fd5b5035919050565b8082018082111560ac57634e487b7160e01b600052601160045260246000fd5b9291505056fea26469706673582212205f2221e1dfcfaf0f9a370fd47fa895a200418cf029a6bab0b57800ef228e2d4264736f6c63430008170033',
    });

    const receipt = await client.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe('success');
  });

  it('can write to a contract', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const client = createKriptonioClient(wallet).extend(publicActions);
    const hash = await client.writeContract({
      abi,
      address: '0x787f5426D1349Db61a20181c1e07713633780f8e',
      functionName: 'incrementCount',
      args: [BigInt(1)],
    });

    const receipt = await client.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe('success');
  });
});

const abi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'getCount',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    name: 'incrementCount',
    type: 'function',
    inputs: [
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
