import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseService {
    private expenses = [];

    public index(){
        return this.expenses;
    }
}
