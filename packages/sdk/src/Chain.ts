import { defineChain } from 'viem';
import * as viemChains from 'viem/chains';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
} from 'viem/chains';
import { KriptonioError } from './Error';

export const degen = /*#__PURE__*/ defineChain({
  id: 666666666,
  name: 'Degen',
  nativeCurrency: { name: 'Degen', symbol: 'DEGEN', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.degen.tips'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://explorer.degen.tips',
    },
  },
});

const supportedChains = {
  ...viemChains,
  degen,
};

export enum ChainId {
  Ethereum = mainnet.id,
  EthereumSepolia = sepolia.id,
  Polygon = polygon.id,
  PolygonAmoy = polygonAmoy.id,
  Base = base.id,
  BaseSepolia = baseSepolia.id,
  Optimism = optimism.id,
  OptimismSepolia = optimismSepolia.id,
  Arbitrum = arbitrum.id,
  ArbitrumSepolia = arbitrumSepolia.id,
  Degen = degen.id,
}

export function getChain(chainId: number): viemChains.Chain {
  for (const chain of Object.values(supportedChains)) {
    if ('id' in chain) {
      if (chain.id === chainId) {
        return chain;
      }
    }
  }

  throw new KriptonioError({ message: `chain with id ${chainId} not found` });
}
