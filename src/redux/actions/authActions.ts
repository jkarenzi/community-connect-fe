import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../services/api'
import { authFormData, signUpFormData } from "../../types/Auth";
import { ApiResponse } from "../../types/ApiResponse";

export const login = createAsyncThunk<ApiResponse, authFormData>('auth/login', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/login', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const signUp = createAsyncThunk<ApiResponse, signUpFormData>('auth/signUp', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/signUp', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})