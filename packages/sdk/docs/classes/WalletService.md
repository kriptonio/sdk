[@kriptonio/sdk](../README.md) / WalletService

# Class: WalletService

## Table of contents

### Constructors

- [constructor](WalletService.md#constructor)

### Properties

- [#paymasterService](WalletService.md##paymasterservice)
- [#rpcService](WalletService.md##rpcservice)

### Methods

- [createEoaWallet](WalletService.md#createeoawallet)
- [createSmartWallet](WalletService.md#createsmartwallet)
- [from](WalletService.md#from)
- [generate](WalletService.md#generate)

## Constructors

### constructor

• **new WalletService**(`rpcService`, `paymasterService`): [`WalletService`](WalletService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcService` | [`RpcService`](RpcService.md) |
| `paymasterService` | [`PaymasterService`](PaymasterService.md) |

#### Returns

[`WalletService`](WalletService.md)

#### Defined in

[src/wallet/WalletService.ts:26](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L26)

## Properties

### #paymasterService

• `Private` **#paymasterService**: [`PaymasterService`](PaymasterService.md)

#### Defined in

[src/wallet/WalletService.ts:24](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L24)

___

### #rpcService

• `Private` **#rpcService**: [`RpcService`](RpcService.md)

#### Defined in

[src/wallet/WalletService.ts:23](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L23)

## Methods

### createEoaWallet

▸ **createEoaWallet**(`exportedWallet`, `config`): `Promise`\<[`EoaWallet`](EoaWallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `exportedWallet` | [`ExportedEoaWallet`](../README.md#exportedeoawallet) |
| `config` | [`SdkEoaWalletConfig`](../README.md#sdkeoawalletconfig) |

#### Returns

`Promise`\<[`EoaWallet`](EoaWallet.md)\>

#### Defined in

[src/wallet/WalletService.ts:147](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L147)

___

### createSmartWallet

▸ **createSmartWallet**(`exportedWallet`, `config`): `Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> \| `BiconomySmartWallet`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `exportedWallet` | [`ExportedKernelWallet`](../README.md#exportedkernelwallet) \| [`ExportedBiconomyWallet`](../README.md#exportedbiconomywallet) |
| `config` | [`SdkSmartWalletConfig`](../README.md#sdksmartwalletconfig) |

#### Returns

`Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> \| `BiconomySmartWallet`\>

#### Defined in

[src/wallet/WalletService.ts:94](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L94)

___

### from

▸ **from**\<`TWalletConfig`\>(`config`, `options`): `Promise`\<`TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`EoaWallet`](EoaWallet.md) : `TWalletConfig` extends [`ExportedKernelWallet`](../README.md#exportedkernelwallet) ? [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> : `BiconomySmartWallet`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TWalletConfig` | extends [`ExportedWallet`](../README.md#exportedwallet) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TWalletConfig` |
| `options` | `TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`SdkEoaWalletConfig`](../README.md#sdkeoawalletconfig) : [`SdkSmartWalletConfig`](../README.md#sdksmartwalletconfig) |

#### Returns

`Promise`\<`TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`EoaWallet`](EoaWallet.md) : `TWalletConfig` extends [`ExportedKernelWallet`](../README.md#exportedkernelwallet) ? [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> : `BiconomySmartWallet`\>

#### Defined in

[src/wallet/WalletService.ts:67](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L67)

___

### generate

▸ **generate**\<`TSdkWalletConfig`\>(`config`): `Promise`\<`TSdkWalletConfig` extends [`SdkEoaWalletType`](../README.md#sdkeoawallettype) ? [`EoaWallet`](EoaWallet.md) : `TSdkWalletConfig` extends [`SdkBiconomyWalletType`](../README.md#sdkbiconomywallettype) ? `BiconomySmartWallet` : [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSdkWalletConfig` | extends [`SdkWalletConfig`](../README.md#sdkwalletconfig) & [`SdkWalletType`](../README.md#sdkwallettype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TSdkWalletConfig` |

#### Returns

`Promise`\<`TSdkWalletConfig` extends [`SdkEoaWalletType`](../README.md#sdkeoawallettype) ? [`EoaWallet`](EoaWallet.md) : `TSdkWalletConfig` extends [`SdkBiconomyWalletType`](../README.md#sdkbiconomywallettype) ? `BiconomySmartWallet` : [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\>\>

#### Defined in

[src/wallet/WalletService.ts:31](https://github.com/kriptonio/sdk/blob/9e9d3ab/packages/sdk/src/wallet/WalletService.ts#L31)
