import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideo } from './videoAPI';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    video: {},
    error: ''
}

// async thunk
export const fetchVideo = createAsyncThunk('video/fetchVideo', async(id) => {
    const video = await getVideo(id);
    return video;
})

// create slice
const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {

        builder
        .addCase(fetchVideo.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchVideo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.video = action.payload;
            state.error = '';
        })
        .addCase(fetchVideo.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.video = {};
            state.error = action.error.message;
        })
    }
});


export default videoSlice.reducer;

