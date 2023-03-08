import { configureStore } from '@reduxjs/toolkit';
import filterSliceReducer from '../features/filter/filterSlice';
import relatedVideosSliceReducer from '../features/relatedVideos/relatedVideosSlice';
import tagsSliceReducer from '../features/tags/tagsSlice';
import videoSliceReducer from '../features/video/videoSlice';
import videosSliceReducer from '../features/videos/videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosSliceReducer,
    tags: tagsSliceReducer,
    video: videoSliceReducer,
    relatedVideos: relatedVideosSliceReducer,
    filter: filterSliceReducer
  },
});
