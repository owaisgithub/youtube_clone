import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    tokens: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.tokens = action.payload.tokens;
            localStorage.setItem('accessToken', JSON.stringify(action.payload.tokens.accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(action.payload.tokens.refreshToken));
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.tokens = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }

        
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;