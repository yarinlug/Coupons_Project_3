import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import User from "../Models/User"
import { jwtDecode } from "jwt-decode"

export interface AuthState {
    user: User
    token: string
}

const initState: AuthState = {
    user: sessionStorage.getItem("token")? jwtDecode(sessionStorage.getItem("token")): null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
}
export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            sessionStorage.setItem("token", state.token)
            state.user = jwtDecode(action.payload)
        },

        logout: (state) => {
            state.token = "";
            state.user = null;
            sessionStorage.removeItem("token")
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;