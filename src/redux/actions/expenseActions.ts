import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../services/api'
import { Expense, expenseFormData, IExpenseFormData, IQuery } from "../../types/Expense";

export const createExpense = createAsyncThunk<Expense, expenseFormData>('expense/create', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('expense', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }

})

export const getExpenses = createAsyncThunk<Expense[], IQuery>('expense/getAll', async({categoryQuery, dateQuery}, thunkAPI) => {
    try{
        const response = await axios.get('expense', {
            params:{
                categories: categoryQuery,
                from: dateQuery?.from,
                to: dateQuery?.to
            }
        })
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateExpense = createAsyncThunk<Expense, IExpenseFormData>('expense/update', async({formData, id}, thunkAPI) => {
    try{
        const response = await axios.patch(`expense/${id}`, formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteExpense = createAsyncThunk<number, number>('expense/delete', async(id, thunkAPI) => {
    try{
        await axios.delete(`expense/${id}`)
        return id
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})