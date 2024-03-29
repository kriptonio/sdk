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

- [DeployProps](README.md#deployprops)
- [DeployResponse](README.md#deployresponse)
- [DeployWallet](README.md#deploywallet)
- [EoaClient](README.md#eoaclient)
- [EoaWalletConfig](README.md#eoawalletconfig)
- [EoaWalletWrapperConfig](README.md#eoawalletwrapperconfig)
- [EstimateDeployProps](README.md#estimatedeployprops)
- [ExportVersion](README.md#exportversion)
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
- [SdkConfiguration](README.md#sdkconfiguration)
- [SdkEoaWalletConfig](README.md#sdkeoawalletconfig)
- [SdkEoaWalletType](README.md#sdkeoawallettype)
- [SdkKernelWalletConfig](README.md#sdkkernelwalletconfig)
- [SdkKernelWalletType](README.md#sdkkernelwallettype)
- [SdkReconfiguration](README.md#sdkreconfiguration)
- [SdkWalletConfig](README.md#sdkwalletconfig)
- [SdkWalletType](README.md#sdkwallettype)
- [SignableMessage](README.md#signablemessage)
- [SmartContractCallProps](README.md#smartcontractcallprops)
- [SmartContractDeployment](README.md#smartcontractdeployment)
- [TypedData](README.md#typeddata)
- [WalletConfig](README.md#walletconfig)
- [WalletType](README.md#wallettype)

### Functions

- [sponsorUserOperation](README.md#sponsoruseroperation)

## Type Aliases

### DeployProps

Ƭ **DeployProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `options?` | [`OperationOptions`](README.md#operationoptions) |
| `params` | `unknown`[] |

#### Defined in

[src/model/SmartContract.ts:28](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/model/SmartContract.ts#L28)

___

### DeployResponse

Ƭ **DeployResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `Hex` |
| `hash` | `Hex` |

#### Defined in

[src/wallet/Wallet.ts:15](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L15)

___

### DeployWallet

Ƭ **DeployWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecode` | `string` |
| `value?` | `bigint` |

#### Defined in

[src/wallet/Wallet.ts:31](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L31)

___

### EoaClient

Ƭ **EoaClient**: `Awaited`\<`ReturnType`\<typeof [`createEoaClient`](classes/EoaWallet.md#createeoaclient)\>\>

#### Defined in

[src/wallet/EoaWallet.ts:32](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/EoaWallet.ts#L32)

___

### EoaWalletConfig

Ƭ **EoaWalletConfig**: \{ `rpcUrl`: `string`  } & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic)

#### Defined in

[src/wallet/WalletConfig.ts:11](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L11)

___

### EoaWalletWrapperConfig

Ƭ **EoaWalletWrapperConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eoa` | [`EoaWalletConfig`](README.md#eoawalletconfig) |

#### Defined in

[src/wallet/WalletConfig.ts:17](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L17)

___

### EstimateDeployProps

Ƭ **EstimateDeployProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `params` | `unknown`[] |

#### Defined in

[src/model/SmartContract.ts:24](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/model/SmartContract.ts#L24)

___

### ExportVersion

Ƭ **ExportVersion**: ``"1.0"``

#### Defined in

[src/wallet/WalletConfig.ts:31](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L31)

___

### ExportedEoaWallet

Ƭ **ExportedEoaWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eoa` | [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic) |
| `version?` | [`ExportVersion`](README.md#exportversion) |

#### Defined in

[src/wallet/WalletConfig.ts:35](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L35)

___

### ExportedKernelWallet

Ƭ **ExportedKernelWallet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kernel` | `Omit`\<[`KernelWalletConfig`](README.md#kernelwalletconfig), ``"rpcUrl"`` \| ``"bundlerUrl"`` \| ``"paymasterUrl"``\> & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic) |
| `version?` | [`ExportVersion`](README.md#exportversion) |

#### Defined in

[src/wallet/WalletConfig.ts:40](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L40)

___

### ExportedWallet

Ƭ **ExportedWallet**: [`ExportedEoaWallet`](README.md#exportedeoawallet) \| [`ExportedKernelWallet`](README.md#exportedkernelwallet)

#### Defined in

[src/wallet/WalletConfig.ts:33](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L33)

___

### GasData

Ƭ **GasData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxFeePerGas?` | `bigint` |
| `maxPriorityFeePerGas?` | `bigint` |

#### Defined in

[src/wallet/Wallet.ts:36](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L36)

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

[src/api/PaymasterApi.ts:20](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/api/PaymasterApi.ts#L20)

___

### GetPaymasterProps

Ƭ **GetPaymasterProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Defined in

[src/api/PaymasterApi.ts:16](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/api/PaymasterApi.ts#L16)

___

### KernelClient

Ƭ **KernelClient**: `KernelAccountClient`\<`HttpTransport`, `Chain`, `ParseAccount`\<`KernelSmartAccount`\>\>

#### Defined in

[src/wallet/smart-wallet/KernelSmartWallet.ts:66](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/smart-wallet/KernelSmartWallet.ts#L66)

___

### KernelWalletConfig

Ƭ **KernelWalletConfig**: \{ `bundlerUrl?`: `string` ; `paymasterUrl?`: `string` ; `rpcUrl`: `string`  } & [`PrivateKeyOrMnemonic`](README.md#privatekeyormnemonic)

#### Defined in

[src/wallet/WalletConfig.ts:25](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L25)

___

### KernelWalletWrapperConfig

Ƭ **KernelWalletWrapperConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `kernel` | [`KernelWalletConfig`](README.md#kernelwalletconfig) |

#### Defined in

[src/wallet/WalletConfig.ts:21](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L21)

___

### OperationOptions

Ƭ **OperationOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onStatusChange?` | (`status`: `OperationStatus`) => `void` |

#### Defined in

[src/wallet/Wallet.ts:20](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L20)

___

### PrivateKeyOrMnemonic

Ƭ **PrivateKeyOrMnemonic**: \{ `privateKey`: `string`  } \| \{ `mnemonic`: `string`  }

#### Defined in

[src/wallet/WalletConfig.ts:3](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L3)

___

### SdkConfiguration

Ƭ **SdkConfiguration**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |

#### Defined in

[src/Sdk.ts:8](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/Sdk.ts#L8)

___

### SdkEoaWalletConfig

Ƭ **SdkEoaWalletConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](enums/ChainId.md) |

#### Defined in

[src/wallet/WalletConfig.ts:63](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L63)

___

### SdkEoaWalletType

Ƭ **SdkEoaWalletType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"eoa"`` |

#### Defined in

[src/wallet/WalletConfig.ts:50](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L50)

___

### SdkKernelWalletConfig

Ƭ **SdkKernelWalletConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `chainId` | [`ChainId`](enums/ChainId.md) |
| `paymaster?` | \{ `disabled?`: `boolean`  } |
| `paymaster.disabled?` | `boolean` |

#### Defined in

[src/wallet/WalletConfig.ts:56](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L56)

___

### SdkKernelWalletType

Ƭ **SdkKernelWalletType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type?` | ``"kernel"`` |

#### Defined in

[src/wallet/WalletConfig.ts:46](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L46)

___

### SdkReconfiguration

Ƭ **SdkReconfiguration**: `AuthenticationData` & \{ `apiUrl?`: `string` ; `organizationId?`: `string` ; `paymasterApiUrl?`: `string` ; `rpcApiUrl?`: `string`  }

#### Defined in

[src/Sdk.ts:12](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/Sdk.ts#L12)

___

### SdkWalletConfig

Ƭ **SdkWalletConfig**: [`SdkEoaWalletConfig`](README.md#sdkeoawalletconfig) \| [`SdkKernelWalletConfig`](README.md#sdkkernelwalletconfig)

#### Defined in

[src/wallet/WalletConfig.ts:67](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L67)

___

### SdkWalletType

Ƭ **SdkWalletType**: [`SdkKernelWalletType`](README.md#sdkkernelwallettype) \| [`SdkEoaWalletType`](README.md#sdkeoawallettype)

#### Defined in

[src/wallet/WalletConfig.ts:54](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L54)

___

### SignableMessage

Ƭ **SignableMessage**: `string` \| \{ `raw`: `string` \| `Uint8Array`  }

#### Defined in

[src/wallet/Wallet.ts:41](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L41)

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

[src/model/SmartContract.ts:33](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/model/SmartContract.ts#L33)

___

### SmartContractDeployment

Ƭ **SmartContractDeployment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `Hex` |
| `hash` | `Hex` |

#### Defined in

[src/model/SmartContract.ts:41](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/model/SmartContract.ts#L41)

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

[src/wallet/Wallet.ts:24](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L24)

___

### WalletConfig

Ƭ **WalletConfig**: [`EoaWalletWrapperConfig`](README.md#eoawalletwrapperconfig) \| [`KernelWalletWrapperConfig`](README.md#kernelwalletwrapperconfig)

#### Defined in

[src/wallet/WalletConfig.ts:15](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/WalletConfig.ts#L15)

___

### WalletType

Ƭ **WalletType**: ``"eoa"`` \| ``"kernel"``

#### Defined in

[src/wallet/Wallet.ts:13](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L13)

## Functions

### sponsorUserOperation

▸ **sponsorUserOperation**(`paymasterUrl`, `userOperation`, `entryPoint`): `Promise`\<`SponsoredUserOperation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `paymasterUrl` | `string` |
| `userOperation` | `UserOperation` |
| `entryPoint` | \`0x$\{string}\` |

#### Returns

`Promise`\<`SponsoredUserOperation`\>

#### Defined in

[src/api/PaymasterApi.ts:97](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/api/PaymasterApi.ts#L97)
