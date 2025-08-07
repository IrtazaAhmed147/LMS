import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import lessonSlice from './slices/lessonSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        lesson: lessonSlice,
    }
})

export default store