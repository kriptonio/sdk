import { ChainId, KriptonioSdk } from '@kriptonio/sdk';

const accessToken = process.env.ACCESS_TOKEN as string;

// Initialize the SDK
const sdk = new KriptonioSdk({ accessToken });

// Generate a wallet
const wallet = await sdk.wallet.generate({
  chainId: ChainId.BaseSepolia,
});

// Log the wallet address
console.log('generated wallet with address', wallet.address);

// Send sponsored transaction
const hash = await wallet.sendTransaction({
  to: wallet.address,
  value: 0n,
});
console.log('sent transaction with hash', hash);
