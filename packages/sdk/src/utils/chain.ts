import * as chains from 'viem/chains';
import { KriptonioError } from '../Error';

export function getChain(chainId: number) {
  for (const chain of Object.values(chains)) {
    if ('id' in chain) {
      if (chain.id === chainId) {
        return chain;
      }
    }
  }

  throw new KriptonioError({ message: `chain with id ${chainId} not found` });
}
