import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  if (isError) content = <Error message={error} />;
  if (isSuccess && videos?.length === 0) {
    content = <Error message="No Videos Found!" />;
  }
  if (isSuccess && videos?.length) {
    content = videos.map((video) => <Video key={video?.id} video={video} />);
  }

  return content;
}
