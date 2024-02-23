[@kriptonio/sdk](../README.md) / SmartContractService

# Class: SmartContractService

## Table of contents

### Constructors

- [constructor](SmartContractService.md#constructor)

### Properties

- [#smartContractApi](SmartContractService.md##smartcontractapi)

### Methods

- [createFromStandardJson](SmartContractService.md#createfromstandardjson)
- [get](SmartContractService.md#get)

## Constructors

### constructor

• **new SmartContractService**(`apiClient`): [`SmartContractService`](SmartContractService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiClient` | `ApiClient` |

#### Returns

[`SmartContractService`](SmartContractService.md)

#### Defined in

[src/service/SmartContractService.ts:14](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/SmartContractService.ts#L14)

## Properties

### #smartContractApi

• `Private` **#smartContractApi**: `SmartContractApi`

#### Defined in

[src/service/SmartContractService.ts:12](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/SmartContractService.ts#L12)

## Methods

### createFromStandardJson

▸ **createFromStandardJson**(`data`, `wallet?`): `Promise`\<[`SmartContract`](SmartContract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `CreateSmartContractFromStandardJsonBody` |
| `wallet?` | [`Wallet`](Wallet.md) |

#### Returns

`Promise`\<[`SmartContract`](SmartContract.md)\>

#### Defined in

[src/service/SmartContractService.ts:22](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/SmartContractService.ts#L22)

___

### get

▸ **get**(`id`, `wallet?`): `Promise`\<[`SmartContract`](SmartContract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `wallet?` | [`Wallet`](Wallet.md) |

#### Returns

`Promise`\<[`SmartContract`](SmartContract.md)\>

#### Defined in

[src/service/SmartContractService.ts:18](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/SmartContractService.ts#L18)
