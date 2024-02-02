import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setCurrentUser: (state, payload) => {
            state.value = payload.payload;
        },
        removeCurrentUser: (state) => {
            state.value = null;
        }
    }
})

export default authSlice.reducer;
export const { setCurrentUser, removeCurrentUser } = authSlice.actions;