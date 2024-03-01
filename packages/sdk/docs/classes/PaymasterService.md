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

[src/service/PaymasterService.ts:13](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L13)

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

[src/service/PaymasterService.ts:10](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L10)

___

### #paymasterApi

• `Private` **#paymasterApi**: [`PaymasterApi`](PaymasterApi.md)

#### Defined in

[src/service/PaymasterService.ts:11](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L11)

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

[src/service/PaymasterService.ts:18](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L18)

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

[src/service/PaymasterService.ts:22](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L22)

___

### getOrCreate

▸ **getOrCreate**(`props`): `Promise`\<`PaymasterDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`\<[`GetOrCreatePaymasterProps`](../README.md#getorcreatepaymasterprops), ``"organizationId"``\> |

#### Returns

`Promise`\<`PaymasterDto`\>

#### Defined in

[src/service/PaymasterService.ts:26](https://github.com/kriptonio/sdk/blob/631b409/packages/sdk/src/service/PaymasterService.ts#L26)
