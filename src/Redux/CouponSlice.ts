import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";

export interface CouponState {
    value: Coupon[];
}

const initState: CouponState = {
    value: []
}

export const couponSlice = createSlice({
    name : "coupons",
    initialState: initState,
    reducers: {
        fill: (state, action: PayloadAction<Coupon[]>) => {
            state.value = action.payload;
        },
        add:(state, action: PayloadAction<Coupon>) => {
            state.value.push(action.payload)
        },
        remove: (state, action: PayloadAction<any>) =>{
            const indexToDelete = state.value.findIndex(e=> e.id == action.payload);
            if (indexToDelete >= 0)
            state.value.splice(indexToDelete, 1)
        },
        update: (state, action: PayloadAction<Coupon>) =>{
            const indexToUpdate = state.value.findIndex(e => e.id == action.payload.id);
            if (indexToUpdate >= 0)
            state.value[indexToUpdate] = action.payload;
        }
    }
})

export const {fill, add, remove, update} = couponSlice.actions;
export default couponSlice.reducer;