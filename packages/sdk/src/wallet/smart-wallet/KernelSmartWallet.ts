import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import {
  KernelAccountAbi,
  KernelAccountClient,
  KernelSmartAccount,
  createKernelAccount,
  createKernelAccountClient,
} from '@zerodev/sdk';
import { CallType } from '@zerodev/sdk/types';
import { deepHexlify } from 'permissionless';
import {
  BaseError,
  Chain,
  Hex,
  HttpTransport,
  ParseAccount,
  PublicClient,
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
import {
  ExportedKernelWallet,
  KernelWalletWrapperConfig,
} from '../WalletConfig';
import { PartialUserOperation, SmartWallet } from './SmartWallet';

export type KernelClient = KernelAccountClient<
  HttpTransport,
  Chain,
  ParseAccount<KernelSmartAccount>
>;

export class KernelSmartWallet extends SmartWallet {
  #config: KernelWalletWrapperConfig;
  #client: KernelClient;
  #publicClient: PublicClient;

  constructor(
    config: KernelWalletWrapperConfig,
    client: KernelClient,
    publicClient: PublicClient<HttpTransport>
  ) {
    super(client.chain, publicClient);
    this.#client = client;
    this.#publicClient = publicClient;
    this.#config = config;
  }

  public get client(): KernelClient {
    return this.#client;
  }

  public override getAddress(): Promise<Hex> {
    return Promise.resolve(this.#client.account.address);
  }

  public override get entryPoint(): Hex {
    return this.#client.account.entryPoint;
  }

  public get vendor(): string {
    return 'ZeroDev Kernel';
  }

  public async getVersion(): Promise<string | null> {
    try {
      const contract = getContract({
        abi: KernelAccountAbi,
        address: await this.getAddress(),
        client: this.#publicClient,
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
    return this.#client.account.getNonce();
  }

  public override export(): ExportedKernelWallet {
    return {
      version: '1.0',
      kernel: {
        ...exportSource(this.#config.kernel),
      },
    };
  }

  public override signMessage(message: SignableMessage): Promise<Hex> {
    return this.#client.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public override signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#client.signTypedData({
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
      maxFeePerGas?: bigint;
      maxPriorityFeePerGas?: bigint;
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

    return this.#client.prepareUserOperationRequest({
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
    return this.#client.account.encodeCallData({
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
      return this.#client.sendUserOperation({
        userOperation: userOperation,
      });
    } catch (e) {
      throw parseError(e);
    }
  }

  public static async create(
    config: KernelWalletWrapperConfig
  ): Promise<KernelSmartWallet> {
    if (!isValidSource(config.kernel)) {
      throw new KriptonioError({
        message: 'privateKey or mnemonic must be provided',
      });
    }

    const publicClient = createPublicClient({
      transport: http(config.kernel.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const client = await this.createKernelClient(config, chain, publicClient);
    return new KernelSmartWallet(config, client, publicClient);
  }

  public static async createKernelClient(
    config: KernelWalletWrapperConfig,
    chain: Chain,
    publicClient: PublicClient
  ): Promise<KernelClient> {
    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: sourceToAccount(config.kernel),
    });

    const account = await createKernelAccount(publicClient, {
      // will use kernel 2.4 when creating the account
      // ref: https://github.com/zerodevapp/kernel
      accountLogicAddress: '0xd3082872F8B06073A021b4602e022d5A070d7cfC',
      plugins: {
        sudo: ecdsaValidator,
      },
      index: BigInt(0),
    });

    const client = createKernelAccountClient({
      account,
      chain,
      transport: http(config.kernel.rpcUrl),
      sponsorUserOperation: config.kernel.paymasterUrl
        ? async (args) => {
            const paymasterInfo = await sponsorUserOperation(
              config.kernel.paymasterUrl!,
              deepHexlify(args.userOperation),
              account.entryPoint
            );

            return {
              ...args.userOperation,
              paymasterAndData: paymasterInfo.paymasterAndData,
              callGasLimit: BigInt(paymasterInfo.callGasLimit),
              verificationGasLimit: BigInt(paymasterInfo.verificationGasLimit),
              preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
            };
          }
        : undefined,
    });

    return client as KernelClient;
  }

  public static async computeAddress(
    config: ExportedKernelWallet,
    rpcUrl: string
  ) {
    const wallet = await KernelSmartWallet.create({
      kernel: {
        ...exportSource(config.kernel),
        rpcUrl,
      },
    });

    return await wallet.getAddress();
  }
}
