export class TransactionDto {
  id: number;
  transactionType: string;
  transactionDescription: string;
  tokenAmount: number;
  sender: string;
  receiver: string;
  transactionTimeStamp: Date;
}
