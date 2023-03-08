import { configureStore } from '@reduxjs/toolkit';
import tagsSliceReducer from '../features/tags/tagsSlice';
import videoSliceReducer from '../features/video/videoSlice';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosSliceReducer,
    tags: tagsSliceReducer,
    video: videoSliceReducer
  },
});
