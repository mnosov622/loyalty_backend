import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { SessionsService } from '@/sessions/sessions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, SessionsService],
})
export class TransactionsModule {}
