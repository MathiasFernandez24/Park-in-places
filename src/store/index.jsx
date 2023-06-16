import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./slices/LocationSlice";

export const store = configureStore({
    reducer: {
        location: LocationReducer
    }
})