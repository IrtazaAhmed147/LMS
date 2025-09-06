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
        
        dispatch(signupFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const loginUser = (credentials) => async (dispatch) => {

    try {
        dispatch(loginStart())

        const res = await api.post('/auth/login', credentials, {
            withCredentials: true
        })

        dispatch(loginSuccess(res?.data.data))
        localStorage.setItem("token", res?.data?.token)
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(loginFailure(error.response.data.message))
        throw error.response.data.message
    }
}