import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { BillerModule } from './biller/biller.module';

@Module({
  imports: [ExpenseModule, BillerModule],
})
export class AppModule {}
