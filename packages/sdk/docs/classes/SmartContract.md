[@kriptonio/sdk](../README.md) / SmartContract

# Class: SmartContract

## Table of contents

### Constructors

- [constructor](SmartContract.md#constructor)

### Properties

- [#smartContractApi](SmartContract.md##smartcontractapi)
- [abi](SmartContract.md#abi)
- [bin](SmartContract.md#bin)
- [chainId](SmartContract.md#chainid)
- [createdAt](SmartContract.md#createdat)
- [deployment](SmartContract.md#deployment)
- [id](SmartContract.md#id)
- [rpcUrl](SmartContract.md#rpcurl)
- [smartContractApi](SmartContract.md#smartcontractapi)
- [title](SmartContract.md#title)
- [wallet](SmartContract.md#wallet)

### Accessors

- [publicClient](SmartContract.md#publicclient)
- [readContract](SmartContract.md#readcontract)

### Methods

- [deploy](SmartContract.md#deploy)
- [deployed](SmartContract.md#deployed)
- [estimate](SmartContract.md#estimate)
- [estimateDeploy](SmartContract.md#estimatedeploy)
- [read](SmartContract.md#read)
- [write](SmartContract.md#write)
- [fromDeployment](SmartContract.md#fromdeployment)
- [fromDto](SmartContract.md#fromdto)

## Constructors

### constructor

• **new SmartContract**(`id`, `title`, `abi`, `bin`, `chainId`, `deployment`, `createdAt`, `smartContractApi`, `rpcUrl`, `wallet?`): [`SmartContract`](SmartContract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `title` | `string` |
| `abi` | `unknown`[] |
| `bin` | `string` |
| `chainId` | `number` |
| `deployment` | `undefined` \| `DeploymentDto` |
| `createdAt` | `Date` |
| `smartContractApi` | `SmartContractApi` |
| `rpcUrl` | `string` |
| `wallet?` | [`Wallet`](Wallet.md) |

#### Returns

[`SmartContract`](SmartContract.md)

#### Defined in

[src/model/SmartContract.ts:49](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L49)

## Properties

### #smartContractApi

• `Private` **#smartContractApi**: `SmartContractApi`

#### Defined in

[src/model/SmartContract.ts:47](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L47)

___

### abi

• `Readonly` **abi**: `unknown`[]

#### Defined in

[src/model/SmartContract.ts:52](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L52)

___

### bin

• `Readonly` **bin**: `string`

#### Defined in

[src/model/SmartContract.ts:53](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L53)

___

### chainId

• `Readonly` **chainId**: `number`

#### Defined in

[src/model/SmartContract.ts:54](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L54)

___

### createdAt

• `Readonly` **createdAt**: `Date`

#### Defined in

[src/model/SmartContract.ts:56](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L56)

___

### deployment

• **deployment**: `undefined` \| `DeploymentDto`

#### Defined in

[src/model/SmartContract.ts:55](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L55)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[src/model/SmartContract.ts:50](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L50)

___

### rpcUrl

• `Private` `Readonly` **rpcUrl**: `string`

#### Defined in

[src/model/SmartContract.ts:58](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L58)

___

### smartContractApi

• `Private` `Readonly` **smartContractApi**: `SmartContractApi`

#### Defined in

[src/model/SmartContract.ts:57](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L57)

___

### title

• `Readonly` **title**: `string`

#### Defined in

[src/model/SmartContract.ts:51](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L51)

___

### wallet

• `Private` `Optional` `Readonly` **wallet**: [`Wallet`](Wallet.md)

#### Defined in

[src/model/SmartContract.ts:59](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L59)

## Accessors

### publicClient

• `get` **publicClient**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `undefined` | The Account of the Client. |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } | Flags for batch settings. |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } | Toggle to enable `eth_call` multicall aggregation. |
| `cacheTime` | `number` | Time (in ms) that cached data will remain in memory. |
| `call` | (`parameters`: `CallParameters`\<`Chain`\>) => `Promise`\<`CallReturnType`\> | - |
| `ccipRead?` | ``false`` \| \{ `request?`: (`parameters`: `CcipRequestParameters`) => `Promise`\<\`0x$\{string}\`\>  } | [CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration. |
| `chain` | `Chain` | Chain for the client. |
| `createBlockFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"block"``  }\> | - |
| `createContractEventFilter` | \<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock\>(`args`: `CreateContractEventFilterParameters`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>) => `Promise`\<`CreateContractEventFilterReturnType`\<`TAbi`, `TEventName`, `TArgs`, `TStrict`, `TFromBlock`, `TToBlock`\>\> | - |
| `createEventFilter` | \<TAbiEvent, TAbiEvents, TStrict, TFromBlock, TToBlock, _EventName, _Args\>(`args?`: `CreateEventFilterParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `TFromBlock`, `TToBlock`, `_EventName`, `_Args`\>) => `Promise`\<\{ [K in string \| number \| symbol]: Filter\<"event", TAbiEvents, \_EventName, \_Args, TStrict, TFromBlock, TToBlock\>[K] }\> | - |
| `createPendingTransactionFilter` | () => `Promise`\<\{ `id`: \`0x$\{string}\` ; `request`: `EIP1193RequestFn`\<readonly [\{ `Method`: ``"eth_getFilterChanges"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[] \| \`0x$\{string}\`[]  }, \{ `Method`: ``"eth_getFilterLogs"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `RpcLog`[]  }, \{ `Method`: ``"eth_uninstallFilter"`` ; `Parameters`: [filterId: \`0x$\{string}\`] ; `ReturnType`: `boolean`  }]\> ; `type`: ``"transaction"``  }\> | - |
| `estimateContractGas` | \<TChain, abi, functionName, args\>(`args`: `EstimateContractGasParameters`\<`abi`, `functionName`, `args`, `TChain`\>) => `Promise`\<`bigint`\> | - |
| `estimateFeesPerGas` | \<TChainOverride, TType\>(`args?`: `EstimateFeesPerGasParameters`\<`Chain`, `TChainOverride`, `TType`\>) => `Promise`\<`EstimateFeesPerGasReturnType`\> | - |
| `estimateGas` | (`args`: `EstimateGasParameters`\<`Chain`\>) => `Promise`\<`bigint`\> | - |
| `estimateMaxPriorityFeePerGas` | \<TChainOverride\>(`args?`: \{ `chain?`: ``null`` \| `TChainOverride`  }) => `Promise`\<`bigint`\> | - |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `undefined`, `PublicRpcSchema`, `PublicActions`\<`HttpTransport`, `Chain`\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `undefined`, `PublicRpcSchema`, \{ [K in string \| number \| symbol]: client[K] } & `PublicActions`\<`HttpTransport`, `Chain`\>\> | - |
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
| `getTransactionConfirmations` | (`args`: `GetTransactionConfirmationsParameters`\<`Chain`\>) => `Promise`\<`bigint`\> | - |
| `getTransactionCount` | (`args`: `GetTransactionCountParameters`) => `Promise`\<`number`\> | - |
| `getTransactionReceipt` | (`args`: `GetTransactionReceiptParameters`) => `Promise`\<`TransactionReceipt`\> | - |
| `key` | `string` | A key for the client. |
| `multicall` | \<contracts, allowFailure\>(`args`: `MulticallParameters`\<`contracts`, `allowFailure`\>) => `Promise`\<`MulticallReturnType`\<`contracts`, `allowFailure`\>\> | - |
| `name` | `string` | A name for the client. |
| `pollingInterval` | `number` | Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. |
| `prepareTransactionRequest` | \<TRequest, TChainOverride, TAccountOverride\>(`args`: `PrepareTransactionRequestParameters`\<`Chain`, `undefined` \| `Account`, `TChainOverride`, `TAccountOverride`, `TRequest`\>) => `Promise`\<\{ [K in string \| number \| symbol]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & Object, ParameterTypeToParameters\<TRequest["parameters"] extends PrepareTransactionRequestParameterType[] ? any[any][number] : PrepareTransactionRequestParameterType\>\> & (unknown extends TRequest["kzg"] ? Object : Pick\<TRequest, "kzg"\>))[K] }\> | - |
| `readContract` | \<abi, functionName, args\>(`args`: `ReadContractParameters`\<`abi`, `functionName`, `args`\>) => `Promise`\<`ReadContractReturnType`\<`abi`, `functionName`, `args`\>\> | - |
| `request` | `EIP1193RequestFn`\<`PublicRpcSchema`\> | Request function wrapped with friendly error handling |
| `sendRawTransaction` | (`args`: `SendRawTransactionParameters`) => `Promise`\<\`0x$\{string}\`\> | - |
| `simulateContract` | \<abi, functionName, args, chainOverride, accountOverride\>(`args`: `SimulateContractParameters`\<`abi`, `functionName`, `args`, `Chain`, `chainOverride`, `accountOverride`\>) => `Promise`\<`SimulateContractReturnType`\<`abi`, `functionName`, `args`, `Chain`, `undefined` \| `Account`, `chainOverride`, `accountOverride`\>\> | - |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } | The RPC transport |
| `type` | `string` | The type of client. |
| `uid` | `string` | A unique ID for the client. |
| `uninstallFilter` | (`args`: `UninstallFilterParameters`) => `Promise`\<`boolean`\> | - |
| `verifyMessage` | (`args`: `VerifyMessageParameters`) => `Promise`\<`boolean`\> | - |
| `verifyTypedData` | (`args`: `VerifyTypedDataParameters`) => `Promise`\<`boolean`\> | - |
| `waitForTransactionReceipt` | (`args`: `WaitForTransactionReceiptParameters`\<`Chain`\>) => `Promise`\<`TransactionReceipt`\> | - |
| `watchBlockNumber` | (`args`: `WatchBlockNumberParameters`) => `WatchBlockNumberReturnType` | - |
| `watchBlocks` | \<TIncludeTransactions, TBlockTag\>(`args`: `WatchBlocksParameters`\<`HttpTransport`, `Chain`, `TIncludeTransactions`, `TBlockTag`\>) => `WatchBlocksReturnType` | - |
| `watchContractEvent` | \<TAbi, TEventName, TStrict\>(`args`: `WatchContractEventParameters`\<`TAbi`, `TEventName`, `TStrict`, `HttpTransport`\>) => `WatchContractEventReturnType` | - |
| `watchEvent` | \<TAbiEvent, TAbiEvents, TStrict\>(`args`: `WatchEventParameters`\<`TAbiEvent`, `TAbiEvents`, `TStrict`, `HttpTransport`\>) => `WatchEventReturnType` | - |
| `watchPendingTransactions` | (`args`: `WatchPendingTransactionsParameters`\<`HttpTransport`\>) => `WatchPendingTransactionsReturnType` | - |

#### Defined in

[src/model/SmartContract.ts:259](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L259)

___

### readContract

• `get` **readContract**(): `Object`

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `abi` | `unknown`[] | - |
| `address` | \`0x$\{string}\` | - |
| `createEventFilter` | {} | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs). **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), client: publicClient, }) const filter = await contract.createEventFilter.Transfer() ``` |
| `estimateGas` | {} & {} | Estimates the gas necessary to complete a transaction without submitting it to the network. **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), client: publicClient, }) const gas = await contract.estimateGas.mint({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `getEvents` | {} | Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs). **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), client: publicClient, }) const filter = await contract.createEventFilter.Transfer() ``` |
| `read` | {} | Calls a read-only function on a contract, and returns the response. A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas. Internally, `read` uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi([ 'function balanceOf(address owner) view returns (uint256)', ]), client: publicClient, }) const result = await contract.read.balanceOf(['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e']) // 424122n ``` |
| `simulate` | {} | Simulates/validates a contract interaction. This is useful for retrieving return data and revert reasons of contract write functions. This function does not require gas to execute and does not change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract), but also supports contract write functions. Internally, `simulate` uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint() public']), client: publicClient, }) const result = await contract.simulate.mint({ account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', }) ``` |
| `watchEvent` | {} | Watches and returns emitted contract event logs. This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs). `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. **`Example`** ```ts import { createPublicClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const publicClient = createPublicClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']), client: publicClient, }) const filter = await contract.createEventFilter.Transfer() const unwatch = contract.watchEvent.Transfer( { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' }, { onLogs: (logs) => console.log(logs) }, ) ``` |
| `write` | {} | Executes a write function on a contract. A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state. Internally, `write` uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData). __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__ **`Example`** ```ts import { createWalletClient, getContract, http, parseAbi } from 'viem' import { mainnet } from 'viem/chains' const walletClient = createWalletClient({ chain: mainnet, transport: http(), }) const contract = getContract({ address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', abi: parseAbi(['function mint(uint32 tokenId) nonpayable']), client: walletClient, }) const hash = await contract.write.min([69420], { address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', }) ``` |

#### Defined in

[src/model/SmartContract.ts:274](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L274)

## Methods

### deploy

▸ **deploy**(`props?`): `Promise`\<[`SmartContractDeployment`](../README.md#smartcontractdeployment)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | [`DeployProps`](../README.md#deployprops) |

#### Returns

`Promise`\<[`SmartContractDeployment`](../README.md#smartcontractdeployment)\>

#### Defined in

[src/model/SmartContract.ts:165](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L165)

___

### deployed

▸ **deployed**(`timeoutMs?`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeoutMs` | `number` | `60000` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/model/SmartContract.ts:212](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L212)

___

### estimate

▸ **estimate**(`functionName`, `props?`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `props?` | [`SmartContractCallProps`](../README.md#smartcontractcallprops) |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/model/SmartContract.ts:114](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L114)

___

### estimateDeploy

▸ **estimateDeploy**(`props?`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | [`EstimateDeployProps`](../README.md#estimatedeployprops) |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/model/SmartContract.ts:144](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L144)

___

### read

▸ **read**\<`TResult`\>(`functionName`, `props?`): `Promise`\<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `props?` | [`SmartContractCallProps`](../README.md#smartcontractcallprops) |

#### Returns

`Promise`\<`TResult`\>

#### Defined in

[src/model/SmartContract.ts:101](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L101)

___

### write

▸ **write**(`functionName`, `props?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `props?` | [`SmartContractCallProps`](../README.md#smartcontractcallprops) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/model/SmartContract.ts:64](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L64)

___

### fromDeployment

▸ **fromDeployment**(`deployment`): `DeploymentDto`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployment` | `SmartContractDeploymentResponse` |

#### Returns

`DeploymentDto`

#### Defined in

[src/model/SmartContract.ts:302](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L302)

___

### fromDto

▸ **fromDto**(`dto`, `smartContractApi`, `rpcUrl`, `wallet?`): [`SmartContract`](SmartContract.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dto` | `SmartContractDetailResponse` |
| `smartContractApi` | `SmartContractApi` |
| `rpcUrl` | `string` |
| `wallet?` | [`Wallet`](Wallet.md) |

#### Returns

[`SmartContract`](SmartContract.md)

#### Defined in

[src/model/SmartContract.ts:282](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/model/SmartContract.ts#L282)
