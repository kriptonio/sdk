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

▸ **from**\<`TConfig`\>(`config`): `Promise`\<`TConfig` extends [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) ? [`EoaWallet`](EoaWallet.md) : `TConfig` extends [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) ? [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> : `BiconomySmartWallet`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TConfig` | extends [`WalletConfig`](../README.md#walletconfig) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `TConfig` |

#### Returns

`Promise`\<`TConfig` extends [`EoaWalletWrapperConfig`](../README.md#eoawalletwrapperconfig) ? [`EoaWallet`](EoaWallet.md) : `TConfig` extends [`KernelWalletWrapperConfig`](../README.md#kernelwalletwrapperconfig) ? [`KernelSmartWallet`](KernelSmartWallet.md)\<``"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"``\> : `BiconomySmartWallet`\>

#### Defined in

[src/wallet/WalletFactory.ts:12](https://github.com/kriptonio/sdk/blob/6bbdedb/packages/sdk/src/wallet/WalletFactory.ts#L12)
