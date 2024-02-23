import {
  GetTransactionReceiptReturnType,
  Hex,
  createPublicClient,
  encodeDeployData,
  getContract,
  http,
  parseUnits,
  verifyMessage,
  verifyTypedData,
} from 'viem';
import { sendRawTransaction } from 'viem/actions';
import { polygon, polygonMumbai } from 'viem/chains';
import { WalletFactory } from '../../src';
import { testEnv } from '../testEnv';

describe('EoaWallet', () => {
  it('can export when created with private key', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    const exported = wallet.export();
    expect(Object.keys(exported.eoa).length).toBe(1);
    expect('privateKey' in exported.eoa && exported.eoa.privateKey).toBe(
      testEnv.eoa.privateKey
    );
  });

  it('can export when created with mnemonic', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        mnemonic: testEnv.eoa.mnemonic,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    const exported = wallet.export();
    expect(Object.keys(exported.eoa).length).toBe(1);
    expect('mnemonic' in exported.eoa && exported.eoa.mnemonic).toBe(
      testEnv.eoa.mnemonic
    );
  });

  it('can get nonce', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    const nonce = await wallet.getNonce();
    expect(nonce).not.toBeNaN();
  });

  it('can sign a message', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    const message = 'hello world';
    const signature = await wallet.signMessage(message);
    const valid = await verifyMessage({
      address: wallet.address,
      message,
      signature,
    });
    expect(valid).toBe(true);
  });

  it('can sign typed data', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygon.rpcUrls.default.http[0],
      },
    });

    const typedData = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
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
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: polygonMumbai.id,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC' as Hex,
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
    const signature = await wallet.signTypedData({
      domain: typedData.domain,
      types: typedData.types,
      message: typedData.message,
      primaryType: typedData.primaryType,
    });

    const valid = await verifyTypedData({
      address: wallet.address,
      signature,
      message: typedData.message,
      primaryType: 'Mail',
      types: typedData.types,
      domain: typedData.domain as never,
    });

    expect(valid).toBe(true);
  });

  it('can sign a transaction', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygonMumbai.rpcUrls.default.http[0],
      },
    });

    const publicClient = createPublicClient({
      transport: http(polygonMumbai.rpcUrls.default.http[0]),
    });

    const prepared = await wallet.client.prepareTransactionRequest({
      value: 0n,
      data: '0x',
      chain: polygonMumbai,
      type: 'eip1559',
    });

    const signed = await wallet.signTransaction({
      ...prepared,
      chainId: polygonMumbai.id,
    });
    const hash = await sendRawTransaction(publicClient, {
      serializedTransaction: signed,
    });
    console.log('signed and sent transaction with hash', hash);

    const receipt: GetTransactionReceiptReturnType =
      await publicClient.waitForTransactionReceipt({ hash });

    expect(receipt.status).toBe('success');
  });

  it('can estimate gas', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygonMumbai.rpcUrls.default.http[0],
      },
    });

    const estimation = await wallet.estimateGas({
      to: wallet.address,
      value: 0n,
      data: '0x',
    });

    expect(estimation).toBe(21000n);
  });

  it('can send transaction with private key', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        privateKey: testEnv.eoa.privateKey,
        rpcUrl: polygonMumbai.rpcUrls.default.http[0],
      },
    });

    const publicClient = createPublicClient({
      transport: http(polygonMumbai.rpcUrls.default.http[0]),
    });

    const receiver = '0x13a11CeC9970d58E1170e98d28D2812a23890341';
    const beforeBalance = await publicClient.getBalance({
      address: receiver,
    });

    const value = parseUnits('0.00001', 18);
    const statusUpdatesMock = jest.fn();
    const hash = await wallet.sendTransaction(
      {
        to: receiver,
        value,
        data: '0x',
      },
      {
        onStatusChange: statusUpdatesMock,
      }
    );
    console.log(
      'sent transaction with hash',
      hash,
      'from',
      wallet.address,
      'to',
      receiver
    );
    expect(statusUpdatesMock).toHaveBeenCalledTimes(2);

    const receipt: GetTransactionReceiptReturnType =
      await publicClient.waitForTransactionReceipt({ hash, confirmations: 5 });
    expect(receipt.status).toBe('success');

    const transaction = await publicClient.getTransaction({
      hash: receipt.transactionHash,
    });
    expect(transaction.value).toBe(value);

    const afterBalance = await publicClient.getBalance({
      address: receiver,
    });
    expect(afterBalance).toBe(beforeBalance + value);
  });

  it('can send transaction with mnemonic', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        mnemonic: testEnv.eoa.mnemonic,
        rpcUrl: polygonMumbai.rpcUrls.default.http[0],
      },
    });

    const publicClient = createPublicClient({
      transport: http(polygonMumbai.rpcUrls.default.http[0]),
    });

    const hash = await wallet.sendTransaction({
      to: wallet.address,
      value: 0n,
      data: '0x',
    });
    console.log('sent transaction with hash', hash);

    const receipt: GetTransactionReceiptReturnType =
      await publicClient.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe('success');
  });

  it('can deploy a contract', async () => {
    const wallet = await WalletFactory.from({
      eoa: {
        mnemonic: testEnv.eoa.mnemonic,
        rpcUrl: polygonMumbai.rpcUrls.default.http[0],
      },
    });

    const publicClient = createPublicClient({
      transport: http(polygonMumbai.rpcUrls.default.http[0]),
    });

    const abi = [
      {
        name: 'sayHello',
        type: 'function',
        inputs: [],
        outputs: [
          {
            name: '',
            type: 'string',
            internalType: 'string',
          },
        ],
        stateMutability: 'pure',
      },
    ];

    const data = encodeDeployData({
      abi,
      bytecode:
        '0x608060405234801561001057600080fd5b5060e58061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063ef5fb05b14602d575b600080fd5b604080518082018252600c81526b48656c6c6f2054686572652160a01b60208201529051605991906062565b60405180910390f35b60006020808352835180602085015260005b81811015608e578581018301518582016040015282016074565b506000604082860101526040601f19601f830116850101925050509291505056fea2646970667358221220706f11a89121ed6082df559c2decbb3512d5115613c97df8d8611ddffca8dc3c64736f6c63430008180033',
      args: [],
    });

    const deployment = await wallet.deployContract({
      bytecode: data,
    });

    console.log(
      'sent transaction with hash',
      deployment.hash,
      'address',
      deployment.address
    );

    const receipt: GetTransactionReceiptReturnType =
      await publicClient.waitForTransactionReceipt({ hash: deployment.hash });
    expect(receipt.status).toBe('success');

    const contract = getContract({
      abi,
      address: deployment.address,
      client: publicClient,
    });

    const response = await contract.read.sayHello();
    expect(response).toBe('Hello There!');
  });
});
