import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Player from "../components/description/Player";
import VideoDescription from "../components/description/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/ui/Footer";
import Loading from "../components/ui/Loading";
import { fetchVideo } from "../features/video/videoSlice";

const Video = () => {
  const { isLoading, isSuccess, isError, video, error } = useSelector(
    (state) => state.video
  );
  const dispatch = useDispatch();
  const { videoId } = useParams();

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  
  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (isError) content = <Loading text={error} />;
  if (isSuccess && !video?.id) content = <Loading text="No Video Found!" />;
  if (isSuccess && video?.id) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <Player link={video?.link} title={video?.title} />
          <VideoDescription video={video} />
        </div>

        <RelatedVideoList currentVideoId={video?.id} tags={video?.tags} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="pt-6 pb-20">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          {content}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Video;
