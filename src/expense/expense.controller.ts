import { Controller, Get } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}
    
    @Get()
    index(){
        return this.expenseService.index()
    }   
}
