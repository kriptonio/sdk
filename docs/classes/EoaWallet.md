[@kriptonio/sdk](../README.md) / EoaWallet

# Class: EoaWallet

## Hierarchy

- [`Wallet`](Wallet.md)

  ↳ **`EoaWallet`**

## Table of contents

### Constructors

- [constructor](EoaWallet.md#constructor)

### Properties

- [#client](EoaWallet.md##client)
- [#config](EoaWallet.md##config)
- [chain](EoaWallet.md#chain)

### Accessors

- [address](EoaWallet.md#address)
- [client](EoaWallet.md#client)
- [rpcUrl](EoaWallet.md#rpcurl)

### Methods

- [deployContract](EoaWallet.md#deploycontract)
- [estimateGas](EoaWallet.md#estimategas)
- [export](EoaWallet.md#export)
- [getNonce](EoaWallet.md#getnonce)
- [sendTransaction](EoaWallet.md#sendtransaction)
- [signMessage](EoaWallet.md#signmessage)
- [signTransaction](EoaWallet.md#signtransaction)
- [signTypedData](EoaWallet.md#signtypeddata)
- [computeAddress](EoaWallet.md#computeaddress)
- [create](EoaWallet.md#create)
- [createEoaClient](EoaWallet.md#createeoaclient)

## Constructors

### constructor

• **new EoaWallet**(`config`, `client`): [`EoaWallet`](EoaWallet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) | - |
| `client` | `Object` | - |
| `client.account` | `PrivateKeyAccount` \| `HDAccount` | The Account of the Client. |
| `client.addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `client.batch?` | `Object` | Flags for batch settings. |
| `client.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `client.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `client.chain` | `Chain` | Chain for the client. |
| `client.deployContract` | \<abi, chainOverride\>(`args`: `DeployContractParameters`\<`abi`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `chainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `client.extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\> | - |
| `client.getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `client.getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `client.getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `client.key` | `string` | A key for the client. |
| `client.name` | `string` | A name for the client. |
| `client.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `client.prepareTransactionRequest` | \<TParameterType, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `client.request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `client.requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `client.requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `client.sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `client.sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `client.signMessage` | (`args`: `SignMessageParameters`\<`PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `client.signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `client.signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `client.switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `client.transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `client.type` | `string` | The type of client. |
| `client.uid` | `string` | A unique ID for the client. |
| `client.watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `client.writeContract` | \<abi, functionName, args, TChainOverride\>(`args`: `WriteContractParameters`\<`abi`, `functionName`, `args`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |

#### Returns

[`EoaWallet`](EoaWallet.md)

#### Overrides

[Wallet](Wallet.md).[constructor](Wallet.md#constructor)

#### Defined in

[src/wallet/EoaWallet.ts:36](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L36)

## Properties

### #client

• `Private` **#client**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `PrivateKeyAccount` \| `HDAccount` | The Account of the Client. |
| `addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `chain` | `Chain` | Chain for the client. |
| `deployContract` | \<abi, chainOverride\>(`args`: `DeployContractParameters`\<`abi`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `chainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\> | - |
| `getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TParameterType, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `signMessage` | (`args`: `SignMessageParameters`\<`PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `writeContract` | \<abi, functionName, args, TChainOverride\>(`args`: `WriteContractParameters`\<`abi`, `functionName`, `args`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |

#### Defined in

[src/wallet/EoaWallet.ts:33](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L33)

___

### #config

• `Private` **#config**: [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig)

#### Defined in

[src/wallet/EoaWallet.ts:34](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L34)

___

### chain

• `Readonly` **chain**: `Chain`

#### Inherited from

[Wallet](Wallet.md).[chain](Wallet.md#chain)

#### Defined in

[src/wallet/Wallet.ts:43](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L43)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Overrides

Wallet.address

#### Defined in

[src/wallet/EoaWallet.ts:50](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L50)

___

### client

• `get` **client**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `PrivateKeyAccount` \| `HDAccount` | The Account of the Client. |
| `addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `chain` | `Chain` | Chain for the client. |
| `deployContract` | \<abi, chainOverride\>(`args`: `DeployContractParameters`\<`abi`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `chainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\> | - |
| `getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TParameterType, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `signMessage` | (`args`: `SignMessageParameters`\<`PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `writeContract` | \<abi, functionName, args, TChainOverride\>(`args`: `WriteContractParameters`\<`abi`, `functionName`, `args`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |

#### Defined in

[src/wallet/EoaWallet.ts:42](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L42)

___

### rpcUrl

• `get` **rpcUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Overrides

Wallet.rpcUrl

#### Defined in

[src/wallet/EoaWallet.ts:46](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L46)

## Methods

### deployContract

▸ **deployContract**(`deploy`, `options?`): `Promise`\<[`DeployResponse`](../README.md#deployresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deploy` | [`DeployWallet`](../README.md#deploywallet) |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<[`DeployResponse`](../README.md#deployresponse)\>

#### Overrides

[Wallet](Wallet.md).[deployContract](Wallet.md#deploycontract)

#### Defined in

[src/wallet/EoaWallet.ts:78](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L78)

___

### estimateGas

▸ **estimateGas**(`tx`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `EstimateGasParameters`\<`Chain`\> |

#### Returns

`Promise`\<`bigint`\>

#### Overrides

[Wallet](Wallet.md).[estimateGas](Wallet.md#estimategas)

#### Defined in

[src/wallet/EoaWallet.ts:72](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L72)

___

### export

▸ **export**(): [`ExportedEoaWallet`](../README.md#exportedeoawallet)

#### Returns

[`ExportedEoaWallet`](../README.md#exportedeoawallet)

#### Overrides

[Wallet](Wallet.md).[export](Wallet.md#export)

#### Defined in

[src/wallet/EoaWallet.ts:124](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L124)

___

### getNonce

▸ **getNonce**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Overrides

[Wallet](Wallet.md).[getNonce](Wallet.md#getnonce)

#### Defined in

[src/wallet/EoaWallet.ts:54](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L54)

___

### sendTransaction

▸ **sendTransaction**(`tx`, `options?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `SendTransactionParameters`\<`Chain`, `PrivateKeyAccount`\> |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

[Wallet](Wallet.md).[sendTransaction](Wallet.md#sendtransaction)

#### Defined in

[src/wallet/EoaWallet.ts:113](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L113)

___

### signMessage

▸ **signMessage**(`message`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`SignableMessage`](../README.md#signablemessage) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

[Wallet](Wallet.md).[signMessage](Wallet.md#signmessage)

#### Defined in

[src/wallet/EoaWallet.ts:66](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L66)

___

### signTransaction

▸ **signTransaction**(`tx`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionSerializable` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

[Wallet](Wallet.md).[signTransaction](Wallet.md#signtransaction)

#### Defined in

[src/wallet/EoaWallet.ts:62](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L62)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | [`TypedData`](../README.md#typeddata) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

[Wallet](Wallet.md).[signTypedData](Wallet.md#signtypeddata)

#### Defined in

[src/wallet/EoaWallet.ts:104](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L104)

___

### computeAddress

▸ **computeAddress**(`config`, `rpcUrl`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ExportedEoaWallet`](../README.md#exportedeoawallet) |
| `rpcUrl` | `string` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/EoaWallet.ts:159](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L159)

___

### create

▸ **create**(`config`): `Promise`\<[`EoaWallet`](EoaWallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) |

#### Returns

`Promise`\<[`EoaWallet`](EoaWallet.md)\>

#### Defined in

[src/wallet/EoaWallet.ts:131](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L131)

___

### createEoaClient

▸ **createEoaClient**(`config`, `chain`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) |
| `chain` | `Chain` |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `PrivateKeyAccount` \| `HDAccount` | The Account of the Client. |
| `addChain` | (`args`: `AddChainParameters`) => `Promise`\<`void`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/addChain - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { optimism } from 'viem/chains' const client = createWalletClient({ transport: custom(window.ethereum), }) await client.addChain({ chain: optimism }) ``` |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `chain` | `Chain` | Chain for the client. |
| `deployContract` | \<abi, chainOverride\>(`args`: `DeployContractParameters`\<`abi`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `chainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. - Docs: https://viem.sh/docs/contract/deployContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `WalletRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `WalletActions`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`\>\> | - |
| `getAddresses` | () => `Promise`\<`GetAddressesReturnType`\> | Returns a list of account addresses owned by the wallet or client. - Docs: https://viem.sh/docs/actions/wallet/getAddresses - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.getAddresses() ``` |
| `getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createWalletClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const chainId = await client.getChainId() // 1 ``` |
| `getPermissions` | () => `Promise`\<`GetPermissionsReturnType`\> | Gets the wallets current permissions. - Docs: https://viem.sh/docs/actions/wallet/getPermissions - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.getPermissions() ``` |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TParameterType, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>) => `Promise`\<`PrepareTransactionRequestReturnType`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`, `TAccountOverride`, `TParameterType`\>\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `request` | `EIP1193RequestFn`\<`WalletRpcSchema`\> | Request function wrapped with friendly error handling |
| `requestAddresses` | () => `Promise`\<`RequestAddressesReturnType`\> | Requests a list of accounts managed by a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestAddresses - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102) Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses). This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const accounts = await client.requestAddresses() ``` |
| `requestPermissions` | (`args`: \{ `eth_accounts`: `Record`\<`string`, `any`\>  }) => `Promise`\<`RequestPermissionsReturnType`\> | Requests permissions for a wallet. - Docs: https://viem.sh/docs/actions/wallet/requestPermissions - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const permissions = await client.requestPermissions({ eth_accounts: {} }) ``` |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. - Docs: https://viem.sh/docs/actions/wallet/sendTransaction - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `signMessage` | (`args`: `SignMessageParameters`\<`PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `signTransaction` | \<TChainOverride\>(`args`: `SignTransactionParameters`\<`Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Signs a transaction. - Docs: https://viem.sh/docs/actions/wallet/signTransaction - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) const signature = await client.signTransaction(request) ``` |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `PrivateKeyAccount` \| `HDAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `switchChain` | (`args`: `SwitchChainParameters`) => `Promise`\<`void`\> | Switch the target chain in a wallet. - Docs: https://viem.sh/docs/actions/wallet/switchChain - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet, optimism } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) await client.switchChain({ id: optimism.id }) ``` |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `watchAsset` | (`args`: `WatchAssetParams`) => `Promise`\<`boolean`\> | Adds an EVM chain to the wallet. - Docs: https://viem.sh/docs/actions/wallet/watchAsset - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const success = await client.watchAsset({ type: 'ERC20', options: { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', decimals: 18, symbol: 'WETH', }, }) ``` |
| `writeContract` | \<abi, functionName, args, TChainOverride\>(`args`: `WriteContractParameters`\<`abi`, `functionName`, `args`, `Chain`, `PrivateKeyAccount` \| `HDAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. - Docs: https://viem.sh/docs/contract/writeContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |

#### Defined in

[src/wallet/EoaWallet.ts:151](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/EoaWallet.ts#L151)
