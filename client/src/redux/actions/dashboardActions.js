import api from '../../utils/common.js'
import { statFetchFailure, statFetchStart, statFetchSuccess } from '../slices/dashboardSlice.js'
export const getDashboardStats = () => async (dispatch) => {

    try {
        dispatch(statFetchStart())

        const res = await api.get('/dashboard/stat', {
            withCredentials: true
        })

        dispatch(statFetchSuccess(res?.data.data))
        return res.data.message
    } catch (error) {
        console.log(error);

        dispatch(statFetchFailure(error.response.data.message))
        throw error.response.data.message
    }
}