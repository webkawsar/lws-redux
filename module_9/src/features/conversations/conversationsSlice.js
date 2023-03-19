import { createSlice } from '@reduxjs/toolkit';


// initial state
const initialState = {}

// create slice
const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {

    }
})

export default conversationsSlice.reducer;
export const { } = conversationsSlice.actions;
