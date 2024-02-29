export enum OperationStatus {
  PreparingTransaction = 'preparing-transaction',
  PreparingUserOperation = 'preparing-user-operation',
  SendingTransaction = 'sending-transaction',
  SendingUserOperation = 'sending-user-operation',
  WaitingForUserOperation = 'waiting-for-user-operation',
  GettingContractAddress = 'getting-contract-address',
}
