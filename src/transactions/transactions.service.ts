import { Injectable } from '@nestjs/common';
import { Transaction } from './transactions.model';
import { TransactionDto } from './dto/transcation.dto';

@Injectable()
export class TransactionsService {
  async getAllTransactions() {
    const transactions = await Transaction.findAll();
    return transactions;
  }

  async getTransactionById(id: number) {
    try {
      const transaction = await Transaction.findByPk(id);
      return transaction;
    } catch (e) {
      console.log(e);
    }
  }

  async createTransaction(transaction: TransactionDto) {
    try {
      const newTransaction = await Transaction.create({ ...transaction });
      return newTransaction;
    } catch (e) {
      console.log(e);
    }
  }
}
