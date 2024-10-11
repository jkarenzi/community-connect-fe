import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import serviceReducer from './serviceSlice'
import reviewReducer from './reviewSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        service: serviceReducer,
        review: reviewReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store