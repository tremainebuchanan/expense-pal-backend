export interface Expense{
    id:string;
    title:string;
    description:string;
    status: ExpenseStatus
}

export enum ExpenseStatus{
    PAID = 'PAID',
    PENDING = 'PENDING',
    PAST_DUE = 'PAST_DUE'
}
