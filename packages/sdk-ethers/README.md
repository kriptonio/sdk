# Kriptonio SDK Ethers Integration

Kriptonio SDK integration with popular [ethers](https://docs.ethers.org) web3 library.

Supports browser, server and react-native.

## Installation

```bash
yarn add ethers@6 @kriptonio/sdk @kriptonio/sdk-ethers
```

## Usage

```js
import { ChainId, KriptonioSdk } from '@kriptonio/sdk';
import { createKriptonioSigner } from '@kriptonio/sdk-ethers';

const sdk = new KriptonioSdk({
  accessToken: 'your-access-token',
});

const wallet = await sdk.wallet.generate({
  chainId: ChainId.BaseSepolia,
});

const signer = createKriptonioSigner(wallet);
const hash = await signer.sendTransaction({
  to: await signer.getAddress(),
  value: 0,
});
```

## Docs

https://docs.kriptonio.com/sdk/integrations/ethers
