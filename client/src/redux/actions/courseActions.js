import { courseCreateSuccess, courseFetchFailure, courseFetchStart, courseFetchSuccess } from "../slices/courseSlice"
import api from '../../utils/common.js'
export const getAllCourse = (query) => async (dispatch) => {

    console.log(query);

    try {
        dispatch(courseFetchStart())

        const res = await api.get('/course', {
            params: {
                title: query?.title,
            }
        }, {
            withCredentials: true
        })
        console.log(res);

        dispatch(courseCreateSuccess())
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const createCourse = (form, token) => async (dispatch) => {
    console.log(form);
    
    try {
        dispatch(courseFetchStart())

        const res = await api.post('/course/add', form,{

            headers: { 

                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })


        console.log(res);

        dispatch(courseFetchSuccess(res?.data.data))
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
} 