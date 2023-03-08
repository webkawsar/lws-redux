import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRelatedVideos } from './relatedVideosAPI';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    videos: [],
    error: ''
}

// async thunk
export const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchRelatedVideos', async({id, tags}) => {
    const relatedVideos = await getRelatedVideos({id, tags});
    return relatedVideos;
})

// create slice
const relatedVideosSlice = createSlice({
    name: 'relatedVideos',
    initialState,
    extraReducers: (builder) => {

        builder
        .addCase(fetchRelatedVideos.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.videos = action.payload;
            state.error = '';
        })
        .addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.videos = [];
            state.error = action.error.message;
        })
    }
});


export default relatedVideosSlice.reducer;

