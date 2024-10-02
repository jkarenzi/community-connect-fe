import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../services/api'
import { Category, categoryFormData, ICategoryFormData } from "../../types/Category";

export const createCategory = createAsyncThunk<Category, categoryFormData>('category/create', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('category', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }

})

export const getCategories = createAsyncThunk<Category[]>('category/getAll', async(_, thunkAPI) => {
    try{
        const response = await axios.get('category')
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateCategory = createAsyncThunk<Category, ICategoryFormData>('category/update', async({formData, id}, thunkAPI) => {
    try{
        const response = await axios.patch(`category/${id}`, formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteCategory = createAsyncThunk<number, number>('category/delete', async(id, thunkAPI) => {
    try{
        await axios.delete(`category/${id}`)
        return id
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})