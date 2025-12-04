import { configureStore } from "@reduxjs/toolkit";
import { curdApi } from "./Slices/crudSlice";
import { AuthSlice } from "./Slices/authSlice"


export const store = configureStore({
    reducer: {
        [curdApi.reducerPath]: curdApi.reducer,
        [AuthSlice.reducerPath]: AuthSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(curdApi.middleware).concat(AuthSlice.middleware),
    devTools: true
})