[@kriptonio/sdk](../README.md) / WalletFactory

# Class: WalletFactory

## Table of contents

### Constructors

- [constructor](WalletFactory.md#constructor)

### Methods

- [from](WalletFactory.md#from)

## Constructors

### constructor

• **new WalletFactory**(): [`WalletFactory`](WalletFactory.md)

#### Returns

[`WalletFactory`](WalletFactory.md)

## Methods

### from

▸ **from**\<`TConfig`\>(`config`): `Promise`\<`TConfig` extends [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TConfig` | extends [`WalletConfig`](../README.md#walletconfig) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TConfig` |

#### Returns

`Promise`\<`TConfig` extends [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) ? [`EoaWallet`](EoaWallet.md) : [`KernelSmartWallet`](KernelSmartWallet.md)\>

#### Defined in

[src/wallet/WalletFactory.ts:7](https://github.com/kriptonio/sdk/blob/b75f033/packages/sdk/src/wallet/WalletFactory.ts#L7)
