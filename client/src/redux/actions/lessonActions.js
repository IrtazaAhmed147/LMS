import { lessonCreateSuccess, lessonFetchFailure, lessonFetchStart, lessonFetchSuccess, singlelessonSuccess } from "../slices/lessonSlice"
import api from '../../utils/common.js'

const token = localStorage.getItem('token')
export const getAlllesson = (query) => async (dispatch) => {
    try {
        dispatch(lessonFetchStart())
        const res = await api.get('/lesson', {
            params: {
                title: query?.title,
            }
        }, {
            withCredentials: true
        })
        console.log(res);

        dispatch(lessonFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}
export const getSpecificlesson = (id) => async (dispatch) => {
    console.log(id);

    try {
        dispatch(lessonFetchStart())
        const res = await api.get(`/lesson/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },

                withCredentials: true
            })
        console.log(res);

        dispatch(singlelessonSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}
export const getCourselesson = (id) => async (dispatch) => {

    try {
        dispatch(lessonFetchStart())
        const res = await api.get(`/lesson/course/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },

                withCredentials: true
            })
        console.log(res);

        dispatch(lessonFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const createLesson = (form) => async (dispatch) => {
    console.log(form);

    try {
        dispatch(lessonFetchStart())
        const res = await api.post('/lesson/add', form, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        dispatch(lessonCreateSuccess())
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const updatelesson = (form, token, id) => async (dispatch) => {
    try {
        dispatch(lessonFetchStart())
        const res = await api.put(`/lesson/update/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        dispatch(lessonCreateSuccess())
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
} 

export const deleteLesson = (token, id) => async (dispatch) => {
    try {
        dispatch(lessonFetchStart())
        const res = await api.delete(`/lesson/delete/${id}`,  {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        console.log(res);
        
        dispatch(lessonCreateSuccess())
        return res.data.message

    } catch (error) {
        console.log(error);

        dispatch(lessonFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}