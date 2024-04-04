@kriptonio/sdk

# @kriptonio/sdk

## Table of contents

### Enumerations

- [ChainId](enums/ChainId.md)

### Classes

- [Configuration](classes/Configuration.md)
- [EoaWallet](classes/EoaWallet.md)
- [KernelSmartWallet](classes/KernelSmartWallet.md)
- [KriptonioError](classes/KriptonioError.md)
- [KriptonioSdk](classes/KriptonioSdk.md)
- [PaymasterApi](classes/PaymasterApi.md)
- [PaymasterService](classes/PaymasterService.md)
- [RpcService](classes/RpcService.md)
- [SmartContract](classes/SmartContract.md)
- [SmartContractService](classes/SmartContractService.md)
- [Wallet](classes/Wallet.md)
- [WalletFactory](classes/WalletFactory.md)
- [WalletService](classes/WalletService.md)

### Type Aliases

- [BiconomyWalletConfig](README.md#biconomywalletconfig)
- [BiconomyWalletWrapperConfig](README.md#biconomywalletwrapperconfig)
- [DeployContract](README.md#deploycontract)
- [DeployProps](README.md#deployprops)
- [DeployResponse](README.md#deployresponse)
- [EoaClient](README.md#eoaclient)
- [EoaWalletConfig](README.md#eoawalletconfig)
- [EoaWalletWrapperConfig](README.md#eoawalletwrapperconfig)
- [EstimateDeployProps](README.md#estimatedeployprops)
- [ExportVersion](README.md#exportversion)
- [ExportedBiconomyWallet](README.md#exportedbiconomywallet)
- [ExportedEoaWallet](README.md#exportedeoawallet)
- [ExportedKernelWallet](README.md#exportedkernelwallet)
- [ExportedWallet](README.md#exportedwallet)
- [GasData](README.md#gasdata)
- [GetOrCreatePaymasterProps](README.md#getorcreatepaymasterprops)
- [GetPaymasterProps](README.md#getpaymasterprops)
- [KernelClient](README.md#kernelclient)
- [KernelWalletConfig](README.md#kernelwalletconfig)
- [KernelWalletWrapperConfig](README.md#kernelwalletwrapperconfig)
- [OperationOptions](README.md#operationoptions)
- [PrivateKeyOrMnemonic](README.md#privatekeyormnemonic)
- [SdkBiconomyWalletType](README.md#sdkbiconomywallettype)
- [SdkConfiguration](README.md#sdkconfiguration)
- [SdkEoaWalletConfig](README.md#sdkeoawalletconfig)
- [SdkEoaWalletType](README.md#sdkeoawallettype)
- [SdkKernelWalletType](README.md#sdkkernelwallettype)
- [SdkReconfiguration](README.md#sdkreconfiguration)
- [SdkSmartWalletConfig](README.md#sdksmartwalletconfig)
- [SdkWalletConfig](README.md#sdkwalletconfig)
- [SdkWalletType](README.md#sdkwallettype)
- [SignableMessage](README.md#signablemessage)
- [SmartContractCallProps](README.md#smartcontractcallprops)
- [SmartContractDeployment](README.md#smartcontractdeployment)
- [TypedData](README.md#typeddata)
- [WalletConfig](README.md#walletconfig)
- [WalletType](README.md#wallettype)

### Variables

- [degen](README.md#degen)

### Functions

- [getChain](README.md#getchain)
- [sponsorUserOperation](README.md#sponsoruseroperation)

## Type Aliases

### BiconomyWalletConfig

Ƭ **BiconomyWalletConfig**: \{ `bundlerUrl?`: `string` ; `paymasterUrl?`: `string` ; `rpcUrl`: `string`  } & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic)

#### Defined in

[src/wallet/WalletConfig.ts:34](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L34)

___

### BiconomyWalletWrapperConfig

Ƭ **BiconomyWalletWrapperConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `biconomy` | [`BiconomyWalletConfig`](README.md#biconomywalletconfig) |

#### Defined in

[src/wallet/WalletConfig.ts:26](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L26)

___

### DeployContract

Ƭ **DeployContract**: \{ `bytecode`: `string` ; `value?`: `bigint`  } & [`GasData`](README.md#gasdata)

#### Defined in

[src/wallet/Wallet.ts:31](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L31)

___

### DeployProps

Ƭ **DeployProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `options?` | [`OperationOptions`](README.md#operationoptions) |
| `params` | `unknown`[] |

#### Defined in

[src/model/SmartContract.ts:28](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/model/SmartContract.ts#L28)

___

### DeployResponse

Ƭ **DeployResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `Hex` |
| `hash` | `Hex` |

#### Defined in

[src/wallet/Wallet.ts:15](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L15)

___

### EoaClient

Ƭ **EoaClient**: `Awaited`\<`ReturnType`\<typeof [`createEoaClient`](classes/EoaWallet.md#createeoaclient)\>\>

#### Defined in

[src/wallet/EoaWallet.ts:32](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/EoaWallet.ts#L32)

___

### EoaWalletConfig

Ƭ **EoaWalletConfig**: \{ `rpcUrl`: `string`  } & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic)

#### Defined in

[src/wallet/WalletConfig.ts:11](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L11)

___

### EoaWalletWrapperConfig

Ƭ **EoaWalletWrapperConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eoa` | [`EoaWalletConfig`](README.md#eoawalletconfig) |

#### Defined in

[src/wallet/WalletConfig.ts:20](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L20)

___

### EstimateDeployProps

Ƭ **EstimateDeployProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `params` | `unknown`[] |

#### Defined in

[src/model/SmartContract.ts:24](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/model/SmartContract.ts#L24)

___

### ExportVersion

Ƭ **ExportVersion**: ``"1.0"``

#### Defined in

[src/wallet/WalletConfig.ts:40](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L40)

___

### ExportedBiconomyWallet

Ƭ **ExportedBiconomyWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `biconomy` | `Omit`\<[`BiconomyWalletConfig`](README.md#biconomywalletconfig), ``"rpcUrl"`` \| ``"bundlerUrl"`` \| ``"paymasterUrl"``\> & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic) |
| `version?` | [`ExportVersion`](README.md#exportversion) |

#### Defined in

[src/wallet/WalletConfig.ts:58](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L58)

___

### ExportedEoaWallet

Ƭ **ExportedEoaWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eoa` | [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic) |
| `version?` | [`ExportVersion`](README.md#exportversion) |

#### Defined in

[src/wallet/WalletConfig.ts:47](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L47)

___

### ExportedKernelWallet

Ƭ **ExportedKernelWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kernel` | `Omit`\<[`KernelWalletConfig`](README.md#kernelwalletconfig), ``"rpcUrl"`` \| ``"bundlerUrl"`` \| ``"paymasterUrl"``\> & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic) |
| `version?` | [`ExportVersion`](README.md#exportversion) |

#### Defined in

[src/wallet/WalletConfig.ts:52](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L52)

___

### ExportedWallet

Ƭ **ExportedWallet**: [`ExportedEoaWallet`](README.md#exportedeoawallet) \| [`ExportedKernelWallet`](README.md#exportedkernelwallet) \| [`ExportedBiconomyWallet`](README.md#exportedbiconomywallet)

#### Defined in

[src/wallet/WalletConfig.ts:42](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L42)

___

### GasData

Ƭ **GasData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxFeePerGas?` | `bigint` |
| `maxPriorityFeePerGas?` | `bigint` |

#### Defined in

[src/wallet/Wallet.ts:36](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L36)

___

### GetOrCreatePaymasterProps

Ƭ **GetOrCreatePaymasterProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `entryPoint` | `string` |
| `organizationId` | `string` |
| `wallet?` | `string` |

#### Defined in

[src/api/PaymasterApi.ts:20](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L20)

___

### GetPaymasterProps

Ƭ **GetPaymasterProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Defined in

[src/api/PaymasterApi.ts:16](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L16)

___

### KernelClient

Ƭ **KernelClient**: `KernelAccountClient`\<`ENTRYPOINT_ADDRESS_V06_TYPE`, `Transport`, `Chain`, `ParseAccount`\<`KernelSmartAccount`\<`ENTRYPOINT_ADDRESS_V06_TYPE`\>\>\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:37](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L37)

___

### KernelWalletConfig

Ƭ **KernelWalletConfig**: \{ `bundlerUrl?`: `string` ; `paymasterUrl?`: `string` ; `rpcUrl`: `string`  } & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic)

#### Defined in

[src/wallet/WalletConfig.ts:28](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L28)

___

### KernelWalletWrapperConfig

Ƭ **KernelWalletWrapperConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kernel` | [`KernelWalletConfig`](README.md#kernelwalletconfig) |

#### Defined in

[src/wallet/WalletConfig.ts:24](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L24)

___

### OperationOptions

Ƭ **OperationOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onStatusChange?` | (`status`: `OperationStatus`) => `void` |

#### Defined in

[src/wallet/Wallet.ts:20](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L20)

___

### PrivateKeyOrMnemonic

Ƭ **PrivateKeyOrMnemonic**: \{ `privateKey`: `string`  } \| \{ `mnemonic`: `string`  }

#### Defined in

[src/wallet/WalletConfig.ts:3](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L3)

___

### SdkBiconomyWalletType

Ƭ **SdkBiconomyWalletType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"biconomy"`` |

#### Defined in

[src/wallet/WalletConfig.ts:71](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L71)

___

### SdkConfiguration

Ƭ **SdkConfiguration**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |

#### Defined in

[src/Sdk.ts:8](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Sdk.ts#L8)

___

### SdkEoaWalletConfig

Ƭ **SdkEoaWalletConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Defined in

[src/wallet/WalletConfig.ts:91](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L91)

___

### SdkEoaWalletType

Ƭ **SdkEoaWalletType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"eoa"`` |

#### Defined in

[src/wallet/WalletConfig.ts:75](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L75)

___

### SdkKernelWalletType

Ƭ **SdkKernelWalletType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type?` | ``"kernel"`` |

#### Defined in

[src/wallet/WalletConfig.ts:67](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L67)

___

### SdkReconfiguration

Ƭ **SdkReconfiguration**: `AuthenticationData` & \{ `apiUrl?`: `string` ; `organizationId?`: `string` ; `paymasterApiUrl?`: `string` ; `rpcApiUrl?`: `string`  }

#### Defined in

[src/Sdk.ts:12](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Sdk.ts#L12)

___

### SdkSmartWalletConfig

Ƭ **SdkSmartWalletConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `paymaster?` | \{ `disabled?`: `boolean`  } |
| `paymaster.disabled?` | `boolean` |

#### Defined in

[src/wallet/WalletConfig.ts:84](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L84)

___

### SdkWalletConfig

Ƭ **SdkWalletConfig**: [`SdkEoaWalletConfig`](README.md#sdkeoawalletconfig) \| [`SdkSmartWalletConfig`](README.md#sdksmartwalletconfig)

#### Defined in

[src/wallet/WalletConfig.ts:95](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L95)

___

### SdkWalletType

Ƭ **SdkWalletType**: [`SdkKernelWalletType`](README.md#sdkkernelwallettype) \| [`SdkEoaWalletType`](README.md#sdkeoawallettype) \| [`SdkBiconomyWalletType`](README.md#sdkbiconomywallettype)

#### Defined in

[src/wallet/WalletConfig.ts:79](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L79)

___

### SignableMessage

Ƭ **SignableMessage**: `string` \| \{ `raw`: `string` \| `Uint8Array`  }

#### Defined in

[src/wallet/Wallet.ts:41](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L41)

___

### SmartContractCallProps

Ƭ **SmartContractCallProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxFeePerGas?` | `bigint` |
| `maxPriorityFeePerGas?` | `bigint` |
| `options?` | [`OperationOptions`](README.md#operationoptions) |
| `params?` | `unknown`[] |
| `value?` | `bigint` |

#### Defined in

[src/model/SmartContract.ts:33](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/model/SmartContract.ts#L33)

___

### SmartContractDeployment

Ƭ **SmartContractDeployment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `Hex` |
| `hash` | `Hex` |

#### Defined in

[src/model/SmartContract.ts:41](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/model/SmartContract.ts#L41)

___

### TypedData

Ƭ **TypedData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domain?` | `TypedDataDomain` |
| `message` | `Record`\<`string`, `unknown`\> |
| `primaryType` | `string` |
| `types` | `Record`\<`string`, `unknown`\> |

#### Defined in

[src/wallet/Wallet.ts:24](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L24)

___

### WalletConfig

Ƭ **WalletConfig**: [`EoaWalletWrapperConfig`](README.md#eoawalletwrapperconfig) \| [`KernelWalletWrapperConfig`](README.md#kernelwalletwrapperconfig) \| [`BiconomyWalletWrapperConfig`](README.md#biconomywalletwrapperconfig)

#### Defined in

[src/wallet/WalletConfig.ts:15](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/WalletConfig.ts#L15)

___

### WalletType

Ƭ **WalletType**: ``"eoa"`` \| ``"kernel"``

#### Defined in

[src/wallet/Wallet.ts:13](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/wallet/Wallet.ts#L13)

## Variables

### degen

• `Const` **degen**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockExplorers` | \{ `default`: \{ `name`: ``"Arbiscan"`` = 'Arbiscan'; `url`: ``"https://explorer.degen.tips"`` = 'https://explorer.degen.tips' }  } | Collection of block explorers |
| `blockExplorers.default` | \{ `name`: ``"Arbiscan"`` = 'Arbiscan'; `url`: ``"https://explorer.degen.tips"`` = 'https://explorer.degen.tips' } | - |
| `blockExplorers.default.name` | ``"Arbiscan"`` | - |
| `blockExplorers.default.url` | ``"https://explorer.degen.tips"`` | - |
| `contracts?` | \{ `ensRegistry?`: `ChainContract` ; `ensUniversalResolver?`: `ChainContract` ; `multicall3?`: `ChainContract`  } | Collection of contracts |
| `contracts.ensRegistry?` | `ChainContract` | - |
| `contracts.ensUniversalResolver?` | `ChainContract` | - |
| `contracts.multicall3?` | `ChainContract` | - |
| `custom?` | `Record`\<`string`, `unknown`\> | Custom chain data. |
| `fees?` | `ChainFees`\<`undefined`\> | Modifies how fees are derived. |
| `formatters?` | `undefined` | Modifies how chain data structures (ie. Blocks, Transactions, etc) are formatted & typed. |
| `id` | ``666666666`` | ID in number form |
| `name` | ``"Degen"`` | Human-readable name |
| `nativeCurrency` | \{ `decimals`: ``18`` = 18; `name`: ``"Degen"`` = 'Degen'; `symbol`: ``"DEGEN"`` = 'DEGEN' } | Currency used by chain |
| `nativeCurrency.decimals` | ``18`` | - |
| `nativeCurrency.name` | ``"Degen"`` | - |
| `nativeCurrency.symbol` | ``"DEGEN"`` | - |
| `rpcUrls` | \{ `default`: \{ `http`: readonly [``"https://rpc.degen.tips"``]  }  } | Collection of RPC endpoints |
| `rpcUrls.default` | \{ `http`: readonly [``"https://rpc.degen.tips"``]  } | - |
| `rpcUrls.default.http` | readonly [``"https://rpc.degen.tips"``] | - |
| `serializers?` | `ChainSerializers`\<`undefined`\> | Modifies how data (ie. Transactions) is serialized. |
| `sourceId?` | `number` | Source Chain ID (ie. the L1 chain) |
| `testnet?` | `boolean` | Flag for test networks |

#### Defined in

[src/Chain.ts:17](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Chain.ts#L17)

## Functions

### getChain

▸ **getChain**(`chainId`): `viemChains.Chain`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`viemChains.Chain`

#### Defined in

[src/Chain.ts:53](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Chain.ts#L53)

___

### sponsorUserOperation

▸ **sponsorUserOperation**(`paymasterUrl`, `userOperation`, `entryPoint`): `Promise`\<`SponsoredUserOperation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `paymasterUrl` | `string` |
| `userOperation` | `Object` |
| `userOperation.callData` | \`0x$\{string}\` |
| `userOperation.callGasLimit` | `bigint` |
| `userOperation.factory?` | `undefined` |
| `userOperation.factoryData?` | `undefined` |
| `userOperation.initCode` | \`0x$\{string}\` |
| `userOperation.maxFeePerGas` | `bigint` |
| `userOperation.maxPriorityFeePerGas` | `bigint` |
| `userOperation.nonce` | `bigint` |
| `userOperation.paymaster?` | `undefined` |
| `userOperation.paymasterAndData` | \`0x$\{string}\` |
| `userOperation.paymasterData?` | `undefined` |
| `userOperation.paymasterPostOpGasLimit?` | `undefined` |
| `userOperation.paymasterVerificationGasLimit?` | `undefined` |
| `userOperation.preVerificationGas` | `bigint` |
| `userOperation.sender` | \`0x$\{string}\` |
| `userOperation.signature` | \`0x$\{string}\` |
| `userOperation.verificationGasLimit` | `bigint` |
| `entryPoint` | \`0x$\{string}\` |

#### Returns

`Promise`\<`SponsoredUserOperation`\>

#### Defined in

[src/api/PaymasterApi.ts:97](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L97)
