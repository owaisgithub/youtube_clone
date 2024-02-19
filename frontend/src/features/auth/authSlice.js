import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    // user: null,
    // accessToken: null,
    // refreshToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            const { accessToken, refreshToken, user, tokenExpiry, userAvatar } = action.payload
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', user);
            localStorage.setItem('tokenExpiry', tokenExpiry);
            localStorage.setItem('userAvatar', userAvatar);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiry');
            localStorage.removeItem('userAvatar');
        }

        
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;