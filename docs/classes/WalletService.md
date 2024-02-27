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

[src/wallet/WalletService.ts:23](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L23)

## Properties

### #paymasterService

• `Private` **#paymasterService**: [`PaymasterService`](PaymasterService.md)

#### Defined in

[src/wallet/WalletService.ts:21](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L21)

___

### #rpcService

• `Private` **#rpcService**: [`RpcService`](RpcService.md)

#### Defined in

[src/wallet/WalletService.ts:20](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L20)

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

[src/wallet/WalletService.ts:122](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L122)

___

### createSmartWallet

▸ **createSmartWallet**(`exportedWallet`, `config`): `Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `exportedWallet` | [`ExportedKernelWallet`](../README.md#exportedkernelwallet) |
| `config` | [`SdkKernelWalletConfig`](../README.md#sdkkernelwalletconfig) |

#### Returns

`Promise`\<[`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Defined in

[src/wallet/WalletService.ts:83](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L83)

___

### from

▸ **from**\<`TWalletConfig`\>(`config`, `options`): `Promise`\<`TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TWalletConfig` | extends [`ExportedWallet`](../README.md#exportedwallet) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TWalletConfig` |
| `options` | `TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`SdkEoaWalletConfig`](../README.md#sdkeoawalletconfig) : [`SdkKernelWalletConfig`](../README.md#sdkkernelwalletconfig) |

#### Returns

`Promise`\<`TWalletConfig` extends [`ExportedEoaWallet`](../README.md#exportedeoawallet) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Defined in

[src/wallet/WalletService.ts:60](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L60)

___

### generate

▸ **generate**\<`TSdkWalletConfig`\>(`config`): `Promise`\<`TSdkWalletConfig` extends [`SdkEoaWalletType`](../README.md#sdkeoawallettype) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSdkWalletConfig` | extends [`SdkWalletConfig`](../README.md#sdkwalletconfig) & [`SdkWalletType`](../README.md#sdkwallettype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TSdkWalletConfig` |

#### Returns

`Promise`\<`TSdkWalletConfig` extends [`SdkEoaWalletType`](../README.md#sdkeoawallettype) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Defined in

[src/wallet/WalletService.ts:28](https://github.com/kriptonio/sdk/blob/5181831/src/wallet/WalletService.ts#L28)
