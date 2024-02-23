[@kriptonio/sdk](../README.md) / PaymasterService

# Class: PaymasterService

## Table of contents

### Constructors

- [constructor](PaymasterService.md#constructor)

### Properties

- [#apiClient](PaymasterService.md##apiclient)
- [#paymasterApi](PaymasterService.md##paymasterapi)

### Methods

- [create](PaymasterService.md#create)
- [get](PaymasterService.md#get)
- [getOrCreate](PaymasterService.md#getorcreate)

## Constructors

### constructor

• **new PaymasterService**(`apiClient`): [`PaymasterService`](PaymasterService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiClient` | `ApiClient` |

#### Returns

[`PaymasterService`](PaymasterService.md)

#### Defined in

[src/service/PaymasterService.ts:9](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L9)

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

[src/service/PaymasterService.ts:6](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L6)

___

### #paymasterApi

• `Private` **#paymasterApi**: [`PaymasterApi`](PaymasterApi.md)

#### Defined in

[src/service/PaymasterService.ts:7](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L7)

## Methods

### create

▸ **create**(`body`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `CreatePaymasterEndpointRequest` |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/service/PaymasterService.ts:14](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L14)

___

### get

▸ **get**(`id`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/service/PaymasterService.ts:18](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L18)

___

### getOrCreate

▸ **getOrCreate**(`params`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Omit`\<[`GetOrCreateParams`](../README.md#getorcreateparams), ``"organizationId"``\> |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/service/PaymasterService.ts:22](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/PaymasterService.ts#L22)
