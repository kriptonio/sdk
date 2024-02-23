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
- [chain](KernelSmartWallet.md#chain)

### Accessors

- [address](KernelSmartWallet.md#address)
- [client](KernelSmartWallet.md#client)
- [entryPoint](KernelSmartWallet.md#entrypoint)
- [rpcUrl](KernelSmartWallet.md#rpcurl)

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
- [getNonce](KernelSmartWallet.md#getnonce)
- [isDeployed](KernelSmartWallet.md#isdeployed)
- [sendTransaction](KernelSmartWallet.md#sendtransaction)
- [sendUserOperation](KernelSmartWallet.md#senduseroperation)
- [signMessage](KernelSmartWallet.md#signmessage)
- [signTransaction](KernelSmartWallet.md#signtransaction)
- [signTypedData](KernelSmartWallet.md#signtypeddata)
- [waitForUserOperation](KernelSmartWallet.md#waitforuseroperation)
- [computeAddress](KernelSmartWallet.md#computeaddress)
- [create](KernelSmartWallet.md#create)
- [createKernelClient](KernelSmartWallet.md#createkernelclient)
- [getAccountLogicAddress](KernelSmartWallet.md#getaccountlogicaddress)

## Constructors

### constructor

• **new KernelSmartWallet**(`config`, `client`): [`KernelSmartWallet`](KernelSmartWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) |
| `client` | `Object` |
| `client.account` | `KernelSmartAccount`\<`HttpTransport`, `Chain`\> |
| `client.batch?` | `Object` |
| `client.batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } |
| `client.cacheTime` | `number` |
| `client.chain` | `Chain` |
| `client.deployContract` | \<TAbi, TChainOverride_1\>(`args`: `DeployContractParameters`\<`TAbi`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_1`, `ContractConstructorArgs`\<`TAbi`\>\> extends `T` ? \{ [K in string \| number \| symbol]: (T & UnionOmit\<SendTransactionParameters\<Chain, KernelSmartAccount\<HttpTransport, Chain\>, TChainOverride\_1\>, "data" \| "to" \| "accessList" \| "chain"\> & Object & UnionEvaluate\<readonly [] extends ContractConstructorArgs\<TAbi\> ? Object : Object\> & Object)[K] } : `never`) => `Promise`\<\`0x$\{string}\`\> |
| `client.extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, \{ [K\_7 in string \| number \| symbol]: client[K\_7] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\> & \{ `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\>  }\> |
| `client.key` | `string` |
| `client.name` | `string` |
| `client.pollingInterval` | `number` |
| `client.prepareUserOperationRequest` | \<TTransport_1\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> |
| `client.request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> |
| `client.sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride`, `DeriveChain`\<`Chain`, `TChainOverride`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `client.sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> |
| `client.sendUserOperation` | \<TTransport_2\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<\`0x$\{string}\`\> |
| `client.signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `client.signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TTypedData` extends \{ `address`: `undefined` ; `bool`: `undefined` ; `bytes`: `undefined` ; `bytes1`: `undefined` ; `bytes10`: `undefined` ; `bytes11`: `undefined` ; `bytes12`: `undefined` ; `bytes13`: `undefined` ; `bytes14`: `undefined` ; `bytes15`: `undefined` ; `bytes16`: `undefined` ; `bytes17`: `undefined` ; `bytes18`: `undefined` ; `bytes19`: `undefined` ; `bytes2`: `undefined` ; `bytes20`: `undefined` ; `bytes21`: `undefined` ; `bytes22`: `undefined` ; `bytes23`: `undefined` ; `bytes24`: `undefined` ; `bytes25`: `undefined` ; `bytes26`: `undefined` ; `bytes27`: `undefined` ; `bytes28`: `undefined` ; `bytes29`: `undefined` ; `bytes3`: `undefined` ; `bytes30`: `undefined` ; `bytes31`: `undefined` ; `bytes32`: `undefined` ; `bytes4`: `undefined` ; `bytes5`: `undefined` ; `bytes6`: `undefined` ; `bytes7`: `undefined` ; `bytes8`: `undefined` ; `bytes9`: `undefined` ; `int104`: `undefined` ; `int112`: `undefined` ; `int120`: `undefined` ; `int128`: `undefined` ; `int136`: `undefined` ; `int144`: `undefined` ; `int152`: `undefined` ; `int16`: `undefined` ; `int160`: `undefined` ; `int168`: `undefined` ; `int176`: `undefined` ; `int184`: `undefined` ; `int192`: `undefined` ; `int200`: `undefined` ; `int208`: `undefined` ; `int216`: `undefined` ; `int224`: `undefined` ; `int232`: `undefined` ; `int24`: `undefined` ; `int240`: `undefined` ; `int248`: `undefined` ; `int256`: `undefined` ; `int32`: `undefined` ; `int40`: `undefined` ; `int48`: `undefined` ; `int56`: `undefined` ; `int64`: `undefined` ; `int72`: `undefined` ; `int8`: `undefined` ; `int80`: `undefined` ; `int88`: `undefined` ; `int96`: `undefined` ; `string`: `undefined` ; `uint104`: `undefined` ; `uint112`: `undefined` ; `uint120`: `undefined` ; `uint128`: `undefined` ; `uint136`: `undefined` ; `uint144`: `undefined` ; `uint152`: `undefined` ; `uint16`: `undefined` ; `uint160`: `undefined` ; `uint168`: `undefined` ; `uint176`: `undefined` ; `uint184`: `undefined` ; `uint192`: `undefined` ; `uint200`: `undefined` ; `uint208`: `undefined` ; `uint216`: `undefined` ; `uint224`: `undefined` ; `uint232`: `undefined` ; `uint24`: `undefined` ; `uint240`: `undefined` ; `uint248`: `undefined` ; `uint256`: `undefined` ; `uint32`: `undefined` ; `uint40`: `undefined` ; `uint48`: `undefined` ; `uint56`: `undefined` ; `uint64`: `undefined` ; `uint72`: `undefined` ; `uint8`: `undefined` ; `uint80`: `undefined` ; `uint88`: `undefined` ; `uint96`: `undefined`  } ? keyof `TTypedData` : `string`\>) => `Promise`\<\`0x$\{string}\`\> |
| `client.signUserOperation` | \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\> |
| `client.transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } |
| `client.type` | `string` |
| `client.uid` | `string` |
| `client.writeContract` | \<TAbi_1, TFunctionName, TArgs, TChainOverride_2\>(`args`: `WriteContractParameters`\<`TAbi_1`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_2`, `ContractFunctionName`\<`TAbi_1`, ``"nonpayable"`` \| ``"payable"``\>, `DeriveChain`\<`Chain`, `TChainOverride_2`\>\>) => `Promise`\<\`0x$\{string}\`\> |

#### Returns

[`KernelSmartWallet`](KernelSmartWallet.md)

#### Overrides

SmartWallet.constructor

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:72](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L72)

## Properties

### #client

• `Private` **#client**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `KernelSmartAccount`\<`HttpTransport`, `Chain`\> |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } |
| `cacheTime` | `number` |
| `chain` | `Chain` |
| `deployContract` | \<TAbi, TChainOverride_1\>(`args`: `DeployContractParameters`\<`TAbi`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_1`, `ContractConstructorArgs`\<`TAbi`\>\> extends `T` ? \{ [K in string \| number \| symbol]: (T & UnionOmit\<SendTransactionParameters\<Chain, KernelSmartAccount\<HttpTransport, Chain\>, TChainOverride\_1\>, "data" \| "to" \| "accessList" \| "chain"\> & Object & UnionEvaluate\<readonly [] extends ContractConstructorArgs\<TAbi\> ? Object : Object\> & Object)[K] } : `never`) => `Promise`\<\`0x$\{string}\`\> |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, \{ [K\_7 in string \| number \| symbol]: client[K\_7] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\> & \{ `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\>  }\> |
| `key` | `string` |
| `name` | `string` |
| `pollingInterval` | `number` |
| `prepareUserOperationRequest` | \<TTransport_1\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> |
| `request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride`, `DeriveChain`\<`Chain`, `TChainOverride`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> |
| `sendUserOperation` | \<TTransport_2\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<\`0x$\{string}\`\> |
| `signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TTypedData` extends \{ `address`: `undefined` ; `bool`: `undefined` ; `bytes`: `undefined` ; `bytes1`: `undefined` ; `bytes10`: `undefined` ; `bytes11`: `undefined` ; `bytes12`: `undefined` ; `bytes13`: `undefined` ; `bytes14`: `undefined` ; `bytes15`: `undefined` ; `bytes16`: `undefined` ; `bytes17`: `undefined` ; `bytes18`: `undefined` ; `bytes19`: `undefined` ; `bytes2`: `undefined` ; `bytes20`: `undefined` ; `bytes21`: `undefined` ; `bytes22`: `undefined` ; `bytes23`: `undefined` ; `bytes24`: `undefined` ; `bytes25`: `undefined` ; `bytes26`: `undefined` ; `bytes27`: `undefined` ; `bytes28`: `undefined` ; `bytes29`: `undefined` ; `bytes3`: `undefined` ; `bytes30`: `undefined` ; `bytes31`: `undefined` ; `bytes32`: `undefined` ; `bytes4`: `undefined` ; `bytes5`: `undefined` ; `bytes6`: `undefined` ; `bytes7`: `undefined` ; `bytes8`: `undefined` ; `bytes9`: `undefined` ; `int104`: `undefined` ; `int112`: `undefined` ; `int120`: `undefined` ; `int128`: `undefined` ; `int136`: `undefined` ; `int144`: `undefined` ; `int152`: `undefined` ; `int16`: `undefined` ; `int160`: `undefined` ; `int168`: `undefined` ; `int176`: `undefined` ; `int184`: `undefined` ; `int192`: `undefined` ; `int200`: `undefined` ; `int208`: `undefined` ; `int216`: `undefined` ; `int224`: `undefined` ; `int232`: `undefined` ; `int24`: `undefined` ; `int240`: `undefined` ; `int248`: `undefined` ; `int256`: `undefined` ; `int32`: `undefined` ; `int40`: `undefined` ; `int48`: `undefined` ; `int56`: `undefined` ; `int64`: `undefined` ; `int72`: `undefined` ; `int8`: `undefined` ; `int80`: `undefined` ; `int88`: `undefined` ; `int96`: `undefined` ; `string`: `undefined` ; `uint104`: `undefined` ; `uint112`: `undefined` ; `uint120`: `undefined` ; `uint128`: `undefined` ; `uint136`: `undefined` ; `uint144`: `undefined` ; `uint152`: `undefined` ; `uint16`: `undefined` ; `uint160`: `undefined` ; `uint168`: `undefined` ; `uint176`: `undefined` ; `uint184`: `undefined` ; `uint192`: `undefined` ; `uint200`: `undefined` ; `uint208`: `undefined` ; `uint216`: `undefined` ; `uint224`: `undefined` ; `uint232`: `undefined` ; `uint24`: `undefined` ; `uint240`: `undefined` ; `uint248`: `undefined` ; `uint256`: `undefined` ; `uint32`: `undefined` ; `uint40`: `undefined` ; `uint48`: `undefined` ; `uint56`: `undefined` ; `uint64`: `undefined` ; `uint72`: `undefined` ; `uint8`: `undefined` ; `uint80`: `undefined` ; `uint88`: `undefined` ; `uint96`: `undefined`  } ? keyof `TTypedData` : `string`\>) => `Promise`\<\`0x$\{string}\`\> |
| `signUserOperation` | \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\> |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } |
| `type` | `string` |
| `uid` | `string` |
| `writeContract` | \<TAbi_1, TFunctionName, TArgs, TChainOverride_2\>(`args`: `WriteContractParameters`\<`TAbi_1`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_2`, `ContractFunctionName`\<`TAbi_1`, ``"nonpayable"`` \| ``"payable"``\>, `DeriveChain`\<`Chain`, `TChainOverride_2`\>\>) => `Promise`\<\`0x$\{string}\`\> |

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:70](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L70)

___

### #config

• `Private` **#config**: [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig)

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:69](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L69)

___

### chain

• `Readonly` **chain**: `Chain`

#### Inherited from

SmartWallet.chain

#### Defined in

[src/wallet/Wallet.ts:43](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/Wallet.ts#L43)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Overrides

SmartWallet.address

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:86](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L86)

___

### client

• `get` **client**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `account` | `KernelSmartAccount`\<`HttpTransport`, `Chain`\> |
| `batch?` | \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } |
| `batch.multicall?` | `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  } |
| `cacheTime` | `number` |
| `chain` | `Chain` |
| `deployContract` | \<TAbi, TChainOverride_1\>(`args`: `DeployContractParameters`\<`TAbi`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_1`, `ContractConstructorArgs`\<`TAbi`\>\> extends `T` ? \{ [K in string \| number \| symbol]: (T & UnionOmit\<SendTransactionParameters\<Chain, KernelSmartAccount\<HttpTransport, Chain\>, TChainOverride\_1\>, "data" \| "to" \| "accessList" \| "chain"\> & Object & UnionEvaluate\<readonly [] extends ContractConstructorArgs\<TAbi\> ? Object : Object\> & Object)[K] } : `never`) => `Promise`\<\`0x$\{string}\`\> |
| `extend` | \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, \{ [K\_7 in string \| number \| symbol]: client[K\_7] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\> & \{ `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\>  }\> |
| `key` | `string` |
| `name` | `string` |
| `pollingInterval` | `number` |
| `prepareUserOperationRequest` | \<TTransport_1\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> |
| `request` | `EIP1193RequestFn`\<`BundlerRpcSchema`\> |
| `sendTransaction` | \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride`, `DeriveChain`\<`Chain`, `TChainOverride`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `sendTransactions` | (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> |
| `sendUserOperation` | \<TTransport_2\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<\`0x$\{string}\`\> |
| `signMessage` | (`args`: `SignMessageParameters`\<`KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>) => `Promise`\<\`0x$\{string}\`\> |
| `signTypedData` | \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TTypedData` extends \{ `address`: `undefined` ; `bool`: `undefined` ; `bytes`: `undefined` ; `bytes1`: `undefined` ; `bytes10`: `undefined` ; `bytes11`: `undefined` ; `bytes12`: `undefined` ; `bytes13`: `undefined` ; `bytes14`: `undefined` ; `bytes15`: `undefined` ; `bytes16`: `undefined` ; `bytes17`: `undefined` ; `bytes18`: `undefined` ; `bytes19`: `undefined` ; `bytes2`: `undefined` ; `bytes20`: `undefined` ; `bytes21`: `undefined` ; `bytes22`: `undefined` ; `bytes23`: `undefined` ; `bytes24`: `undefined` ; `bytes25`: `undefined` ; `bytes26`: `undefined` ; `bytes27`: `undefined` ; `bytes28`: `undefined` ; `bytes29`: `undefined` ; `bytes3`: `undefined` ; `bytes30`: `undefined` ; `bytes31`: `undefined` ; `bytes32`: `undefined` ; `bytes4`: `undefined` ; `bytes5`: `undefined` ; `bytes6`: `undefined` ; `bytes7`: `undefined` ; `bytes8`: `undefined` ; `bytes9`: `undefined` ; `int104`: `undefined` ; `int112`: `undefined` ; `int120`: `undefined` ; `int128`: `undefined` ; `int136`: `undefined` ; `int144`: `undefined` ; `int152`: `undefined` ; `int16`: `undefined` ; `int160`: `undefined` ; `int168`: `undefined` ; `int176`: `undefined` ; `int184`: `undefined` ; `int192`: `undefined` ; `int200`: `undefined` ; `int208`: `undefined` ; `int216`: `undefined` ; `int224`: `undefined` ; `int232`: `undefined` ; `int24`: `undefined` ; `int240`: `undefined` ; `int248`: `undefined` ; `int256`: `undefined` ; `int32`: `undefined` ; `int40`: `undefined` ; `int48`: `undefined` ; `int56`: `undefined` ; `int64`: `undefined` ; `int72`: `undefined` ; `int8`: `undefined` ; `int80`: `undefined` ; `int88`: `undefined` ; `int96`: `undefined` ; `string`: `undefined` ; `uint104`: `undefined` ; `uint112`: `undefined` ; `uint120`: `undefined` ; `uint128`: `undefined` ; `uint136`: `undefined` ; `uint144`: `undefined` ; `uint152`: `undefined` ; `uint16`: `undefined` ; `uint160`: `undefined` ; `uint168`: `undefined` ; `uint176`: `undefined` ; `uint184`: `undefined` ; `uint192`: `undefined` ; `uint200`: `undefined` ; `uint208`: `undefined` ; `uint216`: `undefined` ; `uint224`: `undefined` ; `uint232`: `undefined` ; `uint24`: `undefined` ; `uint240`: `undefined` ; `uint248`: `undefined` ; `uint256`: `undefined` ; `uint32`: `undefined` ; `uint40`: `undefined` ; `uint48`: `undefined` ; `uint56`: `undefined` ; `uint64`: `undefined` ; `uint72`: `undefined` ; `uint8`: `undefined` ; `uint80`: `undefined` ; `uint88`: `undefined` ; `uint96`: `undefined`  } ? keyof `TTypedData` : `string`\>) => `Promise`\<\`0x$\{string}\`\> |
| `signUserOperation` | \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\> |
| `transport` | `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } |
| `type` | `string` |
| `uid` | `string` |
| `writeContract` | \<TAbi_1, TFunctionName, TArgs, TChainOverride_2\>(`args`: `WriteContractParameters`\<`TAbi_1`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_2`, `ContractFunctionName`\<`TAbi_1`, ``"nonpayable"`` \| ``"payable"``\>, `DeriveChain`\<`Chain`, `TChainOverride_2`\>\>) => `Promise`\<\`0x$\{string}\`\> |

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:78](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L78)

___

### entryPoint

• `get` **entryPoint**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Overrides

SmartWallet.entryPoint

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:90](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L90)

___

### rpcUrl

• `get` **rpcUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Overrides

SmartWallet.rpcUrl

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:82](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L82)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:346](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L346)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:390](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L390)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:361](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L361)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:372](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L372)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:216](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L216)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:113](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L113)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:257](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L257)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:134](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L134)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:230](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L230)

___

### export

▸ **export**(): [`ExportedKernelWallet`](../README.md#exportedkernelwallet)

#### Returns

[`ExportedKernelWallet`](../README.md#exportedkernelwallet)

#### Overrides

SmartWallet.export

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:247](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L247)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:398](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L398)

___

### getNonce

▸ **getNonce**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Overrides

SmartWallet.getNonce

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:94](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L94)

___

### isDeployed

▸ **isDeployed**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Overrides

SmartWallet.isDeployed

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:127](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L127)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:164](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L164)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:239](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L239)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:98](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L98)

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

[src/wallet/smart-wallet/SmartWallet.ts:35](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/SmartWallet.ts#L35)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:104](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L104)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:296](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L296)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:510](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L510)

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

[src/wallet/smart-wallet/KernelSmartWallet.ts:429](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L429)

___

### createKernelClient

▸ **createKernelClient**(`config`, `chain`): `Promise`\<\{ `account`: `KernelSmartAccount`\<`HttpTransport`, `Chain`\> ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `chain`: `Chain` ; `deployContract`: \<TAbi, TChainOverride_1\>(`args`: `DeployContractParameters`\<`TAbi`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_1`, `ContractConstructorArgs`\<`TAbi`\>\> extends `T` ? \{ [K in string \| number \| symbol]: (T & UnionOmit\<SendTransactionParameters\<Chain, KernelSmartAccount\<HttpTransport, Chain\>, TChainOverride\_1\>, "data" \| "to" \| "accessList" \| "chain"\> & Object & UnionEvaluate\<readonly [] extends ContractConstructorArgs\<TAbi\> ? Object : Object\> & Object)[K] } : `never`) => `Promise`\<\`0x$\{string}\`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, \{ [K\_7 in string \| number \| symbol]: client[K\_7] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\> & \{ `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\>  }\> ; `key`: `string` ; `name`: `string` ; `pollingInterval`: `number` ; `prepareUserOperationRequest`: \<TTransport_1\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> ; `request`: `EIP1193RequestFn`\<`BundlerRpcSchema`\> ; `sendTransaction`: \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride`, `DeriveChain`\<`Chain`, `TChainOverride`\>\>) => `Promise`\<\`0x$\{string}\`\> ; `sendTransactions`: (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> ; `sendUserOperation`: \<TTransport_2\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`args`: `SignMessageParameters`\<`KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>) => `Promise`\<\`0x$\{string}\`\> ; `signTypedData`: \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TTypedData` extends \{ `address`: `undefined` ; `bool`: `undefined` ; `bytes`: `undefined` ; `bytes1`: `undefined` ; `bytes10`: `undefined` ; `bytes11`: `undefined` ; `bytes12`: `undefined` ; `bytes13`: `undefined` ; `bytes14`: `undefined` ; `bytes15`: `undefined` ; `bytes16`: `undefined` ; `bytes17`: `undefined` ; `bytes18`: `undefined` ; `bytes19`: `undefined` ; `bytes2`: `undefined` ; `bytes20`: `undefined` ; `bytes21`: `undefined` ; `bytes22`: `undefined` ; `bytes23`: `undefined` ; `bytes24`: `undefined` ; `bytes25`: `undefined` ; `bytes26`: `undefined` ; `bytes27`: `undefined` ; `bytes28`: `undefined` ; `bytes29`: `undefined` ; `bytes3`: `undefined` ; `bytes30`: `undefined` ; `bytes31`: `undefined` ; `bytes32`: `undefined` ; `bytes4`: `undefined` ; `bytes5`: `undefined` ; `bytes6`: `undefined` ; `bytes7`: `undefined` ; `bytes8`: `undefined` ; `bytes9`: `undefined` ; `int104`: `undefined` ; `int112`: `undefined` ; `int120`: `undefined` ; `int128`: `undefined` ; `int136`: `undefined` ; `int144`: `undefined` ; `int152`: `undefined` ; `int16`: `undefined` ; `int160`: `undefined` ; `int168`: `undefined` ; `int176`: `undefined` ; `int184`: `undefined` ; `int192`: `undefined` ; `int200`: `undefined` ; `int208`: `undefined` ; `int216`: `undefined` ; `int224`: `undefined` ; `int232`: `undefined` ; `int24`: `undefined` ; `int240`: `undefined` ; `int248`: `undefined` ; `int256`: `undefined` ; `int32`: `undefined` ; `int40`: `undefined` ; `int48`: `undefined` ; `int56`: `undefined` ; `int64`: `undefined` ; `int72`: `undefined` ; `int8`: `undefined` ; `int80`: `undefined` ; `int88`: `undefined` ; `int96`: `undefined` ; `string`: `undefined` ; `uint104`: `undefined` ; `uint112`: `undefined` ; `uint120`: `undefined` ; `uint128`: `undefined` ; `uint136`: `undefined` ; `uint144`: `undefined` ; `uint152`: `undefined` ; `uint16`: `undefined` ; `uint160`: `undefined` ; `uint168`: `undefined` ; `uint176`: `undefined` ; `uint184`: `undefined` ; `uint192`: `undefined` ; `uint200`: `undefined` ; `uint208`: `undefined` ; `uint216`: `undefined` ; `uint224`: `undefined` ; `uint232`: `undefined` ; `uint24`: `undefined` ; `uint240`: `undefined` ; `uint248`: `undefined` ; `uint256`: `undefined` ; `uint32`: `undefined` ; `uint40`: `undefined` ; `uint48`: `undefined` ; `uint56`: `undefined` ; `uint64`: `undefined` ; `uint72`: `undefined` ; `uint8`: `undefined` ; `uint80`: `undefined` ; `uint88`: `undefined` ; `uint96`: `undefined`  } ? keyof `TTypedData` : `string`\>) => `Promise`\<\`0x$\{string}\`\> ; `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\> ; `transport`: `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } ; `type`: `string` ; `uid`: `string` ; `writeContract`: \<TAbi_1, TFunctionName, TArgs, TChainOverride_2\>(`args`: `WriteContractParameters`\<`TAbi_1`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_2`, `ContractFunctionName`\<`TAbi_1`, ``"nonpayable"`` \| ``"payable"``\>, `DeriveChain`\<`Chain`, `TChainOverride_2`\>\>) => `Promise`\<\`0x$\{string}\`\>  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) |
| `chain` | `Chain` |

#### Returns

`Promise`\<\{ `account`: `KernelSmartAccount`\<`HttpTransport`, `Chain`\> ; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number` ; `wait?`: `number`  }  } ; `cacheTime`: `number` ; `chain`: `Chain` ; `deployContract`: \<TAbi, TChainOverride_1\>(`args`: `DeployContractParameters`\<`TAbi`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_1`, `ContractConstructorArgs`\<`TAbi`\>\> extends `T` ? \{ [K in string \| number \| symbol]: (T & UnionOmit\<SendTransactionParameters\<Chain, KernelSmartAccount\<HttpTransport, Chain\>, TChainOverride\_1\>, "data" \| "to" \| "accessList" \| "chain"\> & Object & UnionEvaluate\<readonly [] extends ContractConstructorArgs\<TAbi\> ? Object : Object\> & Object)[K] } : `never`) => `Promise`\<\`0x$\{string}\`\> ; `extend`: \<client\>(`fn`: (`client`: `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, `KernelAccountClientActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>\>) => `client`) => `Client`\<`HttpTransport`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `BundlerRpcSchema`, \{ [K\_7 in string \| number \| symbol]: client[K\_7] } & `SmartAccountActions`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>\> & \{ `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\>  }\> ; `key`: `string` ; `name`: `string` ; `pollingInterval`: `number` ; `prepareUserOperationRequest`: \<TTransport_1\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }, `stateOverrides?`: `StateOverrides`) => `Promise`\<\{ `callData`: \`0x$\{string}\` ; `callGasLimit`: `bigint` ; `initCode`: \`0x$\{string}\` ; `maxFeePerGas`: `bigint` ; `maxPriorityFeePerGas`: `bigint` ; `nonce`: `bigint` ; `paymasterAndData`: \`0x$\{string}\` ; `preVerificationGas`: `bigint` ; `sender`: \`0x$\{string}\` ; `signature`: \`0x$\{string}\` ; `verificationGasLimit`: `bigint`  }\> ; `request`: `EIP1193RequestFn`\<`BundlerRpcSchema`\> ; `sendTransaction`: \<TChainOverride\>(`args`: `SendTransactionParameters`\<`Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride`, `DeriveChain`\<`Chain`, `TChainOverride`\>\>) => `Promise`\<\`0x$\{string}\`\> ; `sendTransactions`: (`args`: \{ `account?`: `SmartAccount` ; `maxFeePerGas?`: `bigint` ; `maxPriorityFeePerGas?`: `bigint` ; `nonce?`: `bigint` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `transactions`: \{ `data`: \`0x$\{string}\` ; `to`: \`0x$\{string}\` ; `value`: `bigint`  }[]  }) => `Promise`\<\`0x$\{string}\`\> ; `sendUserOperation`: \<TTransport_2\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<\`0x$\{string}\`\> ; `signMessage`: (`args`: `SignMessageParameters`\<`KernelSmartAccount`\<`HttpTransport`, `Chain`\>\>) => `Promise`\<\`0x$\{string}\`\> ; `signTypedData`: \<TTypedData, TPrimaryType\>(`args`: `SignTypedDataParameters`\<`TTypedData`, `TPrimaryType`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TTypedData` extends \{ `address`: `undefined` ; `bool`: `undefined` ; `bytes`: `undefined` ; `bytes1`: `undefined` ; `bytes10`: `undefined` ; `bytes11`: `undefined` ; `bytes12`: `undefined` ; `bytes13`: `undefined` ; `bytes14`: `undefined` ; `bytes15`: `undefined` ; `bytes16`: `undefined` ; `bytes17`: `undefined` ; `bytes18`: `undefined` ; `bytes19`: `undefined` ; `bytes2`: `undefined` ; `bytes20`: `undefined` ; `bytes21`: `undefined` ; `bytes22`: `undefined` ; `bytes23`: `undefined` ; `bytes24`: `undefined` ; `bytes25`: `undefined` ; `bytes26`: `undefined` ; `bytes27`: `undefined` ; `bytes28`: `undefined` ; `bytes29`: `undefined` ; `bytes3`: `undefined` ; `bytes30`: `undefined` ; `bytes31`: `undefined` ; `bytes32`: `undefined` ; `bytes4`: `undefined` ; `bytes5`: `undefined` ; `bytes6`: `undefined` ; `bytes7`: `undefined` ; `bytes8`: `undefined` ; `bytes9`: `undefined` ; `int104`: `undefined` ; `int112`: `undefined` ; `int120`: `undefined` ; `int128`: `undefined` ; `int136`: `undefined` ; `int144`: `undefined` ; `int152`: `undefined` ; `int16`: `undefined` ; `int160`: `undefined` ; `int168`: `undefined` ; `int176`: `undefined` ; `int184`: `undefined` ; `int192`: `undefined` ; `int200`: `undefined` ; `int208`: `undefined` ; `int216`: `undefined` ; `int224`: `undefined` ; `int232`: `undefined` ; `int24`: `undefined` ; `int240`: `undefined` ; `int248`: `undefined` ; `int256`: `undefined` ; `int32`: `undefined` ; `int40`: `undefined` ; `int48`: `undefined` ; `int56`: `undefined` ; `int64`: `undefined` ; `int72`: `undefined` ; `int8`: `undefined` ; `int80`: `undefined` ; `int88`: `undefined` ; `int96`: `undefined` ; `string`: `undefined` ; `uint104`: `undefined` ; `uint112`: `undefined` ; `uint120`: `undefined` ; `uint128`: `undefined` ; `uint136`: `undefined` ; `uint144`: `undefined` ; `uint152`: `undefined` ; `uint16`: `undefined` ; `uint160`: `undefined` ; `uint168`: `undefined` ; `uint176`: `undefined` ; `uint184`: `undefined` ; `uint192`: `undefined` ; `uint200`: `undefined` ; `uint208`: `undefined` ; `uint216`: `undefined` ; `uint224`: `undefined` ; `uint232`: `undefined` ; `uint24`: `undefined` ; `uint240`: `undefined` ; `uint248`: `undefined` ; `uint256`: `undefined` ; `uint32`: `undefined` ; `uint40`: `undefined` ; `uint48`: `undefined` ; `uint56`: `undefined` ; `uint64`: `undefined` ; `uint72`: `undefined` ; `uint8`: `undefined` ; `uint80`: `undefined` ; `uint88`: `undefined` ; `uint96`: `undefined`  } ? keyof `TTypedData` : `string`\>) => `Promise`\<\`0x$\{string}\`\> ; `signUserOperation`: \<TTransport_3\>(`args`: \{ `account?`: `SmartAccount` ; `sponsorUserOperation?`: (`args`: \{ `entryPoint`: \`0x$\{string}\` ; `userOperation`: `UserOperation`  }) => `Promise`\<`UserOperation`\> ; `userOperation`: `PartialBy`\<`UserOperation`, ``"paymasterAndData"`` \| ``"callGasLimit"`` \| ``"verificationGasLimit"`` \| ``"preVerificationGas"`` \| ``"nonce"`` \| ``"maxFeePerGas"`` \| ``"maxPriorityFeePerGas"`` \| ``"signature"`` \| ``"sender"`` \| ``"initCode"``\>  }) => `Promise`\<`UserOperation`\> ; `transport`: `TransportConfig`\<``"http"``, `EIP1193RequestFn`\> & \{ `fetchOptions?`: `Omit`\<`RequestInit`, ``"body"``\> ; `url?`: `string`  } ; `type`: `string` ; `uid`: `string` ; `writeContract`: \<TAbi_1, TFunctionName, TArgs, TChainOverride_2\>(`args`: `WriteContractParameters`\<`TAbi_1`, `TFunctionName`, `TArgs`, `Chain`, `KernelSmartAccount`\<`HttpTransport`, `Chain`\>, `TChainOverride_2`, `ContractFunctionName`\<`TAbi_1`, ``"nonpayable"`` \| ``"payable"``\>, `DeriveChain`\<`Chain`, `TChainOverride_2`\>\>) => `Promise`\<\`0x$\{string}\`\>  }\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:451](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L451)

___

### getAccountLogicAddress

▸ **getAccountLogicAddress**(`config`): \`0x$\{string}\`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`KernelWalletConfig`](../README.md#kernelwalletconfig) |

#### Returns

\`0x$\{string}\`

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:498](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/wallet/smart-wallet/KernelSmartWallet.ts#L498)
