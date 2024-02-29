import { TransactionStatus } from '../types/api/transactionStatus';

export interface TransactionDto {
  hash: string;
  address: string;
  status?: TransactionStatus;
}
