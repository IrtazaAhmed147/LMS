import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import lessonSlice from './slices/lessonSlice'
import dashboardSlice from './slices/dashboardSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        lesson: lessonSlice,
        dashboard: dashboardSlice,
        user:userSlice,
    }
})

export default store