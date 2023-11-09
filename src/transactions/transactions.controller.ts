import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transcation.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@UseGuards(AuthGuardService)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get(':id')
  getTransactionById(@Param('id') id: number) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  createTransaction(@Body() transaction: TransactionDto) {
    return this.transactionsService.createTransaction(transaction);
  }
}
