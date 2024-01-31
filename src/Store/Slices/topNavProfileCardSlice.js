import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

const topNavProfileCardSlice = createSlice({
    name: "top_nav_profile_card_state_slice",
    initialState,
    reducers: {
        toggleProfileCardState: (state) => {
            state.value = !state.value;
        },
        showProfileCard: (state) => {
            state.value = true;
        },
        removeProfileCard: (state) => {
            state.value = false;
        }
    }
})

export const {toggleProfileCardState, showProfileCard, removeProfileCard} = topNavProfileCardSlice.actions;
export default topNavProfileCardSlice.reducer;