import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    stats: {},
    statLoading: false,
    statError: false,
}
const dashboardSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        statFetchStart: (state) => {
            state.statLoading = true
            state.statError = null

        },
        statFetchSuccess: (state, { payload }) => {
            state.statLoading = false
            state.statError = null
            state.stats = payload
        },
        statFetchFailure: (state, action) => {
            state.statLoading = false;
            state.statError = action.payload;
        },
      
    }
})

export const { statFetchStart, statFetchSuccess, statFetchFailure } = dashboardSlice.actions
export default dashboardSlice.reducer