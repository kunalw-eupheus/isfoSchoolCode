import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const AuthState = {
    user: Cookies.get("token") || null,

}

const authSlice = createSlice({
    name: "authentication",
    initialState: AuthState,
    reducers: {
        user(state: any) {
            state.user = Cookies.get("token") || null
        }
    }
})

export const authAction = authSlice.actions;
export default authSlice.reducer;