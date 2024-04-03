import {
  BiconomySmartAccountV2,
  SupportedSigner,
  createSmartAccountClient,
} from '@biconomy/account';
import { UserOperation } from 'permissionless';
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
import { KriptonioError } from '../../Error';
import { OperationStatus } from '../../enum/OperationStatus';
import { assertHex, parseError } from '../../utils/error';
import { exportSource, sourceToAccount } from '../Helpers';
import {
  DeployResponse,
  DeployWallet,
  OperationOptions,
  SignableMessage,
  TypedData,
} from '../Wallet';
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

  public get rpcUrl(): string | undefined {
    throw new Error('Method not implemented.');
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

  public createCallData(input: {
    to: string;
    value?: bigint | undefined;
    data?: string | undefined;
  }): Promise<Hex> {
    return this.#smartAccount.encodeExecute(
      input.to as Hex,
      input.value ?? 0n,
      (input.data ?? '0x') as Hex
    );
  }

  public sendUserOperation = async (op: PartialUserOperation): Promise<Hex> => {
    const response = await this.#smartAccount.sendUserOp(op);
    return response.userOpHash as Hex;
  };

  public deployContract = async (
    deploy: DeployWallet,
    options?: OperationOptions
  ): Promise<DeployResponse> => {
    try {
      options?.onStatusChange?.(OperationStatus.PreparingUserOperation);
      const userOperation = await this.prepareUserOperation({
        userOperation: await this.buildDeployUserOperation({
          data: assertHex(deploy.bytecode, 'bytecode'),
          value: deploy.value ?? BigInt(0),
        }),
      });

      options?.onStatusChange?.(OperationStatus.SendingUserOperation);
      const userOpHash = await this.sendUserOperation(userOperation);

      options?.onStatusChange?.(OperationStatus.WaitingForUserOperation);
      const userOpInfo = await this.waitForUserOperation(userOpHash);

      if (!userOpInfo) {
        throw new KriptonioError({
          message: `user operation receipt ${userOpHash} not found`,
        });
      }

      if (!userOpInfo.success) {
        throw new KriptonioError({
          message: `user operation ${userOpHash} failed`,
        });
      }

      options?.onStatusChange?.(OperationStatus.GettingContractAddress);
      const address = await this.getContractAddress(userOpInfo.transactionHash);

      return {
        hash: userOpInfo.transactionHash,
        address,
      };
    } catch (e) {
      throw parseError(e);
    }
  };

  protected prepareUserOperation = async (args: {
    userOperation: PartialUserOperation;
  }) => {
    if (!args.userOperation.maxFeePerGas) {
      const feeData = await this.getFeeData();
      if (feeData) {
        args.userOperation.maxFeePerGas = feeData.maxFeePerGas;
        args.userOperation.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }
    }

    return args.userOperation as UserOperation;
  };

  public static async create(config: BiconomyWalletConfig) {
    const signer = createWalletClient({
      account: sourceToAccount(config),
      transport: http(config.rpcUrl),
    });

    const smartAccount = await createSmartAccountClient({
      signer: signer as SupportedSigner,
      bundlerUrl: config.bundlerUrl ?? config.rpcUrl,
    });

    const chainId = await signer.getChainId();
    const chain = getChain(chainId);

    const publicClient = createPublicClient({
      transport: http(config.rpcUrl),
      chain,
    });

    return new BiconomySmartWallet(config, smartAccount, publicClient);
  }
}
