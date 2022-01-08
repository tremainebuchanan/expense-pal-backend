import { ExpenseStatus } from "../expense.model";

export class ExpenseFilterDto{
    status?: ExpenseStatus;
    search?: string;
}