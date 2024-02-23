import {
  Chain,
  EstimateGasParameters,
  Hex,
  PrivateKeyAccount,
  SendTransactionParameters,
  TransactionSerializable,
  SignableMessage as ViemSignableMessage,
  createPublicClient,
  createWalletClient,
  getContractAddress,
  http,
} from 'viem';
import { estimateGas, getTransactionCount } from 'viem/actions';
import { KriptonioError } from '../Error';
import { OperationStatus } from '../enum/OperationStatus';
import { getChain } from '../utils/chain';
import { assertHex } from '../utils/error';
import { exportSource, isValidSource, sourceToAccount } from './Helpers';
import {
  DeployResponse,
  DeployWallet,
  OperationOptions,
  SignableMessage,
  TypedData,
  Wallet,
} from './Wallet';
import { EoaWalletWrapperConfig, ExportedEoaWallet } from './WalletConfig';

export type EoaClient = Awaited<ReturnType<typeof EoaWallet.createEoaClient>>;

export class EoaWallet extends Wallet {
  #client: EoaClient;
  #config: EoaWalletWrapperConfig;

  constructor(config: EoaWalletWrapperConfig, client: EoaClient) {
    super(client.chain);
    this.#client = client;
    this.#config = config;
  }

  public get client(): EoaClient {
    return this.#client;
  }

  public override get rpcUrl(): string | undefined {
    return this.#config.eoa.rpcUrl;
  }

  public override get address(): Hex {
    return this.#client.account.address;
  }

  public override async getNonce(): Promise<bigint> {
    const nonce = await getTransactionCount(this.#client, {
      address: this.address,
    });

    return BigInt(nonce);
  }

  public override signTransaction(tx: TransactionSerializable): Promise<Hex> {
    return this.#client.account.signTransaction(tx);
  }

  public override signMessage(message: SignableMessage): Promise<Hex> {
    return this.#client.account.signMessage({
      message: message as ViemSignableMessage,
    });
  }

  public override estimateGas(
    tx: EstimateGasParameters<Chain>
  ): Promise<bigint> {
    return estimateGas(this.#client, tx);
  }

  public override async deployContract(
    deploy: DeployWallet,
    options?: OperationOptions
  ): Promise<DeployResponse> {
    options?.onStatusChange?.(OperationStatus.PreparingTransaction);
    const prepared = await this.#client.prepareTransactionRequest({
      to: null,
      data: assertHex(deploy.bytecode, 'bytecode'),
      value: deploy.value ?? BigInt(0),
    });

    options?.onStatusChange?.(OperationStatus.SendingTransaction);
    const hash = await this.sendTransaction(prepared);

    options?.onStatusChange?.(OperationStatus.GettingContractAddress);
    const address = getContractAddress({
      from: this.address,
      nonce: BigInt(prepared.nonce),
    });

    return {
      hash,
      address,
    };
  }

  public override signTypedData(typedData: TypedData): Promise<Hex> {
    return this.#client.account.signTypedData({
      domain: typedData.domain,
      types: typedData.types,
      message: typedData.message,
      primaryType: typedData.primaryType,
    });
  }

  public override async sendTransaction(
    tx: SendTransactionParameters<Chain, PrivateKeyAccount>,
    options?: OperationOptions
  ): Promise<Hex> {
    options?.onStatusChange?.(OperationStatus.PreparingTransaction);
    const prepared = await this.#client.prepareTransactionRequest(tx);

    options?.onStatusChange?.(OperationStatus.SendingTransaction);
    return this.#client.sendTransaction(prepared);
  }

  public override export(): ExportedEoaWallet {
    return {
      version: '1.0',
      eoa: exportSource(this.#config.eoa),
    };
  }

  public static async create(
    config: EoaWalletWrapperConfig
  ): Promise<EoaWallet> {
    if (!isValidSource(config.eoa)) {
      throw new KriptonioError({
        message: 'privateKey or mnemonic must be provided',
      });
    }

    const publicClient = createPublicClient({
      transport: http(config.eoa.rpcUrl),
    });

    const chainId = await publicClient.getChainId();
    const chain = getChain(chainId);

    const client = this.createEoaClient(config, chain);
    return new EoaWallet(config, client);
  }

  public static createEoaClient(config: EoaWalletWrapperConfig, chain: Chain) {
    return createWalletClient({
      chain,
      account: sourceToAccount(config.eoa),
      transport: http(config.eoa.rpcUrl),
    });
  }

  public static async computeAddress(
    config: ExportedEoaWallet,
    rpcUrl: string
  ) {
    const wallet = await EoaWallet.create({
      eoa: {
        ...exportSource(config.eoa),
        rpcUrl,
      },
    });

    return wallet.address;
  }
}
