import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    course:[],
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
        courseFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
    }
})

export const { courseFetchStart, courseFetchSuccess, courseFetchFailure, courseCreateSuccess, } = courseSlice.actions
export default courseSlice.reducer