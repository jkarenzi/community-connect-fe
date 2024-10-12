import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode'
import { authFormData, User } from "../types/Auth";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";
import { errorToast, successToast } from "../services/toast";

export const login = createAsyncThunk<ApiResponse, authFormData>('auth/login', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/login', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const signUp = createAsyncThunk<ApiResponse, authFormData>('auth/signUp', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/signUp', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})


interface IinitialState {
    token: string,
    user: User | null,
    isLoggingIn: boolean,
    isSigningUp: boolean,
    loginStatus: 'idle'|'successful'|'failed',
    signUpStatus: 'idle'|'successful'|'failed'
}

let decodedUser:User|null = null;
let decodedToken:string = "";
const tokenFromStorage = localStorage.getItem('token')
if(tokenFromStorage){
    const payload = jwtDecode<decodedToken>(tokenFromStorage) 
    decodedToken = tokenFromStorage
    decodedUser =payload.user
}

interface decodedToken {
    user: User
}

const authSlice = createSlice({
    name:'auth',
    initialState: {
        token: decodedToken,
        user: decodedUser,
        isLoggingIn: false,
        isSigningUp: false,
        loginStatus: 'idle',
        signUpStatus: 'idle'
    } as IinitialState,
    reducers:{
        resetLoginStatus: (state) => {
            state.loginStatus = 'idle'
        },
        resetSignUpStatus: (state) => {
            state.signUpStatus = 'idle'
        },
        logout: (state) => {
            localStorage.removeItem('token')
            state.token = ''
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoggingIn = true
        })
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.token)
            state.token = action.payload.token
            state.user = jwtDecode<decodedToken>(action.payload.token).user
            state.isLoggingIn = false
            state.loginStatus = 'successful'
            successToast('Login successful')
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggingIn = false
            state.loginStatus = 'failed'
            errorToast(action.payload as string)
        })
        .addCase(signUp.pending, (state) => {
            state.isSigningUp = true
        })
        .addCase(signUp.fulfilled, (state) => {
            state.isSigningUp = false
            state.signUpStatus = 'successful'
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isSigningUp = false
            state.signUpStatus = 'failed'
            errorToast(action.payload as string)
        })
    }
})


export const {resetLoginStatus, resetSignUpStatus, logout} = authSlice.actions
export default authSlice.reducer