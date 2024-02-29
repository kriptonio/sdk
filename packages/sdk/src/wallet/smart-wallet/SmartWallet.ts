/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EstimateUserOperationGasReturnType,
  UserOperation,
} from 'permissionless';
import { Hex } from 'viem';
import { PartialBy } from 'viem/chains';
import { KriptonioError } from '../../Error';
import { OperationOptions, Wallet } from '../Wallet';

export type PartialUserOperation = PartialBy<
  UserOperation,
  | 'nonce'
  | 'sender'
  | 'initCode'
  | 'signature'
  | 'callGasLimit'
  | 'maxFeePerGas'
  | 'maxPriorityFeePerGas'
  | 'preVerificationGas'
  | 'verificationGasLimit'
  | 'paymasterAndData'
>;

export type UserOperationInfo = {
  success: boolean | undefined;
  transactionHash: Hex;
};

export abstract class SmartWallet extends Wallet {
  /**
   * Sign transaction is not supported for smart wallets
   * @throws KriptonioError
   */
  public override signTransaction(): Promise<Hex> {
    throw new KriptonioError({
      message:
        'smart accounts cannot sign transactions. send user operation instead',
    });
  }

  /**
   * Gets the entry point address of the smart wallet
   */
  public abstract get entryPoint(): Hex;

  /**
   * Gets the smart wallet version
   * @returns smart wallet version if deployed, null if not deployed
   */
  public abstract getVersion(): Promise<string | null>;

  /**
   * Gets the smart wallet vendor
   */
  public abstract get vendor(): string;

  /**
   * Creates a call data for UserOperation
   */
  public abstract createCallData(input: {
    to: string;
    value?: bigint;
    data?: string;
  }): Promise<Hex>;

  /**
   * Deploys the smart wallet
   * @returns transaction hash of the deployment if deployed, null if wallet already deployed
   */
  public abstract deploy(options?: OperationOptions): Promise<Hex | null>;

  /**
   * Checks if the smart wallet is deployed
   */
  public abstract isDeployed(): Promise<boolean>;

  /**
   * Sends a user operation from the smart wallet
   * @returns user operation hash
   */
  public abstract sendUserOperation(op: PartialUserOperation): Promise<Hex>;

  /**
   * Estimates the gas for a user operation
   * @returns gas estimation
   */
  public abstract estimateUserOperationGas(
    op: PartialUserOperation
  ): Promise<EstimateUserOperationGasReturnType>;

  /**
   * Waits for a user operation to be mined
   * @returns user operation info
   */
  public abstract waitForUserOperation(
    userOpHash: Hex,
    timeout?: number
  ): Promise<UserOperationInfo | null>;
}
