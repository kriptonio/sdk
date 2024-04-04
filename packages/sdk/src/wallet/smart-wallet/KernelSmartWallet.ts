import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import {
  KernelAccountAbi,
  KernelAccountClient,
  KernelSmartAccount,
  createKernelAccount,
  createKernelAccountClient,
} from '@zerodev/sdk';
import { CallType } from '@zerodev/sdk/types';
import { ENTRYPOINT_ADDRESS_V06, deepHexlify } from 'permissionless';
import {
  ENTRYPOINT_ADDRESS_V06_TYPE,
  EntryPoint,
} from 'permissionless/types/entrypoint';
import {
  BaseError,
  Chain,
  Hex,
  HttpTransport,
  ParseAccount,
  PublicClient,
  Transport,
  SignableMessage as ViemSignableMessage,
  createPublicClient,
  getContract,
  http,
} from 'viem';
import { getChain } from '../../Chain';
import { KriptonioError } from '../../Error';
import { sponsorUserOperation } from '../../api/PaymasterApi';
import { assertHex, parseError } from '../../utils/error';
import { exportSource, isValidSource, sourceToAccount } from '../Helpers';
import { SignableMessage, TypedData } from '../Wallet';
import { ExportedKernelWallet, KernelWalletConfig } from '../WalletConfig';
import { PartialUserOperation, SmartWallet } from './SmartWallet';

export type KernelClient = KernelAccountClient<
  ENTRYPOINT_ADDRESS_V06_TYPE,
  Transport,
  Chain,
  ParseAccount<KernelSmartAccount<ENTRYPOINT_ADDRESS_V06_TYPE>>
>;

export class KernelSmartWallet extends SmartWallet {
  #config: KernelWalletConfig;
  #kernelClient: KernelClient;

  constructor(
    config: KernelWalletConfig,
    client: KernelClient,
    publicClient: PublicClient<HttpTransport>
  ) {
    super(client.chain, publicClient);
    this.#kernelClient = client;
    this.#config = config;
  }

  public get client(): KernelClient {
    return this.#kernelClient;
  }

  public override getAddress(): Promise<Hex> {
    return Promise.resolve(this.#kernelClient.account.address);
  }

  public override get entryPoint(): EntryPoint {
    return this.#kernelClient.account.entryPoint;
  }

  public get vendor(): string {
    return 'ZeroDev Kernel';
  }

  public async getVersion(): Promise<string | null> {
    try {
      const contract = getContract({
        abi: KernelAccountAbi,
        address: await this.getAddress(),
        client: this.publicClient,
      });

      return await contract.read.version();
    } catch (e) {
      if (e instanceof BaseError) {
        return null;
      }

      throw new KriptonioError({
        message: 'error while getting smart wallet version',
      });
    }
  }

  public override getNonce(): Promise<bigint> {
    return this.#kernelClient.account.getNonce();
  }

  public override export(): ExportedKernelWallet {
    return {
      version: '1.0',
      kernel: {
        ...exportSource(this.#config),
      },
    };
  }

  public override signMessage(message: SignableMessage): Promise<Hex> {
    return this.#kernelClient.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public override signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#kernelClient.signTypedData({
      message: typedData.message,
      primaryType: typedData.primaryType,
      types: typedData.types,
      domain: typedData.domain,
    });
  }

  protected override buildUserOperation = async (
    input: {
      to: Hex;
      data: Hex;
      value: bigint;
      maxFeePerGas: bigint | undefined;
      maxPriorityFeePerGas: bigint | undefined;
    },
    callType: CallType
  ) => {
    const callData = await this.createCallData({
      callType,
      data: input.data,
      to: input.to,
      value: input.value,
    });

    if (!input.maxFeePerGas) {
      const feeData = await this.getFeeData();
      if (feeData) {
        input.maxFeePerGas = feeData.maxFeePerGas;
        input.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }
    }

    return this.#kernelClient.prepareUserOperationRequest({
      userOperation: {
        callData,
        maxFeePerGas: input.maxFeePerGas,
        maxPriorityFeePerGas: input.maxPriorityFeePerGas,
      },
    });
  };

  public createCallData(input: {
    to: string;
    value?: bigint | undefined;
    data?: string | undefined;
    callType?: CallType;
  }): Promise<Hex> {
    return this.#kernelClient.account.encodeCallData({
      to: assertHex(input.to, 'to'),
      value: input.value ?? 0n,
      data: (input.data as Hex | undefined) ?? '0x',
      callType: input.callType,
    });
  }

  public override sendUserOperation(
    userOperation: PartialUserOperation
  ): Promise<Hex> {
    try {
      return this.#kernelClient.sendUserOperation({
        userOperation: userOperation,
      });
    } catch (e) {
      throw parseError(e);
    }
  }

  public static async create(
    config: KernelWalletConfig
  ): Promise<KernelSmartWallet> {
    if (!isValidSource(config)) {
      throw new KriptonioError({
        message: 'privateKey or mnemonic must be provided',
      });
    }

    const publicClient = createPublicClient({
      transport: http(config.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const client = await this._createKernelClient(config, chain, publicClient);
    return new KernelSmartWallet(config, client, publicClient);
  }

  public static async _createKernelClient(
    config: KernelWalletConfig,
    chain: Chain,
    publicClient: PublicClient
  ): Promise<KernelClient> {
    const entryPoint = ENTRYPOINT_ADDRESS_V06;

    const sudoPlugin = await signerToEcdsaValidator(publicClient, {
      signer: sourceToAccount(config),
      entryPoint,
    });

    const account = await createKernelAccount<ENTRYPOINT_ADDRESS_V06_TYPE>(
      publicClient,
      {
        entryPoint,
        plugins: {
          sudo: sudoPlugin,
          entryPoint,
        },
        // will use kernel 2.4 when creating the account
        // ref: https://github.com/zerodevapp/kernel
        accountLogicAddress: '0xd3082872F8B06073A021b4602e022d5A070d7cfC',
        index: BigInt(0),
      }
    );

    const client = createKernelAccountClient({
      account,
      entryPoint,
      chain,
      bundlerTransport: http(config.bundlerUrl ?? config.rpcUrl),
      middleware: {
        sponsorUserOperation: config.paymasterUrl
          ? async (args) => {
              const paymasterInfo = await sponsorUserOperation(
                config.paymasterUrl!,
                deepHexlify(args.userOperation),
                account.entryPoint
              );

              return {
                ...args.userOperation,
                paymasterAndData: paymasterInfo.paymasterAndData,
                callGasLimit: BigInt(paymasterInfo.callGasLimit),
                verificationGasLimit: BigInt(
                  paymasterInfo.verificationGasLimit
                ),
                preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
              };
            }
          : undefined,
      },
    });

    return client as KernelClient;
  }

  public static async computeAddress(
    config: ExportedKernelWallet,
    rpcUrl: string
  ) {
    const wallet = await KernelSmartWallet.create({
      ...exportSource(config.kernel),
      rpcUrl,
    });

    return await wallet.getAddress();
  }
}
