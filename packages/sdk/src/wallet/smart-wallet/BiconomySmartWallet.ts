import {
  SmartAccountClient,
  UserOperation,
  createSmartAccountClient,
  deepHexlify,
} from 'permissionless';
import {
  BiconomySmartAccount,
  signerToBiconomySmartAccount,
} from 'permissionless/accounts';
import { ENTRYPOINT_ADDRESS_V06_TYPE } from 'permissionless/types/entrypoint';
import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless/utils';
import {
  BaseError,
  Chain,
  Hex,
  HttpTransport,
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
import { assertHex } from '../../utils/error';
import { exportSource, sourceToAccount } from '../Helpers';
import { SignableMessage, TypedData } from '../Wallet';
import { BiconomyWalletConfig, ExportedBiconomyWallet } from '../WalletConfig';
import { PartialUserOperation, SmartWallet } from './SmartWallet';

export class BiconomySmartWallet extends SmartWallet<ENTRYPOINT_ADDRESS_V06_TYPE> {
  #biconomyAccount: SmartAccountClient<
    ENTRYPOINT_ADDRESS_V06_TYPE,
    Transport,
    Chain,
    BiconomySmartAccount<ENTRYPOINT_ADDRESS_V06_TYPE>
  >;
  #config: BiconomyWalletConfig;

  constructor(
    config: BiconomyWalletConfig,
    smartAccount: SmartAccountClient<
      ENTRYPOINT_ADDRESS_V06_TYPE,
      Transport,
      Chain,
      BiconomySmartAccount<ENTRYPOINT_ADDRESS_V06_TYPE>
    >,
    publicClient: PublicClient<HttpTransport>,
    chain: Chain
  ) {
    super(chain, publicClient);
    this.#config = config;
    this.#biconomyAccount = smartAccount;
  }

  public get entryPoint(): ENTRYPOINT_ADDRESS_V06_TYPE {
    return this.#biconomyAccount.account.entryPoint;
  }

  public getVersion = async (): Promise<string | null> => {
    try {
      const contract = getContract({
        abi: BiconomyAbi,
        address: this.address,
        client: this.publicClient,
      });

      return await contract.read.VERSION();
    } catch (e) {
      if (e instanceof BaseError) {
        return null;
      }

      throw new KriptonioError({
        message: 'error while getting smart wallet version',
      });
    }
  };

  public get vendor(): string {
    return 'Biconomy';
  }

  public override get address(): Hex {
    return this.#biconomyAccount.account.address;
  }

  public getNonce(): Promise<bigint> {
    return this.#biconomyAccount.account.getNonce();
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
    return this.#biconomyAccount.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#biconomyAccount.signTypedData({
      message: typedData.message,
      types: typedData.types,
      domain: typedData.domain,
      primaryType: typedData.primaryType,
    });
  }

  public sendUserOperation = (
    userOperation: PartialUserOperation<ENTRYPOINT_ADDRESS_V06_TYPE>
  ): Promise<Hex> => {
    return this.#biconomyAccount.sendUserOperation({ userOperation });
  };

  protected buildUserOperation = async (input: {
    to: Hex;
    data: Hex;
    value: bigint;
    maxFeePerGas: bigint | undefined;
    maxPriorityFeePerGas: bigint | undefined;
  }): Promise<UserOperation<'v0.6'>> => {
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

    return this.#biconomyAccount.prepareUserOperationRequest({
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
    return this.#biconomyAccount.account.encodeCallData({
      to: assertHex(input.to, 'to'),
      value: input.value ?? 0n,
      data: (input.data as Hex | undefined) ?? '0x',
    });
  }

  public static async create(config: BiconomyWalletConfig) {
    const entryPointAddress = ENTRYPOINT_ADDRESS_V06;

    const publicClient = createPublicClient({
      transport: http(config.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const biconomyAccount = await signerToBiconomySmartAccount(publicClient, {
      entryPoint: entryPointAddress,
      signer: sourceToAccount(config),
    });

    const smartAccountClient = createSmartAccountClient({
      account: biconomyAccount,
      entryPoint: entryPointAddress,
      chain,
      bundlerTransport: http(config.bundlerUrl ?? config.rpcUrl),
      middleware: {
        sponsorUserOperation: config.paymasterUrl
          ? async (args: {
              userOperation: UserOperation<'v0.6'>;
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
                verificationGasLimit: BigInt(
                  paymasterInfo.verificationGasLimit
                ),
                preVerificationGas: BigInt(paymasterInfo.preVerificationGas),
              };
            }
          : undefined,
      },
    });

    return new BiconomySmartWallet(
      config,
      smartAccountClient,
      publicClient,
      chain
    );
  }
}

const BiconomyAbi = [
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
] as const;
