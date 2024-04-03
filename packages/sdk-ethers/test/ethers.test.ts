import { verifyMessage } from '@ambire/signature-validator';
import { ChainId } from '@kriptonio/sdk';
import { TypedDataEncoder, ethers, isError } from 'ethers';
import { Hex, verifyTypedData } from 'viem';
import { baseSepolia } from 'viem/chains';
import { createKriptonioSigner } from '../src';
import { createSdk } from './test.utils';
import { testEnv } from './testEnv';

describe('ethers plugin', () => {
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

    const signer = createKriptonioSigner(wallet);
    const address = await signer.getAddress();
    expect(address).toBe(wallet.address);
  });

  it('can sign message', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);
    const message = 'hello world';
    const signature = await signer.signMessage(message);

    const isValidSig = await verifyMessage({
      signer: wallet.address,
      message,
      signature,
      provider: new ethers.JsonRpcProvider(wallet.rpcUrl) as never,
    });

    expect(isValidSig).toBe(true);
  });

  it('can sign typed data', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        eoa: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);

    const typedData = {
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: baseSepolia.id,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      types: {
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallet', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person' },
          { name: 'contents', type: 'string' },
        ],
      },
      message: {
        from: {
          name: 'Alice',
          wallet: wallet.address,
        },
        to: {
          name: 'Bob',
          wallet: wallet.address,
        },
        contents: 'Hello, Bob!',
      },
    };

    const signature = await signer.signTypedData(
      typedData.domain,
      typedData.types,
      typedData.message
    );

    expect(signature).toBeDefined();

    const encoder = new TypedDataEncoder(typedData.types);
    const valid = await verifyTypedData({
      address: wallet.address,
      signature: signature as Hex,
      message: typedData.message,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      primaryType: encoder.primaryType as any,
      types: typedData.types,
      domain: typedData.domain as never,
    });
    expect(valid).toBe(true);
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

    const signer = createKriptonioSigner(wallet);
    const tx = await signer.sendTransaction({
      from: wallet.address,
      to: wallet.address,
      value: ethers.parseEther('0'),
    });
    expect(tx.value).toBe(0n);

    const receipt = await signer.provider?.waitForTransaction(tx.hash);
    expect(receipt?.status).toBe(1);
  });

  it('can catch error when there are insufficient funds', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        eoa: {
          privateKey: ethers.Wallet.createRandom().privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);
    try {
      await signer.sendTransaction({
        from: wallet.address,
        to: wallet.address,
        value: ethers.parseEther('0'),
      });

      expect(true).toBe(false);
    } catch (e) {
      const ethersError = isError(e, 'UNKNOWN_ERROR');
      expect(ethersError).toBe(true);

      const error = e as Error;
      expect(error.message).toContain(
        'gas required exceeds allowance (0) (code=UNKNOWN_ERROR, version=6.11.1)'
      );
    }
  });

  it('can estimate gas', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);
    const estimation = await signer.estimateGas({
      from: wallet.address,
      to: wallet.address,
      value: ethers.parseEther('0'),
    });

    expect(estimation).toBeGreaterThan(150_000n);
  });

  it('can estimate gas with empty account', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: ethers.Wallet.createRandom().privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);
    const estimation = await signer.estimateGas({
      from: wallet.address,
      to: wallet.address,
      value: ethers.parseEther('0'),
    });

    expect(estimation).toBeGreaterThan(150_000n);
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

    const signer = createKriptonioSigner(wallet);
    const contract = new ethers.ContractFactory(
      abi,
      '0x608060405234801561001057600080fd5b506000805560e8806100236000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063a87d942c146037578063cc95d5aa14604c575b600080fd5b60005460405190815260200160405180910390f35b605b60573660046074565b605d565b005b80600080828254606c9190608c565b909155505050565b600060208284031215608557600080fd5b5035919050565b8082018082111560ac57634e487b7160e01b600052601160045260246000fd5b9291505056fea26469706673582212205f2221e1dfcfaf0f9a370fd47fa895a200418cf029a6bab0b57800ef228e2d4264736f6c63430008170033',
      signer
    );

    const deploymentTx = await contract.getDeployTransaction();
    const tx = await signer.sendTransaction({
      data: deploymentTx.data,
      value: deploymentTx.value,
    });

    const receipt = await signer.provider?.waitForTransaction(tx.hash);
    expect(receipt?.status).toBe(1);
  });

  it('can interact with contract', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        kernel: {
          privateKey: testEnv.kernel.privateKey,
        },
      },
      { chainId: ChainId.BaseSepolia }
    );

    const signer = createKriptonioSigner(wallet);
    const contract = new ethers.Contract(
      '0x787f5426D1349Db61a20181c1e07713633780f8e',
      abi,
      signer
    );

    const tx = await contract.incrementCount(1n);
    expect(tx.hash).toBeDefined();

    const currentCount = await contract.getCount();
    expect(currentCount).toBeGreaterThan(0n);

    const estimation = await contract.incrementCount.estimateGas(1n);
    expect(estimation).toBeGreaterThan(100_000n);
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
