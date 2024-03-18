import {
  Account,
  Chain,
  EstimateGasParameters,
  Hex,
  SendTransactionParameters,
  TransactionSerializable,
  TypedDataDomain,
} from 'viem';
import { OperationStatus } from '../enum/OperationStatus';
import { ExportedWallet } from './WalletConfig';

export type WalletType = 'eoa' | 'kernel';

export type DeployResponse = {
  hash: Hex;
  address: Hex;
};

export type OperationOptions = {
  onStatusChange?: (status: OperationStatus) => void;
};

export type TypedData = {
  domain?: TypedDataDomain;
  types: Record<string, unknown>;
  message: Record<string, unknown>;
  primaryType: string;
};

export type DeployWallet = {
  bytecode: string;
  value?: bigint;
};

export type GasData = {
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
};

export type SignableMessage =
  | string
  | {
      raw: string | Uint8Array;
    };

export abstract class Wallet {
  constructor(public readonly chain: Chain) {}

  public abstract get rpcUrl(): string | undefined;

  public abstract get address(): Hex;

  public abstract getNonce(): Promise<bigint>;

  public abstract signTransaction(tx: TransactionSerializable): Promise<Hex>;

  public abstract signMessage(message: SignableMessage): Promise<Hex>;

  public abstract export(): ExportedWallet;

  public abstract signTypedData(typedData: TypedData): Promise<Hex>;

  public abstract getFeeData(): Promise<GasData>;

  public abstract estimateGas(
    tx: EstimateGasParameters<Chain>
  ): Promise<bigint>;

  public abstract sendTransaction(
    tx: SendTransactionParameters<Chain, Account>,
    options?: OperationOptions
  ): Promise<Hex>;

  public abstract deployContract(
    deploy: DeployWallet,
    options?: OperationOptions
  ): Promise<DeployResponse>;
}
