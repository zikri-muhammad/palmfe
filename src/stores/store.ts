import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import bookSlice from "./slice/bookSlice";
import countrySlice from "./slice/countrySlice";

export const store = configureStore({
    reducer: {
        book: bookSlice,
        country: countrySlice
    }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch