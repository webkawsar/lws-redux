import { configureStore } from '@reduxjs/toolkit';
import tagsSliceReducer from '../features/tags/tagsSlice';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosSliceReducer,
    tags: tagsSliceReducer
  },
});
