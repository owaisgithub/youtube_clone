import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

// Retrieve the stored state from localStorage
// const storedState = localStorage.getItem('reduxState');

// Parse the stored state or set it to an empty object if undefined
// const preloadedState = storedState ? storedState : {};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // preloadedState
});

// store.subscribe(() => {
//     const stateToStore = store.getState();
//     localStorage.setItem('reduxState', stateToStore);
// })

export default store