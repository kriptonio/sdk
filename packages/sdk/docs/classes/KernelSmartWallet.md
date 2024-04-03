[@kriptonio/sdk](../README.md) / KernelSmartWallet

# Class: KernelSmartWallet

## Hierarchy

- `SmartWallet`

  ↳ **`KernelSmartWallet`**

## Table of contents

### Constructors

- [constructor](KernelSmartWallet.md#constructor)

### Properties

- [#client](KernelSmartWallet.md##client)
- [#config](KernelSmartWallet.md##config)
- [#publicClient](KernelSmartWallet.md##publicclient)
- [chain](KernelSmartWallet.md#chain)

### Accessors

- [address](KernelSmartWallet.md#address)
- [client](KernelSmartWallet.md#client)
- [entryPoint](KernelSmartWallet.md#entrypoint)
- [rpcUrl](KernelSmartWallet.md#rpcurl)
- [vendor](KernelSmartWallet.md#vendor)

### Methods

- [buildCallUserOperation](KernelSmartWallet.md#buildcalluseroperation)
- [buildDeployData](KernelSmartWallet.md#builddeploydata)
- [buildDeployUserOperation](KernelSmartWallet.md#builddeployuseroperation)
- [buildUserOperation](KernelSmartWallet.md#builduseroperation)
- [createCallData](KernelSmartWallet.md#createcalldata)
- [deploy](KernelSmartWallet.md#deploy)
- [deployContract](KernelSmartWallet.md#deploycontract)
- [estimateGas](KernelSmartWallet.md#estimategas)
- [estimateUserOperationGas](KernelSmartWallet.md#estimateuseroperationgas)
- [export](KernelSmartWallet.md#export)
- [getContractAddress](KernelSmartWallet.md#getcontractaddress)
- [getFeeData](KernelSmartWallet.md#getfeedata)
- [getNonce](KernelSmartWallet.md#getnonce)
- [getVersion](KernelSmartWallet.md#getversion)
- [isDeployed](KernelSmartWallet.md#isdeployed)
- [prepareUserOperation](KernelSmartWallet.md#prepareuseroperation)
- [sendTransaction](KernelSmartWallet.md#sendtransaction)
- [sendUserOperation](KernelSmartWallet.md#senduseroperation)
- [signMessage](KernelSmartWallet.md#signmessage)
- [signTransaction](KernelSmartWallet.md#signtransaction)
- [signTypedData](KernelSmartWallet.md#signtypeddata)
- [waitForUserOperation](KernelSmartWallet.md#waitforuseroperation)
- [computeAddress](KernelSmartWallet.md#computeaddress)
- [create](KernelSmartWallet.md#create)
- [createKernelClient](KernelSmartWallet.md#createkernelclient)

## Constructors

### constructor

• **new KernelSmartWallet**(`config`, `client`, `publicClient`): [`KernelSmartWallet`](KernelSmartWallet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) | - |
| `client` | `Object` | - |
| `client.account` | `KernelSmartAccount` | The Account of the Client. |
| `client.batch?` | `Object` | Flags for batch settings. |
| `client.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `client.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `client.ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `client.chain` | `Chain` | Chain for the client. |
| `client.deployContract` | \<TAbi, TChainOverride\>(`args`: \{ [K in string \| number \| symbol]: DeployContractParameters\<TAbi, Chain, KernelSmartAccount, TChainOverride\>[K] }) => `Promise`\<\`0x$\{string}\`\> | Deploys a contract to the network, given bytecode and constructor arguments. This function also allows you to sponsor this transaction if sender is a smartAccount - Docs: https://viem.sh/docs/contract/deployContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/deploying-contracts **`Example`** ```ts import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.deployContract({ abi: [], account: '0x…, bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', }) ``` |
| `client.extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\> & \{ `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{(...)}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\>  }\> | - |
| `client.key` | `string` | A key for the client. |
| `client.name` | `string` | A name for the client. |
| `client.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `client.prepareUserOperationRequest` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> | - |
| `client.request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> | Request function wrapped with friendly error handling |
| `client.sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. This function also allows you to sponsor this transaction if sender is a smartAccount - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction({ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n, }) ``` |
| `client.sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> | Creates, signs, and sends a new transaction to the network. This function also allows you to sponsor this transaction if sender is a smartAccount - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction) - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendTransaction([{ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n }, { to: '0x61897970c51812dc3a010c7d01b50e0d17dc1234', value: 10000000000000000n }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const hash = await client.sendTransaction([{ to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: 1000000000000000000n }, { to: '0x61897970c51812dc3a010c7d01b50e0d17dc1234', value: 10000000000000000n }]) ``` |
| `client.sendUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `client.signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signMessage.html - JSON-RPC Methods: - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data.html#personal-sign) - Local Accounts: Signs locally. No JSON-RPC request. With the calculated signature, you can: - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage.html) to verify the signature, - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress.html) to recover the signing address from a signature. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signMessage({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', message: 'hello world', }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signMessage({ message: 'hello world', }) ``` |
| `client.signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`. - Docs: https://viem.sh/docs/actions/wallet/signTypedData.html - JSON-RPC Methods: - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data.html#signtypeddata-v4) - Local Accounts: Signs locally. No JSON-RPC request. **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const signature = await client.signTypedData({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: http(), }) const signature = await client.signTypedData({ domain: { name: 'Ether Mail', version: '1', chainId: 1, verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', }, types: { Person: [ { name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }, ], Mail: [ { name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }, ], }, primaryType: 'Mail', message: { from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', }, to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', }, contents: 'Hello, Bob!', }, }) ``` |
| `client.signUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\> | Signs a user operation with the given transport, chain, and smart account. |
| `client.transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `client.type` | `string` | The type of client. |
| `client.uid` | `string` | A unique ID for the client. |
| `client.writeContract` | \<TAbi, TFunctionName, TArgs, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | Executes a write function on a contract. This function also allows you to sponsor this transaction if sender is a smartAccount - Docs: https://viem.sh/docs/contract/writeContract.html - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/contracts/writing-to-contracts A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms.html) is needed to be broadcast in order to change the state. Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet.html) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract.html#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.writeContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], }) ``` **`Example`** ```ts // With Validation import { createWalletClient, custom, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const { request } = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), functionName: 'mint', args: [69420], } const hash = await client.writeContract(request) ``` |
| `publicClient` | `Object` | - |
| `publicClient.account` | `undefined` | The Account of the Client. |
| `publicClient.batch?` | `Object` | Flags for batch settings. |
| `publicClient.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `publicClient.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `publicClient.call` | (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> | Executes a new message call immediately without submitting a transaction to the network. - Docs: https://viem.sh/docs/actions/public/call - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.call({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }) ``` |
| `publicClient.ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `publicClient.chain` | `undefined` \| `Chain` | Chain for the client. |
| `publicClient.createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createBlockFilter - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter) **`Example`** ```ts import { createPublicClient, createBlockFilter, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await createBlockFilter(client) // { id: "0x345a6572337856574a76364e457a4366", type: 'block' } ``` |
| `publicClient.createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs). - Docs: https://viem.sh/docs/contract/createContractEventFilter **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), }) ``` |
| `publicClient.createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | Creates a [`Filter`](https://viem.sh/docs/glossary/types#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createEventFilter - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', }) ``` |
| `publicClient.createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' } ``` |
| `publicClient.estimateContractGas` | \<TChain, abi, functionName, args\>(`args`: `EstimateContractGasParameters`\<`abi`, `functionName`, `args`, `TChain`\>) => `Promise`\<`bigint`\> | Estimates the gas required to successfully execute a contract write function call. - Docs: https://viem.sh/docs/contract/estimateContractGas **`Remarks`** Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gas = await client.estimateContractGas({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), functionName: 'mint', account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `publicClient.estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | Returns an estimate for the fees per gas for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateFeesPerGas() // { maxFeePerGas: ..., maxPriorityFeePerGas: ... } ``` |
| `publicClient.estimateGas` | (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Estimates the gas necessary to complete a transaction without submitting it to the network. - Docs: https://viem.sh/docs/actions/public/estimateGas - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas) **`Example`** ```ts import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasEstimate = await client.estimateGas({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }) ``` |
| `publicClient.estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | Returns an estimate for the max priority fee per gas (in wei) for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas() // 10000000n ``` |
| `publicClient.extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> | - |
| `publicClient.getBalance` | (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> | Returns the balance of an address in wei. - Docs: https://viem.sh/docs/actions/public/getBalance - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance) **`Remarks`** You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther). ```ts const balance = await getBalance(client, { address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', blockTag: 'safe' }) const balanceAsEther = formatEther(balance) // "6.942" ``` **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const balance = await client.getBalance({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) // 10000000000000000000000n (wei) ``` |
| `publicClient.getBlobBaseFee` | () => `Promise`\<`bigint`\> | Returns the base fee per blob gas in wei. - Docs: https://viem.sh/docs/actions/public/getBlobBaseFee - JSON-RPC Methods: [`eth_blobBaseFee`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blobBaseFee) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getBlobBaseFee } from 'viem/public' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blobBaseFee = await client.getBlobBaseFee() ``` |
| `publicClient.getBlock` | \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<\{ `baseFeePerGas`: ``null`` \| `bigint` ; `blobGasUsed`: `bigint` ; `difficulty`: `bigint` ; `excessBlobGas`: `bigint` ; `extraData`: \`0x$\{string}\` ; `gasLimit`: `bigint` ; `gasUsed`: `bigint` ; `hash`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `logsBloom`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `miner`: \`0x$\{string}\` ; `mixHash`: \`0x$\{string}\` ; `nonce`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `number`: `TBlockTag` extends ``"pending"`` ? ``null`` : `bigint` ; `parentHash`: \`0x$\{string}\` ; `receiptsRoot`: \`0x$\{string}\` ; `sealFields`: \`0x$\{string}\`[] ; `sha3Uncles`: \`0x$\{string}\` ; `size`: `bigint` ; `stateRoot`: \`0x$\{string}\` ; `timestamp`: `bigint` ; `totalDifficulty`: ``null`` \| `bigint` ; `transactions`: `TIncludeTransactions` extends ``true`` ? (\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  })[] : \`0x$\{string}\`[] ; `transactionsRoot`: \`0x$\{string}\` ; `uncles`: \`0x$\{string}\`[] ; `withdrawals?`: `Withdrawal`[] ; `withdrawalsRoot?`: \`0x$\{string}\`  }\> | Returns information about a block at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlock - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getBlock() ``` |
| `publicClient.getBlockNumber` | (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> | Returns the number of the most recent block seen. - Docs: https://viem.sh/docs/actions/public/getBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blockNumber = await client.getBlockNumber() // 69420n ``` |
| `publicClient.getBlockTransactionCount` | (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of Transactions at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount - JSON-RPC Methods: - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const count = await client.getBlockTransactionCount() ``` |
| `publicClient.getBytecode` | (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> | Retrieves the bytecode at an address. - Docs: https://viem.sh/docs/contract/getBytecode - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getBytecode({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', }) ``` |
| `publicClient.getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const chainId = await client.getChainId() // 1 ``` |
| `publicClient.getContractEvents` | \<abi, eventName, strict, fromBlock, toBlock\>(`args`: `GetContractEventsParameters`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of event logs emitted by a contract. - Docs: https://viem.sh/docs/actions/public/getContractEvents - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { wagmiAbi } from './abi' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getContractEvents(client, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: wagmiAbi, eventName: 'Transfer' }) ``` |
| `publicClient.getEnsAddress` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> | Gets address for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAddress - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAddress = await client.getEnsAddress({ name: normalize('wevm.eth'), }) // '0xd2135CfB216b74109775236E36d4b433F1DF507B' ``` |
| `publicClient.getEnsAvatar` | (`args`: \{ `assetGatewayUrls?`: `AssetGatewayUrls` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> | Gets the avatar of an ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText) with `key` set to `'avatar'`. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAvatar = await client.getEnsAvatar({ name: normalize('wevm.eth'), }) // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio' ``` |
| `publicClient.getEnsName` | (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> | Gets primary name for specified address. - Docs: https://viem.sh/docs/ens/actions/getEnsName - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensName = await client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', }) // 'wevm.eth' ``` |
| `publicClient.getEnsResolver` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> | Gets resolver for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const resolverAddress = await client.getEnsResolver({ name: normalize('wevm.eth'), }) // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41' ``` |
| `publicClient.getEnsText` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `key`: `string` ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> | Gets a text record for specified ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const twitterRecord = await client.getEnsText({ name: normalize('wevm.eth'), key: 'com.twitter', }) // 'wagmi_sh' ``` |
| `publicClient.getFeeHistory` | (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> | Returns a collection of historical gas information. - Docs: https://viem.sh/docs/actions/public/getFeeHistory - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const feeHistory = await client.getFeeHistory({ blockCount: 4, rewardPercentiles: [25, 75], }) ``` |
| `publicClient.getFilterChanges` | \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called. - Docs: https://viem.sh/docs/actions/public/getFilterChanges - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) **`Remarks`** A Filter can be created from the following actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) Depending on the type of filter, the return value will be different: - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs. - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes. - If the filter was created with `createBlockFilter`, it returns a list of block hashes. **`Example`** ```ts // Blocks import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createBlockFilter() const hashes = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Contract Events import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), eventName: 'Transfer', }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Raw Events import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Transactions import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() const hashes = await client.getFilterChanges({ filter }) ``` |
| `publicClient.getFilterLogs` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs since the filter was created. - Docs: https://viem.sh/docs/actions/public/getFilterLogs - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs) **`Remarks`** `getFilterLogs` is only compatible with **event filters**. **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterLogs({ filter }) ``` |
| `publicClient.getGasPrice` | () => `Promise`\<`bigint`\> | Returns the current price of gas (in wei). - Docs: https://viem.sh/docs/actions/public/getGasPrice - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasPrice = await client.getGasPrice() ``` |
| `publicClient.getLogs` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs matching the provided parameters. - Docs: https://viem.sh/docs/actions/public/getLogs - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/filters-and-logs/event-logs - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getLogs() ``` |
| `publicClient.getProof` | (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> | Returns the account and storage values of the specified account including the Merkle-proof. - Docs: https://viem.sh/docs/actions/public/getProof - JSON-RPC Methods: - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getProof({ address: '0x...', storageKeys: ['0x...'], }) ``` |
| `publicClient.getStorageAt` | (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> | Returns the value from a storage slot at a given address. - Docs: https://viem.sh/docs/contract/getStorageAt - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getStorageAt } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getStorageAt({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', slot: toHex(0), }) ``` |
| `publicClient.getTransaction` | \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  }\> | Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier. - Docs: https://viem.sh/docs/actions/public/getTransaction - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transaction = await client.getTransaction({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Returns the number of blocks passed (confirmations) since the transaction was processed on a block. - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const confirmations = await client.getTransactionConfirmations({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of [Transactions](https://viem.sh/docs/glossary/terms#transaction) an Account has broadcast / sent. - Docs: https://viem.sh/docs/actions/public/getTransactionCount - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionCount = await client.getTransactionCount({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.getTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.key` | `string` | A key for the client. |
| `publicClient.multicall` | \<contracts, allowFailure\>(`args`: `MulticallParameters`\<`contracts`, `allowFailure`\>) => `Promise`\<`MulticallReturnType`\<`contracts`, `allowFailure`\>\> | Similar to [`readContract`](https://viem.sh/docs/contract/readContract), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall). - Docs: https://viem.sh/docs/contract/multicall **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const abi = parseAbi([ 'function balanceOf(address) view returns (uint256)', 'function totalSupply() view returns (uint256)', ]) const result = await client.multicall({ contracts: [ { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'totalSupply', }, ], }) // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }] ``` |
| `publicClient.name` | `string` | A name for the client. |
| `publicClient.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `publicClient.prepareTransactionRequest` | \<TRequest, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`, `TAccountOverride`, `TRequest`\>) => `Promise`\<\{ [K in string \| number \| symbol]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & Object, ParameterTypeToParameters\<TRequest["parameters"] extends PrepareTransactionRequestParameterType[] ? any[any][number] : PrepareTransactionRequestParameterType\>\> & (unknown extends TRequest["kzg"] ? Object : Pick\<TRequest, "kzg"\>))[K] }\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `publicClient.readContract` | \<abi, functionName, args\>(`args`: `ReadContractParameters`\<`abi`, `functionName`, `args`\>) => `Promise`\<`ReadContractReturnType`\<`abi`, `functionName`, `args`\>\> | Calls a read-only function on a contract, and returns the response. - Docs: https://viem.sh/docs/contract/readContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/reading-contracts **`Remarks`** A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' import { readContract } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.readContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function balanceOf(address) view returns (uint256)']), functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }) // 424122n ``` |
| `publicClient.request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `publicClient.sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `publicClient.simulateContract` | \<abi, functionName, args, chainOverride, accountOverride\>(`args`: `SimulateContractParameters`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `chainOverride`, `accountOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `undefined` \| `Account`, `chainOverride`, `accountOverride`\>\> | Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions. - Docs: https://viem.sh/docs/contract/simulateContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts **`Remarks`** This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract), but also supports contract write functions. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32) view returns (uint32)']), functionName: 'mint', args: ['69420'], account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `publicClient.type` | `string` | The type of client. |
| `publicClient.uid` | `string` | A unique ID for the client. |
| `publicClient.uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | Destroys a Filter that was created from one of the following Actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) - Docs: https://viem.sh/docs/actions/public/uninstallFilter - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { createPendingTransactionFilter, uninstallFilter } from 'viem/public' const filter = await client.createPendingTransactionFilter() const uninstalled = await client.uninstallFilter({ filter }) // true ``` |
| `publicClient.verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> | Waits for the [Transaction](https://viem.sh/docs/glossary/terms#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt). If the Transaction reverts, then the action will throw an error. - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed. - If a Transaction has been replaced: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions - Checks if one of the Transactions is a replacement - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt). **`Remarks`** The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions). Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce. There are 3 types of Transaction Replacement reasons: - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`) - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`) - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.waitForTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | Watches and returns incoming block numbers. - Docs: https://viem.sh/docs/actions/public/watchBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlockNumber({ onBlockNumber: (blockNumber) => console.log(blockNumber), }) ``` |
| `publicClient.watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | Watches and returns information for incoming blocks. - Docs: https://viem.sh/docs/actions/public/watchBlocks - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlocks({ onBlock: (block) => console.log(block), }) ``` |
| `publicClient.watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`, `Transport`\>) => `WatchContractEventReturnType` | Watches and returns emitted contract event logs. - Docs: https://viem.sh/docs/contract/watchContractEvent **`Remarks`** This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs). `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchContractEvent({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']), eventName: 'Transfer', args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `Transport`\>) => `WatchEventReturnType` | Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms#event-log). - Docs: https://viem.sh/docs/actions/public/watchEvent - JSON-RPC Methods: - **RPC Provider supports `eth_newFilter`:** - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize). - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges). - **RPC Provider does not support `eth_newFilter`:** - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval. **`Remarks`** This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchEvent({ onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType` | Watches and returns pending transaction hashes. - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions - JSON-RPC Methods: - When `poll: true` - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter. - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event. **`Remarks`** This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions#ontransactions). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchPendingTransactions({ onTransactions: (hashes) => console.log(hashes), }) ``` |

#### Returns

[`KernelSmartWallet`](KernelSmartWallet.md)

#### Overrides

SmartWallet.constructor

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:86](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L86)

## Properties

### #client

• `Private` **#client**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `KernelSmartAccount` | The Account of the Client. |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `chain` | `Chain` | Chain for the client. |
| `deployContract` | \<TAbi, TChainOverride\>(`args`: \{ [K in string \| number \| symbol]: DeployContractParameters\<TAbi, Chain, KernelSmartAccount, TChainOverride\>[K] }) => `Promise`\<\`0x$\{string}\`\> | - |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\> & \{ `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{(...)}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\>  }\> | - |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareUserOperationRequest` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> | - |
| `request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> | Request function wrapped with friendly error handling |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `sendUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `signUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\> | - |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `writeContract` | \<TAbi, TFunctionName, TArgs, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | - |

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:83](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L83)

___

### #config

• `Private` **#config**: [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig)

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:82](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L82)

___

### #publicClient

• `Private` **#publicClient**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `undefined` | The Account of the Client. |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `call` | (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> | - |
| `ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `chain` | `undefined` \| `Chain` | Chain for the client. |
| `createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | - |
| `createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | - |
| `createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | - |
| `createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | - |
| `estimateContractGas` | \<TChain, abi, functionName, args\>(`args`: `EstimateContractGasParameters`\<`abi`, `functionName`, `args`, `TChain`\>) => `Promise`\<`bigint`\> | - |
| `estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | - |
| `estimateGas` | (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | - |
| `estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | - |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> | - |
| `getBalance` | (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> | - |
| `getBlobBaseFee` | () => `Promise`\<`bigint`\> | - |
| `getBlock` | \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<\{ `baseFeePerGas`: ``null`` \| `bigint` ; `blobGasUsed`: `bigint` ; `difficulty`: `bigint` ; `excessBlobGas`: `bigint` ; `extraData`: \`0x$\{string}\` ; `gasLimit`: `bigint` ; `gasUsed`: `bigint` ; `hash`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `logsBloom`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `miner`: \`0x$\{string}\` ; `mixHash`: \`0x$\{string}\` ; `nonce`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `number`: `TBlockTag` extends ``"pending"`` ? ``null`` : `bigint` ; `parentHash`: \`0x$\{string}\` ; `receiptsRoot`: \`0x$\{string}\` ; `sealFields`: \`0x$\{string}\`[] ; `sha3Uncles`: \`0x$\{string}\` ; `size`: `bigint` ; `stateRoot`: \`0x$\{string}\` ; `timestamp`: `bigint` ; `totalDifficulty`: ``null`` \| `bigint` ; `transactions`: `TIncludeTransactions` extends ``true`` ? (\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  })[] : \`0x$\{string}\`[] ; `transactionsRoot`: \`0x$\{string}\` ; `uncles`: \`0x$\{string}\`[] ; `withdrawals?`: `Withdrawal`[] ; `withdrawalsRoot?`: \`0x$\{string}\`  }\> | - |
| `getBlockNumber` | (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> | - |
| `getBlockTransactionCount` | (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> | - |
| `getBytecode` | (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> | - |
| `getChainId` | () => `Promise`\<`number`\> | - |
| `getContractEvents` | \<abi, eventName, strict, fromBlock, toBlock\>(`args`: `GetContractEventsParameters`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | - |
| `getEnsAddress` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> | - |
| `getEnsAvatar` | (`args`: \{ `assetGatewayUrls?`: `AssetGatewayUrls` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> | - |
| `getEnsName` | (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> | - |
| `getEnsResolver` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `getEnsText` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `key`: `string` ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> | - |
| `getFeeHistory` | (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> | - |
| `getFilterChanges` | \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | - |
| `getFilterLogs` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | - |
| `getGasPrice` | () => `Promise`\<`bigint`\> | - |
| `getLogs` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | - |
| `getProof` | (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> | - |
| `getStorageAt` | (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> | - |
| `getTransaction` | \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  }\> | - |
| `getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | - |
| `getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | - |
| `getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | - |
| `key` | `string` | A key for the client. |
| `multicall` | \<contracts, allowFailure\>(`args`: `MulticallParameters`\<`contracts`, `allowFailure`\>) => `Promise`\<`MulticallReturnType`\<`contracts`, `allowFailure`\>\> | - |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TRequest, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`, `TAccountOverride`, `TRequest`\>) => `Promise`\<\{ [K in string \| number \| symbol]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & Object, ParameterTypeToParameters\<TRequest["parameters"] extends PrepareTransactionRequestParameterType[] ? any[any][number] : PrepareTransactionRequestParameterType\>\> & (unknown extends TRequest["kzg"] ? Object : Pick\<TRequest, "kzg"\>))[K] }\> | - |
| `readContract` | \<abi, functionName, args\>(`args`: `ReadContractParameters`\<`abi`, `functionName`, `args`\>) => `Promise`\<`ReadContractReturnType`\<`abi`, `functionName`, `args`\>\> | - |
| `request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | - |
| `simulateContract` | \<abi, functionName, args, chainOverride, accountOverride\>(`args`: `SimulateContractParameters`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `chainOverride`, `accountOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `undefined` \| `Account`, `chainOverride`, `accountOverride`\>\> | - |
| `transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | - |
| `verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> | - |
| `watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | - |
| `watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | - |
| `watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`, `Transport`\>) => `WatchContractEventReturnType` | - |
| `watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `Transport`\>) => `WatchEventReturnType` | - |
| `watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType` | - |

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:84](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L84)

___

### chain

• `Readonly` **chain**: `Chain`

#### Inherited from

SmartWallet.chain

#### Defined in

[src/wallet/Wallet.ts:48](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/Wallet.ts#L48)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Overrides

SmartWallet.address

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:105](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L105)

___

### client

• `get` **client**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `KernelSmartAccount` | The Account of the Client. |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `chain` | `Chain` | Chain for the client. |
| `deployContract` | \<TAbi, TChainOverride\>(`args`: \{ [K in string \| number \| symbol]: DeployContractParameters\<TAbi, Chain, KernelSmartAccount, TChainOverride\>[K] }) => `Promise`\<\`0x$\{string}\`\> | - |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\> & \{ `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{(...)}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\>  }\> | - |
| `key` | `string` | A key for the client. |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareUserOperationRequest` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> | - |
| `request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> | Request function wrapped with friendly error handling |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `sendUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<\`0x$\{string}\`\> | - |
| `signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> | - |
| `signUserOperation` | \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\> | - |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `writeContract` | \<TAbi, TFunctionName, TArgs, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> | - |

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:97](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L97)

___

### entryPoint

• `get` **entryPoint**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Overrides

SmartWallet.entryPoint

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:109](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L109)

___

### rpcUrl

• `get` **rpcUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Overrides

SmartWallet.rpcUrl

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:101](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L101)

___

### vendor

• `get` **vendor**(): `string`

#### Returns

`string`

#### Overrides

SmartWallet.vendor

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:113](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L113)

## Methods

### buildCallUserOperation

▸ **buildCallUserOperation**(`input`): `Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Object` |
| `input.data` | \`0x$\{string}\` |
| `input.to` | \`0x$\{string}\` |
| `input.value` | `bigint` |

#### Returns

`Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:443](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L443)

___

### buildDeployData

▸ **buildDeployData**(`value`, `data`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `bigint` |
| `data` | \`0x$\{string}\` |

#### Returns

\`0x$\{string}\`

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:487](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L487)

___

### buildDeployUserOperation

▸ **buildDeployUserOperation**(`input`): `Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Object` |
| `input.data` | \`0x$\{string}\` |
| `input.value` | `bigint` |

#### Returns

`Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:458](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L458)

___

### buildUserOperation

▸ **buildUserOperation**(`input`, `callType`): `Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Object` |
| `input.data` | \`0x$\{string}\` |
| `input.to` | \`0x$\{string}\` |
| `input.value` | `bigint` |
| `callType` | `CallType` |

#### Returns

`Promise`\<\{ `callData`: \`0x$\{string}\`  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:469](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L469)

___

### createCallData

▸ **createCallData**(`input`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Object` |
| `input.callType?` | `CallType` |
| `input.data?` | `string` |
| `input.to` | `string` |
| `input.value?` | `bigint` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

SmartWallet.createCallData

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:290](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L290)

___

### deploy

▸ **deploy**(`options?`): `Promise`\<``null`` \| \`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<``null`` \| \`0x$\{string}\`\>

#### Overrides

SmartWallet.deploy

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:178](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L178)

___

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

SmartWallet.deployContract

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:334](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L334)

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

SmartWallet.estimateGas

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:200](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L200)

___

### estimateUserOperationGas

▸ **estimateUserOperationGas**(`userOperation`): `Promise`\<`EstimateUserOperationGasReturnType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOperation` | `UserOperation` |

#### Returns

`Promise`\<`EstimateUserOperationGasReturnType`\>

#### Overrides

SmartWallet.estimateUserOperationGas

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:304](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L304)

___

### export

▸ **export**(): [`ExportedKernelWallet`](../README.md#exportedkernelwallet)

#### Returns

[`ExportedKernelWallet`](../README.md#exportedkernelwallet)

#### Overrides

SmartWallet.export

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:325](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L325)

___

### getContractAddress

▸ **getContractAddress**(`transactionHash`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionHash` | \`0x$\{string}\` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:495](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L495)

___

### getFeeData

▸ **getFeeData**(): `Promise`\<[`GasData`](../README.md#gasdata)\>

#### Returns

`Promise`\<[`GasData`](../README.md#gasdata)\>

#### Overrides

SmartWallet.getFeeData

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:141](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L141)

___

### getNonce

▸ **getNonce**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Overrides

SmartWallet.getNonce

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:137](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L137)

___

### getVersion

▸ **getVersion**(): `Promise`\<``null`` \| `string`\>

#### Returns

`Promise`\<``null`` \| `string`\>

#### Overrides

SmartWallet.getVersion

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:117](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L117)

___

### isDeployed

▸ **isDeployed**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

SmartWallet.isDeployed

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:196](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L196)

___

### prepareUserOperation

▸ **prepareUserOperation**(`args`): `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.userOperation` | `PartialUserOperation` |

#### Returns

`Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:377](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L377)

___

### sendTransaction

▸ **sendTransaction**(`tx`, `options?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `SendTransactionParameters`\<`Chain`, `Account`\> |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

SmartWallet.sendTransaction

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:234](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L234)

___

### sendUserOperation

▸ **sendUserOperation**(`userOperation`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userOperation` | `PartialUserOperation` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Overrides

SmartWallet.sendUserOperation

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:313](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L313)

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

SmartWallet.signMessage

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:163](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L163)

___

### signTransaction

▸ **signTransaction**(): `Promise`\<\`0x$\{string}\`\>

Sign transaction is not supported for smart wallets

#### Returns

`Promise`\<\`0x$\{string}\`\>

**`Throws`**

KriptonioError

#### Inherited from

SmartWallet.signTransaction

#### Defined in

[src/wallet/smart-wallet/SmartWallet.ts:35](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/SmartWallet.ts#L35)

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

SmartWallet.signTypedData

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:169](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L169)

___

### waitForUserOperation

▸ **waitForUserOperation**(`userOpHash`, `timeout?`): `Promise`\<``null`` \| `UserOperationInfo`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `userOpHash` | \`0x$\{string}\` | `undefined` |
| `timeout` | `number` | `60_000` |

#### Returns

`Promise`\<``null`` \| `UserOperationInfo`\>

#### Overrides

SmartWallet.waitForUserOperation

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:393](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L393)

___

### computeAddress

▸ **computeAddress**(`config`, `rpcUrl`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ExportedKernelWallet`](../README.md#exportedkernelwallet) |
| `rpcUrl` | `string` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:593](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L593)

___

### create

▸ **create**(`config`): `Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) |

#### Returns

`Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:528](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L528)

___

### createKernelClient

▸ **createKernelClient**(`config`, `chain`, `publicClient`): `Promise`\<\{ `account`: `KernelSmartAccount` ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `ccipRead?`: ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } ; `chain`: `Chain` ; `deployContract`: \<TAbi, TChainOverride\>(`args`: \{ [K in string \| number \| symbol]: DeployContractParameters\<TAbi, Chain, KernelSmartAccount, TChainOverride\>[K] }) => `Promise`\<\`0x$\{string}\`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\> & \{ `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: ... ; `userOperation`: ...  }) => `Promise`\<...\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\>  }\> ; `key`: `string` ; `name`: `string` ; `pollingInterval`: `number` ; `prepareUserOperationRequest`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> ; `request`: `EIP1193RequestFn`\<`BundlerRpcSchema`\> ; `sendTransaction`: \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> ; `sendTransactions`: (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> ; `sendUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`args`: `SignMessageParameters`\<`KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> ; `signTypedData`: \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> ; `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\> ; `transport`: `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } ; `type`: `string` ; `uid`: `string` ; `writeContract`: \<TAbi, TFunctionName, TArgs, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\>  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) | - |
| `chain` | `Chain` | - |
| `publicClient` | `Object` | - |
| `publicClient.account` | `undefined` | The Account of the Client. |
| `publicClient.batch?` | `Object` | Flags for batch settings. |
| `publicClient.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `publicClient.cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `publicClient.call` | (`parameters`: `CallParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`CallReturnType`\> | Executes a new message call immediately without submitting a transaction to the network. - Docs: https://viem.sh/docs/actions/public/call - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const data = await client.call({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', }) ``` |
| `publicClient.ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `publicClient.chain` | `undefined` \| `Chain` | Chain for the client. |
| `publicClient.createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createBlockFilter - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter) **`Example`** ```ts import { createPublicClient, createBlockFilter, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await createBlockFilter(client) // { id: "0x345a6572337856574a76364e457a4366", type: 'block' } ``` |
| `publicClient.createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs). - Docs: https://viem.sh/docs/contract/createContractEventFilter **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), }) ``` |
| `publicClient.createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | Creates a [`Filter`](https://viem.sh/docs/glossary/types#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createEventFilter - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', }) ``` |
| `publicClient.createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges). - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' } ``` |
| `publicClient.estimateContractGas` | \<TChain, abi, functionName, args\>(`args`: `EstimateContractGasParameters`\<`abi`, `functionName`, `args`, `TChain`\>) => `Promise`\<`bigint`\> | Estimates the gas required to successfully execute a contract write function call. - Docs: https://viem.sh/docs/contract/estimateContractGas **`Remarks`** Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gas = await client.estimateContractGas({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), functionName: 'mint', account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `publicClient.estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`undefined` \| `Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | Returns an estimate for the fees per gas for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateFeesPerGas() // { maxFeePerGas: ..., maxPriorityFeePerGas: ... } ``` |
| `publicClient.estimateGas` | (`args`: `EstimateGasParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Estimates the gas necessary to complete a transaction without submitting it to the network. - Docs: https://viem.sh/docs/actions/public/estimateGas - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas) **`Example`** ```ts import { createPublicClient, http, parseEther } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasEstimate = await client.estimateGas({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', value: parseEther('1'), }) ``` |
| `publicClient.estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | Returns an estimate for the max priority fee per gas (in wei) for a transaction to be included in the next block. - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const maxPriorityFeePerGas = await client.estimateMaxPriorityFeePerGas() // 10000000n ``` |
| `publicClient.extend` | \<client\>(`fn`: (`client`: `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\>) => `client`) => `Client`\<`Transport`, `undefined` \| `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`Transport`, `undefined` \| `Chain`\>\> | - |
| `publicClient.getBalance` | (`args`: `GetBalanceParameters`) => `Promise`\<`bigint`\> | Returns the balance of an address in wei. - Docs: https://viem.sh/docs/actions/public/getBalance - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance) **`Remarks`** You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther). ```ts const balance = await getBalance(client, { address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', blockTag: 'safe' }) const balanceAsEther = formatEther(balance) // "6.942" ``` **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const balance = await client.getBalance({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) // 10000000000000000000000n (wei) ``` |
| `publicClient.getBlobBaseFee` | () => `Promise`\<`bigint`\> | Returns the base fee per blob gas in wei. - Docs: https://viem.sh/docs/actions/public/getBlobBaseFee - JSON-RPC Methods: [`eth_blobBaseFee`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blobBaseFee) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getBlobBaseFee } from 'viem/public' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blobBaseFee = await client.getBlobBaseFee() ``` |
| `publicClient.getBlock` | \<TIncludeTransactions, TBlockTag\>(`args?`: `GetBlockParameters`\<`TIncludeTransactions`, `TBlockTag`\>) => `Promise`\<\{ `baseFeePerGas`: ``null`` \| `bigint` ; `blobGasUsed`: `bigint` ; `difficulty`: `bigint` ; `excessBlobGas`: `bigint` ; `extraData`: \`0x$\{string}\` ; `gasLimit`: `bigint` ; `gasUsed`: `bigint` ; `hash`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `logsBloom`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `miner`: \`0x$\{string}\` ; `mixHash`: \`0x$\{string}\` ; `nonce`: `TBlockTag` extends ``"pending"`` ? ``null`` : \`0x$\{string}\` ; `number`: `TBlockTag` extends ``"pending"`` ? ``null`` : `bigint` ; `parentHash`: \`0x$\{string}\` ; `receiptsRoot`: \`0x$\{string}\` ; `sealFields`: \`0x$\{string}\`[] ; `sha3Uncles`: \`0x$\{string}\` ; `size`: `bigint` ; `stateRoot`: \`0x$\{string}\` ; `timestamp`: `bigint` ; `totalDifficulty`: ``null`` \| `bigint` ; `transactions`: `TIncludeTransactions` extends ``true`` ? (\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  })[] : \`0x$\{string}\`[] ; `transactionsRoot`: \`0x$\{string}\` ; `uncles`: \`0x$\{string}\`[] ; `withdrawals?`: `Withdrawal`[] ; `withdrawalsRoot?`: \`0x$\{string}\`  }\> | Returns information about a block at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlock - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getBlock() ``` |
| `publicClient.getBlockNumber` | (`args?`: `GetBlockNumberParameters`) => `Promise`\<`bigint`\> | Returns the number of the most recent block seen. - Docs: https://viem.sh/docs/actions/public/getBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const blockNumber = await client.getBlockNumber() // 69420n ``` |
| `publicClient.getBlockTransactionCount` | (`args?`: `GetBlockTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of Transactions at a block number, hash, or tag. - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount - JSON-RPC Methods: - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`. - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const count = await client.getBlockTransactionCount() ``` |
| `publicClient.getBytecode` | (`args`: `GetBytecodeParameters`) => `Promise`\<`GetBytecodeReturnType`\> | Retrieves the bytecode at an address. - Docs: https://viem.sh/docs/contract/getBytecode - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getBytecode({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', }) ``` |
| `publicClient.getChainId` | () => `Promise`\<`number`\> | Returns the chain ID associated with the current network. - Docs: https://viem.sh/docs/actions/public/getChainId - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const chainId = await client.getChainId() // 1 ``` |
| `publicClient.getContractEvents` | \<abi, eventName, strict, fromBlock, toBlock\>(`args`: `GetContractEventsParameters`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>) => `Promise`\<`GetContractEventsReturnType`\<`abi`, `eventName`, `strict`, `fromBlock`, `toBlock`\>\> | Returns a list of event logs emitted by a contract. - Docs: https://viem.sh/docs/actions/public/getContractEvents - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { wagmiAbi } from './abi' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getContractEvents(client, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: wagmiAbi, eventName: 'Transfer' }) ``` |
| `publicClient.getEnsAddress` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `coinType?`: `number` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAddressReturnType`\> | Gets address for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAddress - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAddress = await client.getEnsAddress({ name: normalize('wevm.eth'), }) // '0xd2135CfB216b74109775236E36d4b433F1DF507B' ``` |
| `publicClient.getEnsAvatar` | (`args`: \{ `assetGatewayUrls?`: `AssetGatewayUrls` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsAvatarReturnType`\> | Gets the avatar of an ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText) with `key` set to `'avatar'`. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensAvatar = await client.getEnsAvatar({ name: normalize('wevm.eth'), }) // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio' ``` |
| `publicClient.getEnsName` | (`args`: \{ `address`: \`0x$\{string}\` ; `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsNameReturnType`\> | Gets primary name for specified address. - Docs: https://viem.sh/docs/ens/actions/getEnsName - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const ensName = await client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', }) // 'wevm.eth' ``` |
| `publicClient.getEnsResolver` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `name`: `string` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<\`0x$\{string}\`\> | Gets resolver for ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const resolverAddress = await client.getEnsResolver({ name: normalize('wevm.eth'), }) // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41' ``` |
| `publicClient.getEnsText` | (`args`: \{ `blockNumber?`: `bigint` ; `blockTag?`: `BlockTag` ; `gatewayUrls?`: `string`[] ; `key`: `string` ; `name`: `string` ; `strict?`: `boolean` ; `universalResolverAddress?`: \`0x$\{string}\`  }) => `Promise`\<`GetEnsTextReturnType`\> | Gets a text record for specified ENS name. - Docs: https://viem.sh/docs/ens/actions/getEnsResolver - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens **`Remarks`** Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract. Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { normalize } from 'viem/ens' const client = createPublicClient({ chain: mainnet, transport: http(), }) const twitterRecord = await client.getEnsText({ name: normalize('wevm.eth'), key: 'com.twitter', }) // 'wagmi_sh' ``` |
| `publicClient.getFeeHistory` | (`args`: `GetFeeHistoryParameters`) => `Promise`\<`GetFeeHistoryReturnType`\> | Returns a collection of historical gas information. - Docs: https://viem.sh/docs/actions/public/getFeeHistory - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const feeHistory = await client.getFeeHistory({ blockCount: 4, rewardPercentiles: [25, 75], }) ``` |
| `publicClient.getFilterChanges` | \<TFilterType, TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterChangesParameters`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterChangesReturnType`\<`TFilterType`, `TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called. - Docs: https://viem.sh/docs/actions/public/getFilterChanges - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges) **`Remarks`** A Filter can be created from the following actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) Depending on the type of filter, the return value will be different: - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs. - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes. - If the filter was created with `createBlockFilter`, it returns a list of block hashes. **`Example`** ```ts // Blocks import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createBlockFilter() const hashes = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Contract Events import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createContractEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), eventName: 'Transfer', }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Raw Events import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterChanges({ filter }) ``` **`Example`** ```ts // Transactions import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createPendingTransactionFilter() const hashes = await client.getFilterChanges({ filter }) ``` |
| `publicClient.getFilterLogs` | \<TAbi, TEventName, TStrict, TFromBlock, TToBlock\>(`args`: `GetFilterLogsParameters`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetFilterLogsReturnType`\<`TAbi`, `TEventName`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs since the filter was created. - Docs: https://viem.sh/docs/actions/public/getFilterLogs - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs) **`Remarks`** `getFilterLogs` is only compatible with **event filters**. **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const filter = await client.createEventFilter({ address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'), }) const logs = await client.getFilterLogs({ filter }) ``` |
| `publicClient.getGasPrice` | () => `Promise`\<`bigint`\> | Returns the current price of gas (in wei). - Docs: https://viem.sh/docs/actions/public/getGasPrice - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const gasPrice = await client.getGasPrice() ``` |
| `publicClient.getLogs` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock\>(`args?`: `GetLogsParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`GetLogsReturnType`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | Returns a list of event logs matching the provided parameters. - Docs: https://viem.sh/docs/actions/public/getLogs - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/filters-and-logs/event-logs - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) **`Example`** ```ts import { createPublicClient, http, parseAbiItem } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const logs = await client.getLogs() ``` |
| `publicClient.getProof` | (`args`: `GetProofParameters`) => `Promise`\<`GetProofReturnType`\> | Returns the account and storage values of the specified account including the Merkle-proof. - Docs: https://viem.sh/docs/actions/public/getProof - JSON-RPC Methods: - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const block = await client.getProof({ address: '0x...', storageKeys: ['0x...'], }) ``` |
| `publicClient.getStorageAt` | (`args`: `GetStorageAtParameters`) => `Promise`\<`GetStorageAtReturnType`\> | Returns the value from a storage slot at a given address. - Docs: https://viem.sh/docs/contract/getStorageAt - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { getStorageAt } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const code = await client.getStorageAt({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', slot: toHex(0), }) ``` |
| `publicClient.getTransaction` | \<TBlockTag\>(`args`: `GetTransactionParameters`\<`TBlockTag`\>) => `Promise`\<\{ `accessList?`: `undefined` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId?`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"legacy"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity?`: `undefined`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice`: `bigint` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas?`: `undefined` ; `maxPriorityFeePerGas?`: `undefined` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip2930"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes?`: `undefined` ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas?`: `undefined` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip1559"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  } \| \{ `accessList`: `AccessList` ; `blobVersionedHashes`: \`0x$\{string}\`[] ; `blockHash`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : \`0x$\{string}\` ; `blockNumber`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `bigint` ; `chainId`: `number` ; `from`: \`0x$\{string}\` ; `gas`: `bigint` ; `gasPrice?`: `undefined` ; `hash`: \`0x$\{string}\` ; `input`: \`0x$\{string}\` ; `maxFeePerBlobGas`: `bigint` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `number` ; `r`: \`0x$\{string}\` ; `s`: \`0x$\{string}\` ; `to`: ``null`` \| \`0x$\{string}\` ; `transactionIndex`: `TBlockTag` extends ``"pending"`` ? ``true`` : ``false`` extends ``true`` ? ``null`` : `number` ; `type`: ``"eip4844"`` ; `typeHex`: ``null`` \| \`0x$\{string}\` ; `v`: `bigint` ; `value`: `bigint` ; `yParity`: `number`  }\> | Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier. - Docs: https://viem.sh/docs/actions/public/getTransaction - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transaction = await client.getTransaction({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`bigint`\> | Returns the number of blocks passed (confirmations) since the transaction was processed on a block. - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const confirmations = await client.getTransactionConfirmations({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | Returns the number of [Transactions](https://viem.sh/docs/glossary/terms#transaction) an Account has broadcast / sent. - Docs: https://viem.sh/docs/actions/public/getTransactionCount - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionCount = await client.getTransactionCount({ address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.getTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.key` | `string` | A key for the client. |
| `publicClient.multicall` | \<contracts, allowFailure\>(`args`: `MulticallParameters`\<`contracts`, `allowFailure`\>) => `Promise`\<`MulticallReturnType`\<`contracts`, `allowFailure`\>\> | Similar to [`readContract`](https://viem.sh/docs/contract/readContract), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall). - Docs: https://viem.sh/docs/contract/multicall **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const abi = parseAbi([ 'function balanceOf(address) view returns (uint256)', 'function totalSupply() view returns (uint256)', ]) const result = await client.multicall({ contracts: [ { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }, { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi, functionName: 'totalSupply', }, ], }) // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }] ``` |
| `publicClient.name` | `string` | A name for the client. |
| `publicClient.pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `publicClient.prepareTransactionRequest` | \<TRequest, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`undefined` \| `Chain`, `undefined` \| `Account`, `TChainOverride`, `TAccountOverride`, `TRequest`\>) => `Promise`\<\{ [K in string \| number \| symbol]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & Object, ParameterTypeToParameters\<TRequest["parameters"] extends PrepareTransactionRequestParameterType[] ? any[any][number] : PrepareTransactionRequestParameterType\>\> & (unknown extends TRequest["kzg"] ? Object : Pick\<TRequest, "kzg"\>))[K] }\> | Prepares a transaction request for signing. - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` **`Example`** ```ts // Account Hoisting import { createWalletClient, http } from 'viem' import { privateKeyToAccount } from 'viem/accounts' import { mainnet } from 'viem/chains' const client = createWalletClient({ account: privateKeyToAccount('0x…'), chain: mainnet, transport: custom(window.ethereum), }) const request = await client.prepareTransactionRequest({ to: '0x0000000000000000000000000000000000000000', value: 1n, }) ``` |
| `publicClient.readContract` | \<abi, functionName, args\>(`args`: `ReadContractParameters`\<`abi`, `functionName`, `args`\>) => `Promise`\<`ReadContractReturnType`\<`abi`, `functionName`, `args`\>\> | Calls a read-only function on a contract, and returns the response. - Docs: https://viem.sh/docs/contract/readContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/reading-contracts **`Remarks`** A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' import { readContract } from 'viem/contract' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.readContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function balanceOf(address) view returns (uint256)']), functionName: 'balanceOf', args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'], }) // 424122n ``` |
| `publicClient.request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `publicClient.sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | Sends a **signed** transaction to the network - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/) **`Example`** ```ts import { createWalletClient, custom } from 'viem' import { mainnet } from 'viem/chains' import { sendRawTransaction } from 'viem/wallet' const client = createWalletClient({ chain: mainnet, transport: custom(window.ethereum), }) const hash = await client.sendRawTransaction({ serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' }) ``` |
| `publicClient.simulateContract` | \<abi, functionName, args, chainOverride, accountOverride\>(`args`: `SimulateContractParameters`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `chainOverride`, `accountOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`abi`, `functionName`, `args`, `undefined` \| `Chain`, `undefined` \| `Account`, `chainOverride`, `accountOverride`\>\> | Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions. - Docs: https://viem.sh/docs/contract/simulateContract - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/writing-to-contracts **`Remarks`** This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract), but also supports contract write functions. Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const result = await client.simulateContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32) view returns (uint32)']), functionName: 'mint', args: ['69420'], account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', }) ``` |
| `publicClient.transport` | `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\> | The RPC transport |
| `publicClient.type` | `string` | The type of client. |
| `publicClient.uid` | `string` | A unique ID for the client. |
| `publicClient.uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | Destroys a Filter that was created from one of the following Actions: - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter) - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter) - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter) - Docs: https://viem.sh/docs/actions/public/uninstallFilter - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' import { createPendingTransactionFilter, uninstallFilter } from 'viem/public' const filter = await client.createPendingTransactionFilter() const uninstalled = await client.uninstallFilter({ filter }) // true ``` |
| `publicClient.verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `publicClient.waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`undefined` \| `Chain`\>) => `Promise`\<`TransactionReceipt`\> | Waits for the [Transaction](https://viem.sh/docs/glossary/terms#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt). If the Transaction reverts, then the action will throw an error. - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/sending-transactions - JSON-RPC Methods: - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed. - If a Transaction has been replaced: - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions - Checks if one of the Transactions is a replacement - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt). **`Remarks`** The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions). Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce. There are 3 types of Transaction Replacement reasons: - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`) - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`) - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`) **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const transactionReceipt = await client.waitForTransactionReceipt({ hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', }) ``` |
| `publicClient.watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | Watches and returns incoming block numbers. - Docs: https://viem.sh/docs/actions/public/watchBlockNumber - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlockNumber({ onBlockNumber: (blockNumber) => console.log(blockNumber), }) ``` |
| `publicClient.watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`Transport`, `undefined` \| `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | Watches and returns information for incoming blocks. - Docs: https://viem.sh/docs/actions/public/watchBlocks - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/watching-blocks - JSON-RPC Methods: - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchBlocks({ onBlock: (block) => console.log(block), }) ``` |
| `publicClient.watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`, `Transport`\>) => `WatchContractEventReturnType` | Watches and returns emitted contract event logs. - Docs: https://viem.sh/docs/contract/watchContractEvent **`Remarks`** This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs). `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **`Example`** ```ts import { createPublicClient, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchContractEvent({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']), eventName: 'Transfer', args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `Transport`\>) => `WatchEventReturnType` | Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms#event-log). - Docs: https://viem.sh/docs/actions/public/watchEvent - JSON-RPC Methods: - **RPC Provider supports `eth_newFilter`:** - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize). - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges). - **RPC Provider does not support `eth_newFilter`:** - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval. **`Remarks`** This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = client.watchEvent({ onLogs: (logs) => console.log(logs), }) ``` |
| `publicClient.watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`Transport`\>) => `WatchPendingTransactionsReturnType` | Watches and returns pending transaction hashes. - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions - JSON-RPC Methods: - When `poll: true` - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter. - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval. - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event. **`Remarks`** This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions#ontransactions). **`Example`** ```ts import { createPublicClient, http } from 'viem' import { mainnet } from 'viem/chains' const client = createPublicClient({ chain: mainnet, transport: http(), }) const unwatch = await client.watchPendingTransactions({ onTransactions: (hashes) => console.log(hashes), }) ``` |

#### Returns

`Promise`\<\{ `account`: `KernelSmartAccount` ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `ccipRead?`: ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } ; `chain`: `Chain` ; `deployContract`: \<TAbi, TChainOverride\>(`args`: \{ [K in string \| number \| symbol]: DeployContractParameters\<TAbi, Chain, KernelSmartAccount, TChainOverride\>[K] }) => `Promise`\<\`0x$\{string}\`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`, `BundlerRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\> & \{ `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: ... ; `userOperation`: ...  }) => `Promise`\<...\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\>  }\> ; `key`: `string` ; `name`: `string` ; `pollingInterval`: `number` ; `prepareUserOperationRequest`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> ; `request`: `EIP1193RequestFn`\<`BundlerRpcSchema`\> ; `sendTransaction`: \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\> ; `sendTransactions`: (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> ; `sendUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`args`: `SignMessageParameters`\<`KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> ; `signTypedData`: \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\>) => `Promise`\<\`0x$\{string}\`\> ; `signUserOperation`: \<TTransport\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"paymasterAndData"``\>  }) => `Promise`\<`UserOperation`\> ; `transport`: `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } ; `type`: `string` ; `uid`: `string` ; `writeContract`: \<TAbi, TFunctionName, TArgs, TChainOverride\>(`args`: `WriteContractParameters`\<`TAbi`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`, `TChainOverride`\>) => `Promise`\<\`0x$\{string}\`\>  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:548](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L548)
