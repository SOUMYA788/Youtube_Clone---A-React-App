import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}

const sideNavSlice = createSlice({
    name: "sidenav",
    initialState,
    reducers: {
        toggleSideNav: (state) => {
            state.value = !state.value
        },
        showSideNav: (state) => {
            state.value = true;
        },
        hideSideNav: (state) => {
            state.value = false;
        }
    }
})

export const {toggleSideNav, showSideNav, hideSideNav} = sideNavSlice.actions;
export default sideNavSlice.reducer;