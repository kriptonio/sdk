[@kriptonio/sdk](../README.md) / PaymasterApi

# Class: PaymasterApi

## Table of contents

### Constructors

- [constructor](PaymasterApi.md#constructor)

### Properties

- [#apiClient](PaymasterApi.md##apiclient)

### Methods

- [create](PaymasterApi.md#create)
- [createResponse](PaymasterApi.md#createresponse)
- [get](PaymasterApi.md#get)
- [getOrCreate](PaymasterApi.md#getorcreate)

## Constructors

### constructor

• **new PaymasterApi**(`apiClient`): [`PaymasterApi`](PaymasterApi.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiClient` | `ApiClient` |

#### Returns

[`PaymasterApi`](PaymasterApi.md)

#### Defined in

[src/api/PaymasterApi.ts:26](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L26)

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

[src/api/PaymasterApi.ts:24](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L24)

## Methods

### create

▸ **create**(`data`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `CreatePaymasterEndpointRequest` |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/api/PaymasterApi.ts:30](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L30)

___

### createResponse

▸ **createResponse**(`response`): `PaymasterDto`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `PaymasterEndpointDetailResponse` \| `PaymasterEndpointResponse` |

#### Returns

`PaymasterDto`

#### Defined in

[src/api/PaymasterApi.ts:80](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L80)

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

[src/api/PaymasterApi.ts:48](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L48)

___

### getOrCreate

▸ **getOrCreate**(`params`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOrCreateParams`](../README.md#getorcreateparams) |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/api/PaymasterApi.ts:63](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/api/PaymasterApi.ts#L63)
