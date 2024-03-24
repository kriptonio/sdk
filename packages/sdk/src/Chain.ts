import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
} from 'viem/chains';

export enum ChainId {
  Ethereum = mainnet.id,
  EthereumSepolia = sepolia.id,
  Polygon = polygon.id,
  PolygonMumbai = polygonMumbai.id,
  Base = base.id,
  BaseSepolia = baseSepolia.id,
  Optimism = optimism.id,
  OptimismSepolia = optimismSepolia.id,
  Arbitrum = arbitrum.id,
  ArbitrumSepolia = arbitrumSepolia.id,
}
