import { Module } from '@nestjs/common';
import { BillerController } from './biller.controller';
import { BillerService } from './biller.service';

@Module({
  controllers: [BillerController],
  providers: [BillerService]
})
export class BillerModule {}
