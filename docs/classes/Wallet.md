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

[src/wallet/Wallet.ts:43](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L43)

## Properties

### chain

• `Readonly` **chain**: `Chain`

#### Defined in

[src/wallet/Wallet.ts:43](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L43)

## Accessors

### address

• `get` **address**(): \`0x$\{string}\`

#### Returns

\`0x$\{string}\`

#### Defined in

[src/wallet/Wallet.ts:47](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L47)

___

### rpcUrl

• `get` **rpcUrl**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[src/wallet/Wallet.ts:45](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L45)

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

[src/wallet/Wallet.ts:68](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L68)

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

[src/wallet/Wallet.ts:59](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L59)

___

### export

▸ **export**(): [`ExportedWallet`](../README.md#exportedwallet)

#### Returns

[`ExportedWallet`](../README.md#exportedwallet)

#### Defined in

[src/wallet/Wallet.ts:55](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L55)

___

### getNonce

▸ **getNonce**(): `Promise`\<`bigint`\>

#### Returns

`Promise`\<`bigint`\>

#### Defined in

[src/wallet/Wallet.ts:49](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L49)

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

[src/wallet/Wallet.ts:63](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L63)

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

[src/wallet/Wallet.ts:53](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L53)

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

[src/wallet/Wallet.ts:51](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L51)

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

[src/wallet/Wallet.ts:57](https://github.com/kriptonio/sdk/blob/81ecf53/src/wallet/Wallet.ts#L57)
