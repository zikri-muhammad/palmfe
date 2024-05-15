import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import axios from "@/lib/axios";
import { initialBook } from "@/types/book.interface";
import { API_URL } from "@/constant/apiUrl";
import formData from "@/lib/formdata";

const bookSlice = createSlice({
    name: "bookSlice",
    initialState: initialBook,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload
        },
        setBook(state, { payload }) {
            state.payload = {
                ...state.payload,
                ...payload
            }
        },
        setSuccessBook(state, { payload }) {
            state.success = payload
        },
        setErrorBook(state, { payload }) {
            state.error = payload
        }
    }
})

export const addBook = createAsyncThunk<any, void, { dispatch: AppDispatch, state: RootState }>(
    "add/book",
    async (_, { dispatch, rejectWithValue, getState }) => {
        const state = getState()
        dispatch(setLoading(true))
        return axios.post(API_URL.book, state.book.payload).then(({ data }) => {
            if (data.success) {
                dispatch(setSuccessBook(data.data))
                return data
            } else {
                dispatch(setErrorBook(data.data))
            }
        }).catch((error) => {
            return rejectWithValue(error.response.data || error.message)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }
)

export const addFile = createAsyncThunk<any, any, { dispatch: AppDispatch, state: RootState }>(
    "add/file",
    async (document, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true))
        return axios.post(API_URL.document, formData(document)).then(({ data }) => {
            return data
        }).catch((error) => {
            return rejectWithValue(error.response.data || error.message)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

)

export const { setBook, setLoading, setSuccessBook, setErrorBook } = bookSlice.actions
export default bookSlice.reducer