import {
  BiconomySmartAccountV2,
  SupportedSigner,
  createSmartAccountClient,
} from '@biconomy/account';
import { UserOperation, deepHexlify } from 'permissionless';
import {
  Chain,
  Hex,
  HttpTransport,
  PublicClient,
  TypedData as ViemTypedData,
  createPublicClient,
  createWalletClient,
  http,
} from 'viem';
import { getChain } from '../../Chain';
import { sponsorUserOperation } from '../../api/PaymasterApi';
import { assertHex } from '../../utils/error';
import { exportSource, sourceToAccount } from '../Helpers';
import { SignableMessage, TypedData } from '../Wallet';
import { BiconomyWalletConfig, ExportedBiconomyWallet } from '../WalletConfig';
import { PartialUserOperation, SmartWallet } from './SmartWallet';

export class BiconomySmartWallet extends SmartWallet {
  #smartAccount: BiconomySmartAccountV2;
  #config: BiconomyWalletConfig;

  constructor(
    config: BiconomyWalletConfig,
    smartAccount: BiconomySmartAccountV2,
    publicClient: PublicClient<HttpTransport, Chain>
  ) {
    super(publicClient.chain, publicClient);
    this.#config = config;
    this.#smartAccount = smartAccount;
  }

  public get entryPoint(): Hex {
    return this.#smartAccount.getEntryPointAddress();
  }

  public getVersion(): Promise<string | null> {
    return Promise.resolve('2.0.0');
  }

  public get vendor(): string {
    return 'Biconomy';
  }

  public getAddress(): Promise<Hex> {
    return this.#smartAccount.getAccountAddress();
  }

  public getNonce(): Promise<bigint> {
    return this.#smartAccount.getNonce();
  }

  public export(): ExportedBiconomyWallet {
    return {
      version: '1.0',
      biconomy: {
        ...exportSource(this.#config),
      },
    };
  }

  public signMessage(message: SignableMessage): Promise<Hex> {
    return this.#smartAccount.signMessage(
      typeof message === 'string' ? message : message.raw
    );
  }

  public signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#smartAccount.signTypedData({
      message: typedData.message,
      types: typedData.types as ViemTypedData,
      domain: typedData.domain,
      primaryType: typedData.primaryType,
    });
  }

  public sendUserOperation = async (op: PartialUserOperation): Promise<Hex> => {
    const response = await this.#smartAccount.sendUserOp(op);
    return response.userOpHash as Hex;
  };

  protected buildUserOperation = async (input: {
    to: Hex;
    data: Hex;
    value: bigint;
    maxFeePerGas?: bigint;
    maxPriorityFeePerGas?: bigint;
  }): Promise<UserOperation> => {
    if (!input.maxFeePerGas) {
      const feeData = await this.getFeeData();
      if (feeData) {
        input.maxFeePerGas = feeData.maxFeePerGas;
        input.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }
    }

    const userOperation = await this.#smartAccount.buildUserOp([
      {
        to: input.to,
        value: input.value,
        data: input.data,
      },
    ]);

    return userOperation as UserOperation;
  };

  public createCallData(input: {
    to: string;
    value?: bigint | undefined;
    data?: string | undefined;
  }): Promise<Hex> {
    return this.#smartAccount.encodeExecute(
      assertHex(input.to, 'to'),
      input.value ?? 0n,
      (input.data as Hex | undefined) ?? '0x'
    );
  }

  public static async create(config: BiconomyWalletConfig) {
    const signer = createWalletClient({
      account: sourceToAccount(config),
      transport: http(config.rpcUrl),
    });

    const chainId = await signer.getChainId();
    const chain = getChain(chainId);

    // entry point v0.6
    const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

    const smartAccount = await createSmartAccountClient({
      signer: signer as SupportedSigner,
      viemChain: signer.chain,
      chainId,
      bundlerUrl: config.bundlerUrl ?? config.rpcUrl,
      entryPointAddress,
      paymaster: config.paymasterUrl
        ? {
            getDummyPaymasterAndData() {
              return Promise.resolve('0x');
            },
            getPaymasterAndData: async (userOperation) => {
              const paymasterInfo = await sponsorUserOperation(
                config.paymasterUrl!,
                deepHexlify(userOperation),
                entryPointAddress
              );

              return {
                callGasLimit: Number(paymasterInfo.callGasLimit),
                verificationGasLimit: Number(
                  paymasterInfo.verificationGasLimit
                ),
                preVerificationGas: Number(paymasterInfo.preVerificationGas),
                paymasterAndData: paymasterInfo.paymasterAndData,
              };
            },
          }
        : undefined,
    });

    const publicClient = createPublicClient({
      transport: http(config.rpcUrl),
      chain,
    });

    return new BiconomySmartWallet(config, smartAccount, publicClient);
  }
}
