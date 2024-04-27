import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLogedIn: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLogedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;