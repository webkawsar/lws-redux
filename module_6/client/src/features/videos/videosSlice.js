import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideos } from './videosAPI';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    videos: [],
    error: ''
}

// async thunk
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async({tags, search}) => {
    const videos = await getVideos(tags, search);
    return videos;
})

// create slice
const videosSlice = createSlice({
    name: 'videos',
    initialState,
    extraReducers: (builder) => {

        builder
        .addCase(fetchVideos.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.videos = action.payload;
            state.error = '';
        })
        .addCase(fetchVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.videos = [];
            state.error = action.error.message;
        })
    }
});


export default videosSlice.reducer;

