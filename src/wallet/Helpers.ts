import { HDAccount, PrivateKeyAccount } from 'viem';
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import { assertHex } from '../utils/error';
import { PrivateKeyOrMnemonic } from './WalletConfig';

export function sourceToAccount(
  source: PrivateKeyOrMnemonic
): PrivateKeyAccount | HDAccount {
  if ('privateKey' in source) {
    return privateKeyToAccount(assertHex(source.privateKey, 'privateKey'));
  } else {
    return mnemonicToAccount(source.mnemonic);
  }
}

export function isValidSource(source: PrivateKeyOrMnemonic): boolean {
  if ('privateKey' in source) {
    return true;
  } else if ('mnemonic' in source) {
    return true;
  }

  return false;
}

export function exportSource(
  source: PrivateKeyOrMnemonic
): PrivateKeyOrMnemonic {
  if ('privateKey' in source) {
    return {
      privateKey: source.privateKey,
    };
  }

  return {
    mnemonic: source.mnemonic,
  };
}
