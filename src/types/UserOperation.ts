import { Hex } from 'viem';

export type UserOperation = {
  sender: string
  nonce: string;
  initCode: string;
  callData: string;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: string;
  signature: string;
}

export type SponsoredUserOperation = {
  paymasterAndData: Hex;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
}