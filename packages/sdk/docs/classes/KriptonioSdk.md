[@kriptonio/sdk](../README.md) / KriptonioSdk

# Class: KriptonioSdk

## Table of contents

### Constructors

- [constructor](KriptonioSdk.md#constructor)

### Properties

- [#apiClient](KriptonioSdk.md##apiclient)
- [paymaster](KriptonioSdk.md#paymaster)
- [rpc](KriptonioSdk.md#rpc)
- [smartContract](KriptonioSdk.md#smartcontract)
- [wallet](KriptonioSdk.md#wallet)

### Methods

- [configure](KriptonioSdk.md#configure)

## Constructors

### constructor

• **new KriptonioSdk**(`config`): [`KriptonioSdk`](KriptonioSdk.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SdkConfiguration`](../README.md#sdkconfiguration) |

#### Returns

[`KriptonioSdk`](KriptonioSdk.md)

#### Defined in

src/Sdk.ts:26

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

src/Sdk.ts:20

___

### paymaster

• `Readonly` **paymaster**: [`PaymasterService`](PaymasterService.md)

#### Defined in

src/Sdk.ts:24

___

### rpc

• `Readonly` **rpc**: [`RpcService`](RpcService.md)

#### Defined in

src/Sdk.ts:23

___

### smartContract

• `Readonly` **smartContract**: [`SmartContractService`](SmartContractService.md)

#### Defined in

src/Sdk.ts:22

___

### wallet

• `Readonly` **wallet**: [`WalletService`](WalletService.md)

#### Defined in

src/Sdk.ts:21

## Methods

### configure

▸ **configure**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SdkReconfiguration`](../README.md#sdkreconfiguration) |

#### Returns

`void`

#### Defined in

src/Sdk.ts:34
