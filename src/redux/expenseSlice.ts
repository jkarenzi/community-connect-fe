import { createSlice } from "@reduxjs/toolkit";
import { createExpense, updateExpense, deleteExpense, getExpenses } from "./actions/expenseActions";
import { Expense } from "../types/Expense";

interface IinitialState {
    expenses: Expense[],
    isLoading: boolean,
    isFetchingExpenses: boolean,
    status: 'idle'|'successful'|'failed'
}


const expenseSlice = createSlice({
    name:'expense',
    initialState: {
        expenses:[],
        isLoading: false,
        isFetchingExpenses: false,
        status: 'idle'
    } as IinitialState,
    reducers:{
        resetStatus: (state) => {
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createExpense.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createExpense.fulfilled, (state, action) => {
            state.expenses.splice(0,0, action.payload)
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(createExpense.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
        .addCase(getExpenses.pending, (state) => {
            state.isFetchingExpenses = true
        })
        .addCase(getExpenses.fulfilled, (state, action) => {
            state.expenses = action.payload
            state.isFetchingExpenses = false
        })
        .addCase(getExpenses.rejected, (state, action) => {
            state.isFetchingExpenses = false
            alert(action.payload)
        })
        .addCase(updateExpense.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.map((expense) => {
                if(expense.id === action.payload.id){
                    return action.payload
                }else{
                    return expense
                }
            })
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(updateExpense.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
        .addCase(deleteExpense.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteExpense.fulfilled, (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload)
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(deleteExpense.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
    }
})

export const {resetStatus} = expenseSlice.actions
export default expenseSlice.reducer