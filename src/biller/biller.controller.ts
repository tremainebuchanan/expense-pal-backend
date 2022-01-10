import { Controller, Get, Param, Query } from '@nestjs/common';
import { BillerService } from './biller.service';

@Controller('billers')
export class BillerController {
    constructor(private billerService: BillerService){}
    
    @Get('/:id')
    async show(@Query() q){
        const {cc, pc} = q;
        return await this.billerService.show(cc, pc);
    }
}
