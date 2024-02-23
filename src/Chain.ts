import {
  base,
  baseSepolia,
  mainnet,
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
}
