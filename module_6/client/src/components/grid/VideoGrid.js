import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";
import VideoGridItem from "./VideoGridItem";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, videos, error } = useSelector(state => state.videos);
  

  useEffect(() => {
    
    dispatch(fetchVideos());

  }, [dispatch])

  let content = null;
  if(isLoading) content = <Loading />;
  if(isError) content = <Loading text={error} />;
  if(isSuccess && videos.length === 0) content = <Loading text='No Videos Found!' />;
  if(isSuccess && videos.length > 0) {
    content = videos.map(video => <VideoGridItem video={video} key={video.id} />)
  }
  
  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          { content } 
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;