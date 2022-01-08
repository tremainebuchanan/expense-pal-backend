import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { throws } from 'assert';
import { title } from 'process';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseFilterDto } from './dto/filter-expense.dto';
import { Expense, ExpenseStatus } from './expense.model';
import { ExpenseService } from './expense.service';


@Controller('expenses')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}
    
    @Get()
    index(@Query() filterDto: ExpenseFilterDto): Expense[] {
        return this.expenseService.index(filterDto);
    }  

    @Delete("/:id")
    remove(@Param('id') id: string): void {
        this.expenseService.remove(id);
    }

    @Post()
    create(@Body() expenseDto: CreateExpenseDto): Expense {
        return this.expenseService.create(expenseDto);
    }

    @Get("/:id")
    showById(@Param('id') id:string){
        return this.expenseService.showById(id);
    }

    @Patch("/:id/status")
    update(@Param('id') id:string, @Body('status') status:ExpenseStatus): Expense {
        return this.expenseService.update(id, status);
    }
    
}
