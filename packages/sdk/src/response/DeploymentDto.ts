import { Hex } from 'viem';
import { TransactionDto } from './TransactionDto';

export interface DeploymentDto {
  id: string;
  address: Hex;
  deployer: Hex;
  transaction?: TransactionDto;
}
