import { courseCreateSuccess, courseFetchFailure, courseFetchStart, courseFetchSuccess, singleCourseSuccess } from "../slices/courseSlice"
import api from '../../utils/common.js'


export const getAllCourse = (query) => async (dispatch) => {
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

        dispatch(courseFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}
export const getSpecificCourse = (id, token) => async (dispatch) => {
    console.log(id);
    
    try {
        dispatch(courseFetchStart())
        const res = await api.get(`/course/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },

                withCredentials: true
            })
        console.log(res);

        dispatch(singleCourseSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const createCourse = (form, token) => async (dispatch) => {
    try {
        dispatch(courseFetchStart())
        const res = await api.post('/course/add', form, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        dispatch(courseCreateSuccess())
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const updateCourse = (form, token, id) => async (dispatch) => {
    try {
        dispatch(courseFetchStart())
        const res = await api.put(`/course/update/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        dispatch(courseCreateSuccess())
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
} 