import { Wallet } from '@kriptonio/sdk';
import {
  Abi,
  Account,
  Chain,
  DeployContractParameters,
  HttpTransport,
  WalletClient,
  createWalletClient,
  encodeDeployData,
  encodeFunctionData,
  http,
} from 'viem';
import { createKriptonioAccount } from './createKriptonioAccount';

export function createKriptonioClient<TWallet extends Wallet>(
  wallet: TWallet
): WalletClient<HttpTransport, Chain, Account> {
  return createWalletClient({
    transport: http(wallet.rpcUrl),
    chain: wallet.chain,
    account: createKriptonioAccount(wallet),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }).extend((_) => ({
    sendTransaction: (args) => wallet.sendTransaction(args),
    deployContract: async (args: DeployContractParameters) => {
      const deploymentData = encodeDeployData({
        abi: args.abi as Abi,
        bytecode: args.bytecode,
        args: args.args as unknown[],
      });

      const deployment = await wallet.deployContract({
        bytecode: deploymentData,
        value: args.value,
      });

      return deployment.hash;
    },
    writeContract: (args) => {
      const writeData = encodeFunctionData({
        abi: args.abi as Abi,
        functionName: args.functionName as string,
        args: args.args as unknown[],
      });

      return wallet.sendTransaction({
        to: args.address,
        data: writeData,
        value: args.value,
      });
    },
  }));
}
