# Kriptonio SDK Viem Integration

Kriptonio SDK integration with popular [Viem](https://viem.sh) web3 library.

Supports browser, server and react-native.

## Installation

```bash
npm install viem @kriptonio/sdk @kriptonio/sdk-viem
```

## Usage

```js
import { ChainId, KriptonioSdk } from '@kriptonio/sdk';
import { createKriptonioClient } from '@kriptonio/sdk-viem';

const sdk = new KriptonioSdk({
  accessToken: 'your-access-token',
});

const wallet = await sdk.wallet.generate({
  chainId: ChainId.PolygonMumbai,
});

const client = createKriptonioClient(wallet);
const hash = await client.sendTransaction({
  to: client.account.address,
  value: 0n,
});
```

## Docs

https://docs.kriptonio.com/sdk/integrations/viem