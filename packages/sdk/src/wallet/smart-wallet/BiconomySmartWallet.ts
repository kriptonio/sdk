import {
  SmartAccountClient,
  UserOperation,
  createSmartAccountClient,
  deepHexlify,
} from 'permissionless';
import {
  SmartAccount,
  signerToBiconomySmartAccount,
} from 'permissionless/accounts';
import {
  Chain,
  Hex,
  HttpTransport,
  PublicClient,
  SignableMessage as ViemSignableMessage,
  createPublicClient,
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
  #smartAccount: SmartAccountClient<HttpTransport, Chain, SmartAccount>;
  #config: BiconomyWalletConfig;

  constructor(
    config: BiconomyWalletConfig,
    smartAccount: SmartAccountClient<HttpTransport, Chain, SmartAccount>,
    publicClient: PublicClient<HttpTransport>,
    chain: Chain
  ) {
    super(chain, publicClient);
    this.#config = config;
    this.#smartAccount = smartAccount;
  }

  public get entryPoint(): Hex {
    return this.#smartAccount.account.entryPoint;
  }

  public getVersion(): Promise<string | null> {
    return Promise.resolve('v0.2.4');
  }

  public get vendor(): string {
    return 'Biconomy';
  }

  public getAddress(): Promise<Hex> {
    return Promise.resolve(this.#smartAccount.account.address);
  }

  public getNonce(): Promise<bigint> {
    return this.#smartAccount.account.getNonce();
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
    return this.#smartAccount.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#smartAccount.signTypedData({
      message: typedData.message,
      types: typedData.types,
      domain: typedData.domain,
      primaryType: typedData.primaryType,
    });
  }

  public sendUserOperation = (
    userOperation: PartialUserOperation
  ): Promise<Hex> => {
    return this.#smartAccount.sendUserOperation({ userOperation });
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

    const callData = await this.createCallData({
      data: input.data,
      to: input.to,
      value: input.value,
    });

    return this.#smartAccount.prepareUserOperationRequest({
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
  }): Promise<Hex> {
    return this.#smartAccount.account.encodeCallData({
      to: assertHex(input.to, 'to'),
      value: input.value ?? 0n,
      data: (input.data as Hex | undefined) ?? '0x',
    });
  }

  public static async create(config: BiconomyWalletConfig) {
    // entry point v0.6
    const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

    const publicClient = createPublicClient({
      transport: http(config.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const biconomyAccount = await signerToBiconomySmartAccount(publicClient, {
      entryPoint: entryPointAddress,
      signer: sourceToAccount(config),
      index: 0n,
    });

    const smartAccountClient = createSmartAccountClient({
      account: biconomyAccount,
      chain,
      transport: http(config.rpcUrl),
      sponsorUserOperation: config.paymasterUrl
        ? async (args: {
            userOperation: UserOperation;
            entryPoint: `0x${string}`;
          }) => {
            const paymasterInfo = await sponsorUserOperation(
              config.paymasterUrl!,
              deepHexlify(args.userOperation),
              biconomyAccount.entryPoint
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

    return new BiconomySmartWallet(
      config,
      smartAccountClient,
      publicClient,
      chain
    );
  }
}
