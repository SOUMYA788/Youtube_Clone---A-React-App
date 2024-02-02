import { configureStore } from "@reduxjs/toolkit";
import sideNavReducer from "./Slices/sideNavSlice";
import topNavProfileState from "./Slices/topNavProfileCardSlice";
import authState from "./Slices/authSlice";

export const store = configureStore({
    reducer: {
        authState,
        sideNavReducer,
        topNavProfileState
    }
})