import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course: [],
    enrolledCourses: [],
    teacherCourses: [],
    singleCourse: {},
    language: [],
    categories: [],
    isLoading: false,
    error: false,
}
const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        courseFetchStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        courseFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.course = payload
        },
        courseCreateSuccess: (state,) => {
            state.isLoading = false
            state.error = null
        },
        enrolledCourseSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.enrolledCourses = payload
        },
        teacherCourseSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.teacherCourses = payload
        },
        singleCourseSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.singleCourse = payload
        },
        courseFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error);
            
        },
        updateLanguage: (state, {payload})=> {
            state.language = payload
        },
        updateCategories: (state, {payload})=> {
            state.categories = payload
        }

    }
})

export const { courseFetchStart, courseFetchSuccess, courseFetchFailure, courseCreateSuccess, singleCourseSuccess ,enrolledCourseSuccess,updateLanguage,updateCategories,teacherCourseSuccess} = courseSlice.actions
export default courseSlice.reducer