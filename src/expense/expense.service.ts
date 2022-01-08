import { Injectable } from '@nestjs/common';
import {Expense, ExpenseStatus} from './expense.model';
import {v4 as uuid } from 'uuid';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseFilterDto } from './dto/filter-expense.dto';
@Injectable()
export class ExpenseService {
    private expenses: Expense[] = [];

    public index(filterDto: ExpenseFilterDto): Expense[] {
        if(Object.keys(filterDto).length == 0) return this.expenses;
        const {status, search} = filterDto;
        let expenses = this.expenses;
        if(status){
            expenses = expenses.filter((expense) => expense.status === status);
        }
        if(search){
            expenses = expenses.filter((expense) =>{
                if(expense.title.toLowerCase().includes(search.toLowerCase()) || expense.description.toLowerCase().includes(search.toLowerCase())){
                    return true;
                }
                return false;
                
            })
        }
        return expenses;
    }

    public remove(id: string): void{
        this.expenses = this.expenses.filter((expense) => expense.id != id);
    }

    public update(id:string, status:ExpenseStatus): Expense{
        let expense = this.showById(id)
        expense.status = status;
        return expense;
    }

    public showById(id: string): Expense {
        return this.expenses.find((expense) => expense.id === id);
    }

    public create(expenseDto: CreateExpenseDto): Expense {
        const {title, description } = expenseDto;
        const expense: Expense = {
            id: uuid(),
            title,
            description,
            status: ExpenseStatus.PENDING
        }
        this.expenses.push(expense);
        return expense;
    }
}
