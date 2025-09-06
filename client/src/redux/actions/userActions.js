import { userFetchFailure, userFetchStart, userFetchSuccess } from "../slices/userSlice";
import api from '../../utils/common.js'

export const getAllUsers = (query) => async (dispatch) => {
    console.log(query);

    try {
        dispatch(userFetchStart())
        const res = await api.get('/user/', {
            params: {
                username: query?.username,
                email: query?.email,
                admin: query?.admin,
                createdCourses: JSON.stringify(query?.courses)
            }
            ,
            withCredentials: true
        })
        console.log(res);

        dispatch(userFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(userFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}