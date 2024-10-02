import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types/Category";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./actions/categoryActions";

interface IinitialState {
    categories: Category[],
    isLoading: boolean,
    isFetchingCategories: boolean,
    status: 'idle'|'successful'|'failed'
}


const categorySlice = createSlice({
    name:'category',
    initialState: {
        categories: [],
        isLoading: false,
        isFetchingCategories: false,
        status: 'idle'
    } as IinitialState,
    reducers:{
        resetStatus: (state) => {
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.categories.splice(0,0, action.payload)
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
        .addCase(getCategories.pending, (state) => {
            state.isFetchingCategories = true
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.isFetchingCategories = false
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.isFetchingCategories = false
            alert(action.payload)
        })
        .addCase(updateCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories.map((category) => {
                if(category.id === action.payload.id){
                    return action.payload
                }else{
                    return category
                }
            })
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
        .addCase(deleteCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload)
            state.isLoading = false
            state.status = 'successful'
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false
            state.status = 'failed'
            alert(action.payload)
        })
    }
})


export const {resetStatus} = categorySlice.actions
export default categorySlice.reducer