import { configureStore } from "@reduxjs/toolkit";
import sideNavReducer from "./Slices/sideNavSlice";
import topNavProfileState from "./Slices/topNavProfileCardSlice";


export const store = configureStore({
    reducer: {
        sideNavReducer,
        topNavProfileState
    }
})