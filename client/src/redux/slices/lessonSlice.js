import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    lessons:[],
    singlelesson: {},
    isLoading: false,
    error: false,
}
const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        lessonFetchStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        lessonFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.lessons = payload
        },
        lessonCreateSuccess: (state,) => {
            state.isLoading = false
            state.error = null
        },
        singlelessonSuccess: (state,{payload}) => {
            state.isLoading = false
            state.error = null
            state.singlelesson = payload
        },
        lessonFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
    }
})

export const { lessonFetchStart, lessonFetchSuccess, lessonFetchFailure, lessonCreateSuccess, singlelessonSuccess} = lessonSlice.actions
export default lessonSlice.reducer