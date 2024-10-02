import { Expense } from "./Expense"

export interface Category {
    id: number,
    name: string,
    limit: number | null,
    expenses: Expense[]
    createdAt: string,
    updatedAt: string,
    totalExpenses: number
}

export interface categoryFormData {
    name: string,
    limit: number | null
}

export interface ICategoryFormData {
    id: number,
    formData: categoryFormData
}