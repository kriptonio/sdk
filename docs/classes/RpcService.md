[@kriptonio/sdk](../README.md) / RpcService

# Class: RpcService

## Table of contents

### Constructors

- [constructor](RpcService.md#constructor)

### Properties

- [#apiClient](RpcService.md##apiclient)
- [#rpcApi](RpcService.md##rpcapi)

### Methods

- [create](RpcService.md#create)
- [get](RpcService.md#get)
- [getOrCreate](RpcService.md#getorcreate)

## Constructors

### constructor

• **new RpcService**(`apiClient`): [`RpcService`](RpcService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiClient` | `ApiClient` |

#### Returns

[`RpcService`](RpcService.md)

#### Defined in

[src/service/RpcService.ts:9](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L9)

## Properties

### #apiClient

• `Private` **#apiClient**: `ApiClient`

#### Defined in

[src/service/RpcService.ts:6](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L6)

___

### #rpcApi

• `Private` **#rpcApi**: `RpcApi`

#### Defined in

[src/service/RpcService.ts:7](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L7)

## Methods

### create

▸ **create**(`data`): `Promise`\<`RpcDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `CreateBlockchainEndpointBody` |

#### Returns

`Promise`\<`RpcDto`\>

#### Defined in

[src/service/RpcService.ts:14](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L14)

___

### get

▸ **get**(`id`): `Promise`\<`RpcDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`\<`RpcDto`\>

#### Defined in

[src/service/RpcService.ts:18](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L18)

___

### getOrCreate

▸ **getOrCreate**(`params`): `Promise`\<`RpcDto`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Omit`\<`GetOrCreateParams`, ``"organizationId"``\> |

#### Returns

`Promise`\<`RpcDto`\>

#### Defined in

[src/service/RpcService.ts:22](https://github.com/kriptonio/js-sdk/blob/1c33c1b/src/service/RpcService.ts#L22)
