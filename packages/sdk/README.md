# Kriptonio SDK

Javascript SDK for interacting with the Kriptonio Platform.

Supports browser, server and react-native.

## Installation

```bash
npm install @kriptonio/sdk
```

## Usage

```js
import { ChainId, KriptonioSdk } from '@kriptonio/sdk';
 
const sdk = new KriptonioSdk({
  accessToken: 'your-access-token',
});
 
const wallet = await sdk.wallet.generate({
  chainId: ChainId.PolygonMumbai,
});
 
const hash = await wallet.sendTransaction({
  to: wallet.address,
  value: 0n,
});
```

## Docs

[https://docs.kriptonio.com](https://docs.kriptonio.com/sdk/introduction/installation)

## API Reference

[https://github.com/kriptonio/sdk/docs](https://github.com/kriptonio/sdk/tree/main/docs)