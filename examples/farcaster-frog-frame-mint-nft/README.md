An example of minting an NFT using Farcaster Frame and the Kriptonio API.

## Install

```bash
yarn install
```

## Environment variables

- `SMART_CONTRACT_ID` - The smart contract id of the NFT contract (can be found in Kriptonio smart contract detail page)
- `ACCESS_TOKEN` - The access token of the NFT contract (can be found in Kriptonio user settings page)
- `PRIVATE_KEY` - The private key of the account that will mint the NFT

## Run

```bash
SMART_CONTRACT_ID=id ACCESS_TOKEN=token PRIVATE_KEY=0x123 yarn dev
```