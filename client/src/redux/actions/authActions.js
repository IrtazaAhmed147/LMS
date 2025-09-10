import api from '../../utils/common.js'
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure } from "../slices/authSlice"


export const registerUser = (info) => async (dispatch) => {

    // const credentials = { ...info, role }


    try {
        dispatch(signupStart())
        const res = await api.post('/auth/signup', info, {
            withCredentials: true
        })

        localStorage.setItem('tempToken', res.data.data.token)
        if (res.data.success) {
            dispatch(signupSuccess())
        }
        return res.data.message
    } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {

            dispatch(signupFailure(error?.response?.data?.message))
            throw error.response.data.message
        } else {
            dispatch(signupFailure(error?.message))

            throw error.message
        }
    }
}
export const loginUser = (credentials, navigate) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const res = await api.post('/auth/login', credentials, {
            withCredentials: true
        });

        dispatch(loginSuccess(res?.data.data));
        localStorage.setItem("token", res?.data?.data?.token);

        return res.data.message;
    } catch (error) {
        console.log(error);

        const message = error?.response?.data?.message || error.message;

        // Handle OTP redirection
        if (error?.response?.data?.data?.redirectTo === "otp") {
            localStorage.setItem("tempToken", error?.response?.data?.data?.token);
            navigate('/otp');
        }

        dispatch(loginFailure(message));
        throw message;
    }
};
