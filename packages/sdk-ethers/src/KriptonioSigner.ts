import { Wallet } from '@kriptonio/sdk';
import {
  AbstractSigner,
  Signer,
  TransactionRequest,
  TypedDataDomain,
  TypedDataEncoder,
  TypedDataField,
  ethers,
  makeError,
} from 'ethers';
import {
  AccessList,
  Address,
  BaseError,
  Hex,
  InsufficientFundsError,
  TimeoutError,
  TransactionSerializableEIP1559,
  TransactionSerializableLegacy,
  TypedDataDomain as ViemTypedDataDomain,
  isHex,
} from 'viem';

export class KriptonioSigner extends AbstractSigner {
  #wallet: Wallet;

  constructor(wallet: Wallet) {
    super(new ethers.JsonRpcProvider(wallet.rpcUrl));
    this.#wallet = wallet;
  }

  public override getAddress(): Promise<string> {
    return Promise.resolve(this.#wallet.address);
  }

  public override connect(): Signer {
    throw makeError(
      'attaching custom provider not supported currently',
      'NOT_IMPLEMENTED'
    );
  }

  public override async signTransaction(
    tx: TransactionRequest
  ): Promise<string> {
    try {
      return await this.#wallet.signTransaction(this.createViemTx(tx));
    } catch (e) {
      throw this.createEthersError(e);
    }
  }

  public override async signMessage(
    message: string | Uint8Array
  ): Promise<string> {
    try {
      return await this.#wallet.signMessage(
        isHex(message) ? { raw: message } : (message as string)
      );
    } catch (e) {
      throw this.createEthersError(e);
    }
  }

  public override async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>
  ): Promise<string> {
    try {
      const encoder = new TypedDataEncoder(types);
      return await this.#wallet.signTypedData({
        domain: domain as ViemTypedDataDomain,
        types,
        message: value,
        primaryType: encoder.primaryType,
      });
    } catch (e) {
      throw this.createEthersError(e);
    }
  }

  public override async sendTransaction(
    tx: TransactionRequest
  ): Promise<ethers.TransactionResponse> {
    try {
      const hash = await this.#wallet.sendTransaction(this.createViemTx(tx));

      await this.provider!.waitForTransaction(hash);
      const mined = await this.provider?.getTransaction(hash);
      if (!mined) {
        throw makeError(`cannot find transaction ${hash}`, 'UNKNOWN_ERROR');
      }

      return mined;
    } catch (e) {
      throw this.createEthersError(e);
    }
  }

  override async estimateGas(tx: TransactionRequest): Promise<bigint> {
    try {
      const walletTx = this.createViemTx(tx);
      return await this.#wallet.estimateGas(walletTx);
    } catch (e) {
      throw this.createEthersError(e);
    }
  }

  private createEthersError = (e: unknown) => {
    let parsedError: Error | null = null;

    if (e instanceof InsufficientFundsError) {
      parsedError = makeError(e.details, 'INSUFFICIENT_FUNDS');
    } else if (e instanceof TimeoutError) {
      parsedError = makeError(e.details, 'TIMEOUT');
    } else if (e instanceof BaseError) {
      parsedError = makeError(e.details, 'UNKNOWN_ERROR');
    } else if (e instanceof Error) {
      parsedError = makeError(e.message, 'UNKNOWN_ERROR');
    }

    if (parsedError) {
      parsedError.cause = e;
      return parsedError;
    }

    throw e;
  };

  private readonly createViemTx = (
    ethersTx: TransactionRequest
  ): TransactionSerializableLegacy | TransactionSerializableEIP1559 => {
    if (ethersTx.type === 1) {
      return {
        data: ethersTx.data as Hex,
        to: ethersTx.to as Address,
        chainId: ethersTx.chainId
          ? parseInt(ethersTx.chainId.toString())
          : (undefined as never),
        nonce: ethersTx.nonce ?? undefined,
        gas: ethersTx.gasLimit ? BigInt(ethersTx.gasLimit) : undefined,
        gasPrice: ethersTx.gasPrice ? BigInt(ethersTx.gasPrice) : undefined,
        value: ethersTx.value ? BigInt(ethersTx.value as bigint) : undefined,
        type: 'legacy',
      } as TransactionSerializableLegacy;
    }

    return {
      accessList: ethersTx.accessList as AccessList,
      data: ethersTx.data as Hex,
      to: ethersTx.to as Address,
      chainId: ethersTx.chainId
        ? parseInt(ethersTx.chainId.toString())
        : (undefined as never),
      nonce: ethersTx.nonce ?? undefined,
      gas: ethersTx.gasLimit ? BigInt(ethersTx.gasLimit) : undefined,
      gasLimit: ethersTx.gasLimit ? BigInt(ethersTx.gasLimit) : undefined,
      maxFeePerGas: ethersTx.maxFeePerGas
        ? BigInt(ethersTx.maxFeePerGas)
        : undefined,
      maxPriorityFeePerGas: ethersTx.maxPriorityFeePerGas
        ? BigInt(ethersTx.maxPriorityFeePerGas)
        : undefined,
      value: ethersTx.value ? BigInt(ethersTx.value as bigint) : undefined,
      type: 'eip1559',
    } as TransactionSerializableEIP1559;
  };
}
