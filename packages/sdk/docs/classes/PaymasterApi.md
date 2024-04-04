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

[src/api/PaymasterApi.ts:30](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L30)

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

[src/api/PaymasterApi.ts:28](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L28)

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

[src/api/PaymasterApi.ts:34](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L34)

___

### createResponse

▸ **createResponse**(`response`): `PaymasterDto`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `PaymasterEndpointResponse` \| `PaymasterEndpointDetailResponse` |

#### Returns

`PaymasterDto`

#### Defined in

[src/api/PaymasterApi.ts:84](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L84)

___

### get

▸ **get**(`props`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`GetPaymasterProps`](../README.md#getpaymasterprops) |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/api/PaymasterApi.ts:52](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L52)

___

### getOrCreate

▸ **getOrCreate**(`props`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`GetOrCreatePaymasterProps`](../README.md#getorcreatepaymasterprops) |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/api/PaymasterApi.ts:67](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/api/PaymasterApi.ts#L67)
