import { Category } from "./Category";

export interface Expense {
    id: number,
    description: string,
    amount: number,
    category: Category,
    date: string,
    createdAt: string,
    updatedAt: string
}

export interface expenseFormData {
    description:string,
    amount:number,
    categoryId: number,
    date: Date
}

export interface IExpenseFormData {
    id:number,
    formData: expenseFormData
}

export interface dateFormData {
    from: Date,
    to: Date | null
}

export interface IQuery {
    categoryQuery?: number[] 
    dateQuery?: dateFormData
}