import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetchStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        userFetchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.users = payload
        },
        userFetchFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})

export const { userFetchStart, userFetchSuccess, userFetchFailure } = userSlice.actions
export default userSlice.reducer