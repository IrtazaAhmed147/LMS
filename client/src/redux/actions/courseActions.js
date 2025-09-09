import { courseCreateSuccess, courseFetchFailure, courseFetchStart, courseFetchSuccess, enrolledCourseSuccess, singleCourseSuccess, teacherCourseSuccess } from "../slices/courseSlice"
import api from '../../utils/common.js'


export const getAllCourse = (query) => async (dispatch) => {
    console.log(query);

    try {
        dispatch(courseFetchStart())
        const res = await api.get('/course', {
            params: {
                title: query?.title,
                // language: JSON.stringify(query?.language),
                language: JSON.stringify(query?.language),
                categories: JSON.stringify(query?.category),
                sortBy: query?.sortBy,
                limit:query?.limit
            }
            ,
            withCredentials: true
        })
        console.log(res);

        dispatch(courseFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        dispatch(courseFetchFailure(error.message))
        

        throw error.message
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
        dispatch(courseFetchFailure(error.response.data.message))
        console.log(error);

        throw error.response.data.message
    }
}
export const getTeacherCourses = (id, token) => async (dispatch) => {
    console.log(id);

    try {
        dispatch(courseFetchStart())
        const res = await api.get(`/course/teacher/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },

                withCredentials: true
            })
        console.log(res);

        dispatch(teacherCourseSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        dispatch(courseFetchFailure(error.response.data.message))
        console.log(error);

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
        dispatch(courseFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}
export const updateCourse = (form, token, id) => async (dispatch) => {
    console.log([...form]);
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
        dispatch(courseFetchFailure(error.response.data.message))
        console.log(error);

        throw error.response.data.message
    }
}
export const deleteCourse = (token, id) => async (dispatch) => {
    try {
        dispatch(courseFetchStart())
        const res = await api.delete(`/course/delete/${id}`,  {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        console.log(res);
        
        dispatch(courseCreateSuccess())
        return res.data.message

    } catch (error) {
        dispatch(courseFetchFailure(error.response.data.message))
        

        throw error.response.data.message
    }
}

export const getEnrolledCourses = (token) => async (dispatch) => {
    try {
        console.log(token);
        

        dispatch(courseFetchStart())
        const res = await api.get(`/course/enrolled`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true
        })
        console.log(res.data.data);

        dispatch(enrolledCourseSuccess(res.data.data))
        return res.data

    } catch (error) {
        dispatch(courseFetchFailure(error?.message))
        throw error.response.data.message
    }
}