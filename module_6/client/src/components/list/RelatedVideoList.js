import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import RelatedVideoListItem from "./RelatedVideoListItem";

const RelatedVideoList = ({ currentVideoId, tags }) => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, videos, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideos({ id: currentVideoId, tags }));
  }, [dispatch, currentVideoId, tags]);

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (isError) content = <Loading text={error} />;
  if (isSuccess && videos.length === 0)
    content = <Loading text="No related videos found" />;
  if (isSuccess && videos.length > 0) {
    content = videos.map((video) => (
      <RelatedVideoListItem video={video} key={video.id} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;
