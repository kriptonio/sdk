import { Wallet } from '@kriptonio/sdk';
import { toAccount } from 'viem/accounts';

export function createKriptonioAccount(wallet: Wallet) {
  return toAccount({
    address: wallet.address,
    signMessage({ message }) {
      return wallet.signMessage(message);
    },
    signTransaction(transaction) {
      return wallet.signTransaction(transaction);
    },
    signTypedData(typedData) {
      return wallet.signTypedData({
        domain: typedData.domain,
        types: typedData.types!,
        message: typedData.message!,
        primaryType: typedData.primaryType,
      });
    },
  });
}
