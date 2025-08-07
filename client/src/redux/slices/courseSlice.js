import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course:[],
    singleCourse: {},
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
        singleCourseSuccess: (state,{payload}) => {
            state.isLoading = false
            state.error = null
            state.singleCourse = payload
        },
        courseFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
    }
})

export const { courseFetchStart, courseFetchSuccess, courseFetchFailure, courseCreateSuccess, singleCourseSuccess} = courseSlice.actions
export default courseSlice.reducer