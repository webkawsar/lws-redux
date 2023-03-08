import { configureStore } from '@reduxjs/toolkit';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosSliceReducer,
  },
});
