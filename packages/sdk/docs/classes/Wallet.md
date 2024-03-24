[@kriptonio/sdk](../README.md) / Wallet

# Class: Wallet

## Hierarchy

- **`Wallet`**

  ↳ [`EoaWallet`](EoaWallet.md)

## Table of contents

### Constructors

- [constructor](Wallet.md#constructor)

### Properties

- [chain](Wallet.md#chain)

### Accessors

- [address](Wallet.md#address)
- [rpcUrl](Wallet.md#rpcurl)

### Methods

- [deployContract](Wallet.md#deploycontract)
- [estimateGas](Wallet.md#estimategas)
- [export](Wallet.md#export)
- [getFeeData](Wallet.md#getfeedata)
- [getNonce](Wallet.md#getnonce)
- [sendTransaction](Wallet.md#sendtransaction)
- [signMessage](Wallet.md#signmessage)
- [signTransaction](Wallet.md#signtransaction)
- [signTypedData](Wallet.md#signtypeddata)

## Constructors

### constructor

• **new Wallet**(`chain`): [`Wallet`](Wallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chain` | `Chain` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[src/wallet/Wallet.ts:48](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L48)

## Properties

### chain

• `Readonly` **chain**: `Chain`

#### Defined in

[src/wallet/Wallet.ts:48](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L48)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Defined in

[src/wallet/Wallet.ts:52](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L52)

___

### rpcUrl

• `get` **rpcUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/wallet/Wallet.ts:50](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L50)

## Methods

### deployContract

▸ **deployContract**(`deploy`, `options?`): `Promise`\<[`DeployResponse`](../README.md#deployresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deploy` | [`DeployWallet`](../README.md#deploywallet) |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<[`DeployResponse`](../README.md#deployresponse)\>

#### Defined in

[src/wallet/Wallet.ts:75](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L75)

___

### estimateGas

▸ **estimateGas**(`tx`): `Promise`\<`bigint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `EstimateGasParameters`\<`Chain`\> |

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/wallet/Wallet.ts:66](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L66)

___

### export

▸ **export**(): [`ExportedWallet`](../README.md#exportedwallet)

#### Returns

[`ExportedWallet`](../README.md#exportedwallet)

#### Defined in

[src/wallet/Wallet.ts:60](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L60)

___

### getFeeData

▸ **getFeeData**(): `Promise`\<[`GasData`](../README.md#gasdata)\>

#### Returns

`Promise`\<[`GasData`](../README.md#gasdata)\>

#### Defined in

[src/wallet/Wallet.ts:64](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L64)

___

### getNonce

▸ **getNonce**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/wallet/Wallet.ts:54](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L54)

___

### sendTransaction

▸ **sendTransaction**(`tx`, `options?`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `SendTransactionParameters`\<`Chain`, `Account`\> |
| `options?` | [`OperationOptions`](../README.md#operationoptions) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/Wallet.ts:70](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L70)

___

### signMessage

▸ **signMessage**(`message`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`SignableMessage`](../README.md#signablemessage) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/Wallet.ts:58](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L58)

___

### signTransaction

▸ **signTransaction**(`tx`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionSerializable` |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/Wallet.ts:56](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L56)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`\<\`0x$\{string}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | [`TypedData`](../README.md#typeddata) |

#### Returns

`Promise`\<\`0x$\{string}\`\>

#### Defined in

[src/wallet/Wallet.ts:62](https://github.com/kriptonio/sdk/blob/f9a3148/packages/sdk/src/wallet/Wallet.ts#L62)
