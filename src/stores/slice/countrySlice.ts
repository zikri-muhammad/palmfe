import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import axios from "@/lib/axios";
import { initialCountry } from "@/types/country.interface";
import { API_URL } from "@/constant/apiUrl";


const countrySlice = createSlice({
    name: "countrySlice",
    initialState: initialCountry,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setCountry(state, { payload }) {
            state.source = payload.source
            state.loading = false
        }
    }
})

export const getCountry = createAsyncThunk<any, void, { dispatch: AppDispatch, state: RootState }>(
    "country/api",
    async (_, { dispatch, getState }) => {
        const state = getState()
        if (state.country?.source?.length > 0) return
        dispatch(setLoading(true))
        return axios.get(API_URL.country).then(({ data }) => {
            dispatch(setCountry({
                source: data.data
            }))
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
)

export const { setCountry, setLoading } = countrySlice.actions
export default countrySlice.reducer