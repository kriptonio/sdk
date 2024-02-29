import { Wallet } from '@kriptonio/sdk';
import { KriptonioSigner } from './KriptonioSigner';

export function createKriptonioSigner(wallet: Wallet) {
  return new KriptonioSigner(wallet);
}
