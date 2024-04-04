[@kriptonio/sdk](../README.md) / KriptonioError

# Class: KriptonioError

## Hierarchy

- `Error`

  ↳ **`KriptonioError`**

## Table of contents

### Constructors

- [constructor](KriptonioError.md#constructor)

### Properties

- [cause](KriptonioError.md#cause)
- [code](KriptonioError.md#code)
- [message](KriptonioError.md#message)
- [name](KriptonioError.md#name)
- [stack](KriptonioError.md#stack)
- [prepareStackTrace](KriptonioError.md#preparestacktrace)
- [stackTraceLimit](KriptonioError.md#stacktracelimit)

### Methods

- [captureStackTrace](KriptonioError.md#capturestacktrace)
- [fromJsonRpcError](KriptonioError.md#fromjsonrpcerror)

## Constructors

### constructor

• **new KriptonioError**(`error`): [`KriptonioError`](KriptonioError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `ErrorInfo` |

#### Returns

[`KriptonioError`](KriptonioError.md)

#### Overrides

Error.constructor

#### Defined in

[src/Error.ts:21](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Error.ts#L21)

## Properties

### cause

• `Optional` **cause**: [`KriptonioError`](KriptonioError.md) \| `BaseError`

#### Overrides

Error.cause

#### Defined in

[src/Error.ts:19](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Error.ts#L19)

___

### code

• `Optional` **code**: `number`

#### Defined in

[src/Error.ts:18](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Error.ts#L18)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21

___

### fromJsonRpcError

▸ **fromJsonRpcError**(`error`): ``null`` \| [`KriptonioError`](KriptonioError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| `RpcError` |

#### Returns

``null`` \| [`KriptonioError`](KriptonioError.md)

#### Defined in

[src/Error.ts:33](https://github.com/kriptonio/sdk/blob/d5dd03e/packages/sdk/src/Error.ts#L33)
