import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTags } from './tagsAPI';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    tags: [],
    error: ''
}

// async thunk
export const fetchTags = createAsyncThunk('tags/fetchTags', async() => {
    const tags = await getTags();
    return tags;
})

// create slice
const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder) => {

        builder
        .addCase(fetchTags.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.tags = action.payload;
            state.error = '';
        })
        .addCase(fetchTags.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.tags = [];
            state.error = action.error.message;
        })
    }
});


export default tagsSlice.reducer;

