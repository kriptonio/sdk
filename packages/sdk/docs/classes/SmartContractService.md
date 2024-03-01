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

[src/service/SmartContractService.ts:11](https://github.com/kriptonio/sdk/blob/82939f6/packages/sdk/src/service/SmartContractService.ts#L11)

## Properties

### #smartContractApi

• `Private` **#smartContractApi**: `SmartContractApi`

#### Defined in

[src/service/SmartContractService.ts:9](https://github.com/kriptonio/sdk/blob/82939f6/packages/sdk/src/service/SmartContractService.ts#L9)

## Methods

### createFromStandardJson

▸ **createFromStandardJson**(`props`): `Promise`\<[`SmartContract`](SmartContract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CreateFromStandardJsonProps` |

#### Returns

`Promise`\<[`SmartContract`](SmartContract.md)\>

#### Defined in

[src/service/SmartContractService.ts:19](https://github.com/kriptonio/sdk/blob/82939f6/packages/sdk/src/service/SmartContractService.ts#L19)

___

### get

▸ **get**(`props`): `Promise`\<[`SmartContract`](SmartContract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetSmartContractProps` |

#### Returns

`Promise`\<[`SmartContract`](SmartContract.md)\>

#### Defined in

[src/service/SmartContractService.ts:15](https://github.com/kriptonio/sdk/blob/82939f6/packages/sdk/src/service/SmartContractService.ts#L15)
