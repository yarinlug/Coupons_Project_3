import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./AuthSlice";
import { companySlice } from "./CompanySlice";
import { couponSlice } from "./CouponSlice";


export const authStore = configureStore({
    reducer : authSlice.reducer
})

export const companyStore = configureStore({
    reducer : companySlice.reducer
})

export const couponStore = configureStore({
    reducer: couponSlice.reducer
})

export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch