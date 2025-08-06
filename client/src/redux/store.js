import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
    }
})

export default store