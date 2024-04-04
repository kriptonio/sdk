import { verifyMessage } from '@ambire/signature-validator';
import axios from 'axios';
import { ethers } from 'ethers';
import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
  deepHexlify,
  isSmartAccountDeployed,
} from 'permissionless';
import { signerToBiconomySmartAccount } from 'permissionless/accounts';
import {
  GetTransactionReceiptReturnType,
  Hex,
  createPublicClient,
  encodeDeployData,
  getContract,
  http,
  parseUnits,
} from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import {
  Configuration,
  KriptonioError,
  WalletFactory,
  getChain,
  sponsorUserOperation,
} from '../../src';
import { BlockchainResponse } from '../../src/types/api/blockchainResponse';
import { createSdk, createSdkConfig } from '../test.utils';
import { testEnv } from '../testEnv';

describe('BiconomySmartWallet', () => {
  it('has the same address across all supported chains', async () => {
    const sdkConfig = createSdkConfig();
    const response = await axios.get<BlockchainResponse[]>('v1/blockchains', {
      baseURL: sdkConfig.apiUrl,
      headers: {
        'x-access-token': testEnv.sdk.accessToken,
      },
    });

    const supportedChains = response.data.filter((c) =>
      c.features.includes('Erc4337Bundler')
    );
    expect(supportedChains.length).toBeGreaterThan(0);

    const referenceChain = getChain(supportedChains[0].chainId);
    const referenceWallet = await WalletFactory.from({
      biconomy: {
        privateKey: testEnv.biconomy.privateKey,
        rpcUrl: referenceChain.rpcUrls.default.http[0],
      },
    });

    for (const chain of supportedChains.map((c) => getChain(c.chainId))) {
      const wallet = await WalletFactory.from({
        biconomy: {
          privateKey: testEnv.biconomy.privateKey,
          rpcUrl: chain.rpcUrls.default.http[0],
        },
      });

      expect(wallet.address).toBe(referenceWallet.address);
    }
  });

  it('can export when created with private key', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: testEnv.biconomy.privateKey,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const exported = wallet.export();
    expect(Object.keys(exported.biconomy).length).toBe(1);
    expect(
      'privateKey' in exported.biconomy && exported.biconomy.privateKey
    ).toBe(testEnv.biconomy.privateKey);
  });

  it('can export when created with mnemonic', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const exported = wallet.export();
    expect(Object.keys(exported.biconomy).length).toBe(1);
    expect('mnemonic' in exported.biconomy && exported.biconomy.mnemonic).toBe(
      testEnv.biconomy.mnemonic
    );
  });

  it('can get nonce', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const nonce = await wallet.getNonce();
    expect(nonce).toBeGreaterThan(-1);
  });

  it('can get deploy wallet', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const client = createPublicClient({
      transport: http(wallet.rpcUrl),
      chain: wallet.chain,
    });

    const hash = await wallet.deploy();
    console.log('deployed with transaction hash', hash);
    expect(await isSmartAccountDeployed(client, wallet.address)).toBe(true);
  });

  it('can sign message when signing string', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    await wallet.deploy();

    const message = 'hello world';
    const signature = await wallet.signMessage(message);

    const publicClient = createPublicClient({
      transport: http(wallet.rpcUrl),
    });

    const isValidSig = await publicClient.verifyMessage({
      address: wallet.address,
      message,
      signature,
    });

    expect(isValidSig).toBe(true);
  });

  it('can sign message when signing hex', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: generatePrivateKey(),
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    await wallet.deploy();
    const message: Hex = '0x68656c6c6f20776f726c64';
    const signature = await wallet.signMessage({ raw: message });

    const publicClient = createPublicClient({
      transport: http(wallet.rpcUrl),
    });

    const isValidSig = await publicClient.verifyMessage({
      address: wallet.address,
      message: { raw: message },
      signature,
    });

    expect(isValidSig).toBe(true);
  });

  it('can sign typed data', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    await wallet.deploy();

    const typedData = {
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
      primaryType: 'Mail',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: wallet.chain.id,
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

    const isValidSig = await verifyMessage({
      signer: wallet.address,
      typedData,
      signature,
      provider: new ethers.JsonRpcProvider(wallet.rpcUrl) as never,
    });

    expect(isValidSig).toBe(true);
  });

  it('can get wallet version when deployed', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    await wallet.deploy();

    const version = await wallet.getVersion();
    expect(version).toBe('2.0.0');
  });

  it('returns null version when wallet not deployed', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: generatePrivateKey(),
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const version = await wallet.getVersion();
    expect(version).toBe(null);
  });

  it('throws error when invalid paymaster url is provided', async () => {
    const sdk = createSdk();
    const chain = baseSepolia;
    const rpc = await sdk.rpc.getOrCreate({ chainId: chain.id });
    const paymasterUrl = `${Configuration.paymasterApiUrl}/v1/endpoints/invalid/sponsor`;
    const privateKey = testEnv.biconomy.privateKey;

    const signer = privateKeyToAccount(privateKey);
    const publicClient = createPublicClient({
      transport: http(rpc.url),
      chain,
    });

    const entryPoint = ENTRYPOINT_ADDRESS_V06;
    const biconomyAccount = await signerToBiconomySmartAccount(publicClient, {
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      signer: signer,
    });

    const smartAccountClient = createSmartAccountClient({
      account: biconomyAccount,
      entryPoint,
      chain,
      bundlerTransport: http(rpc.url),
      middleware: {
        sponsorUserOperation: async (args) => {
          const paymasterInfo = await sponsorUserOperation(
            paymasterUrl,
            deepHexlify(args.userOperation),
            entryPoint
          );

          return {
            ...args.userOperation,
            paymasterAndData: paymasterInfo.paymasterAndData,
            callGasLimit: BigInt(paymasterInfo.callGasLimit),
            verificationGasLimit: BigInt(paymasterInfo.verificationGasLimit),
            preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
          };
        },
      },
    });

    const value = parseUnits('0.00001', 18);
    await expect(async () => {
      await smartAccountClient.sendTransaction({
        to: biconomyAccount.address,
        value,
      });
    }).rejects.toThrow(
      new KriptonioError({
        message: 'paymaster with provided access token not found',
      })
    );
  });

  it('sends transaction via biconomy account', async () => {
    const sdk = createSdk();
    const chain = baseSepolia;
    const rpc = await sdk.rpc.getOrCreate({ chainId: chain.id });
    const paymaster = await sdk.paymaster.getOrCreate({
      chainId: chain.id,
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    });
    const privateKey = testEnv.biconomy.privateKey;

    const signer = privateKeyToAccount(privateKey);
    const publicClient = createPublicClient({
      transport: http(rpc.url),
      chain,
    });

    const entryPoint = ENTRYPOINT_ADDRESS_V06;
    const biconomyAccount = await signerToBiconomySmartAccount(publicClient, {
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      signer: signer,
    });

    const smartAccountClient = createSmartAccountClient({
      account: biconomyAccount,
      entryPoint,
      chain,
      bundlerTransport: http(rpc.url),
      middleware: {
        sponsorUserOperation: async (args) => {
          const paymasterInfo = await sponsorUserOperation(
            paymaster.url,
            deepHexlify(args.userOperation),
            entryPoint
          );

          return {
            ...args.userOperation,
            paymasterAndData: paymasterInfo.paymasterAndData,
            callGasLimit: BigInt(paymasterInfo.callGasLimit),
            verificationGasLimit: BigInt(paymasterInfo.verificationGasLimit),
            preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
          };
        },
      },
    });

    const value = parseUnits('0.00001', 18);
    const hash = await smartAccountClient.sendTransaction({
      to: biconomyAccount.address,
      value,
    });

    expect(hash).toBeDefined();
  });

  it('can deploy a contract', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          mnemonic: testEnv.biconomy.mnemonic,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

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

    const client = createPublicClient({
      transport: http(wallet.rpcUrl),
      chain: wallet.chain,
    });

    const receipt: GetTransactionReceiptReturnType =
      await client.waitForTransactionReceipt({ hash: deployment.hash });
    expect(receipt.status).toBe('success');

    const contract = getContract({
      abi,
      address: deployment.address,
      client,
    });

    const response = await contract.read.sayHello();
    expect(response).toBe('Hello There!');
  });

  it('can send transaction with private key', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: testEnv.biconomy.privateKey,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    const receiver = '0x13a11CeC9970d58E1170e98d28D2812a23890341';
    const beforeBalance = await createPublicClient({
      transport: http(wallet.rpcUrl),
    }).getBalance({
      address: receiver,
    });

    const value = parseUnits('0.00001', 18);
    const statusUpdatesMock = jest.fn();
    const hash = await wallet.sendTransaction(
      {
        to: receiver,
        value,
      },
      {
        onStatusChange: statusUpdatesMock,
      }
    );
    console.log('sent transaction with hash', hash);
    expect(value).toBeGreaterThan(0n);
    expect(statusUpdatesMock).toHaveBeenCalledTimes(3);

    const client = createPublicClient({
      transport: http(wallet.rpcUrl),
      chain: wallet.chain,
    });

    const receipt: GetTransactionReceiptReturnType =
      await client.waitForTransactionReceipt({ hash });
    expect(receipt.status).toBe('success');

    const afterBalance = await client.getBalance({
      address: receiver,
    });
    expect(afterBalance).toBe(beforeBalance + value);
  });

  it('can disable paymaster', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: generatePrivateKey(),
        },
      },
      { chainId: testEnv.biconomy.chainId, paymaster: { disabled: true } }
    );

    const receiver = '0x13a11CeC9970d58E1170e98d28D2812a23890341';
    try {
      await wallet.sendTransaction({
        to: receiver,
        value: 0n,
      });

      expect(true).toBe(false);
    } catch (e) {
      expect(e instanceof KriptonioError).toBe(true);
      expect((e as KriptonioError).message).toBe(`AA21 didn't pay prefund`);
    }
  });

  it('can send user operation', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: testEnv.biconomy.privateKey,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );
    console.log('wallet address', wallet.address);

    const receiver = '0x13a11CeC9970d58E1170e98d28D2812a23890341';
    const beforeBalance = await createPublicClient({
      transport: http(wallet.rpcUrl),
    }).getBalance({
      address: receiver,
    });

    const value = parseUnits('0.00001', 18);
    const callData = await wallet.createCallData({
      to: receiver,
      value,
    });

    const userOpHash = await wallet.sendUserOperation({
      callData,
    });
    console.log('sent user operation with hash', userOpHash);

    const mined = await wallet.waitForUserOperation(userOpHash);
    expect(mined).toBeDefined();

    console.log('sent transaction with hash', mined!.transactionHash);
    expect(value).toBeGreaterThan(0n);

    const client = createPublicClient({
      transport: http(wallet.rpcUrl),
      chain: wallet.chain,
    });

    const receipt: GetTransactionReceiptReturnType =
      await client.waitForTransactionReceipt({ hash: mined!.transactionHash });
    expect(receipt.status).toBe('success');

    const afterBalance = await client.getBalance({
      address: receiver,
    });
    expect(afterBalance).toBe(beforeBalance + value);
  });

  it('can estimate gas', async () => {
    const sdk = createSdk();
    const wallet = await sdk.wallet.from(
      {
        biconomy: {
          privateKey: testEnv.biconomy.privateKey,
        },
      },
      { chainId: testEnv.biconomy.chainId }
    );

    await wallet.deploy();

    const estimation = await wallet.estimateGas({
      to: wallet.address,
      value: 0n,
      data: '0x',
    });

    expect(estimation).toBeGreaterThan(150_000);
  });
});
