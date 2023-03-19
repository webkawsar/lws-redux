import { createSlice } from '@reduxjs/toolkit';


// initial state
const initialState = {
    accessToken: null,
    user: null
}

// create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state, action) => {
            state.accessToken = null;
            state.user = null;
        },

    }
})

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
