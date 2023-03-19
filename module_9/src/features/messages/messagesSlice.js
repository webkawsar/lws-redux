import { createSlice } from '@reduxjs/toolkit';


// initial state
const initialState = {}

// create slice
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    }
})

export default messagesSlice.reducer;
export const { } = messagesSlice.actions;
