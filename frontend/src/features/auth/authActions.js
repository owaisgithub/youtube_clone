import axiosInstance from '../../api/axios';
import { login, logout} from '../auth/authSlice';

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/users/authenticate', {
            username,
            password
        });
        console.log(response.data);
        const data = response.data.data
        dispatch(login({ userData: data }));
        alert("Logged in successfully");
        return true;
    } catch (error) {
        console.log(error);
        alert("Failed to login: " + error.message);
    }
}


export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/users/logout');
        dispatch(logout());
    } catch (error) {
        console.log(error);
    }
}