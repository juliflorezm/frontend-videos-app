import { useEffect, useState } from "react";
import { findVideosByLabel, setLikeVideo } from "../../data/videos_data";

const useVideo = ({ label, url }) => {
  const [like, setLike] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  const handleChangeLike = async (e) => {
    const value = e.target.checked;
    setLike(value);
    try {
      const response = await setLikeVideo({
        video_id: videoSelected["video_id"],
        like: value,
      });
      if (response["variant"] === "success") {
        localStorage.setItem(videoSelected.video_id, videoSelected.video_id);
        localStorage.setItem(videoSelected.video_id + "_like", value);
        localStorage.setItem(videoSelected.video_id + "_likes", response.likes);
        setVideoSelected({ ...videoSelected, likes: response.likes });
      } else if (response["variant"] === "error") {
        console.log(response["message"]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (label) {
      findVideosByLabel({ label_id: label["_id"] })
        .then((data) => {
          if (data["variant"] && data["variant"] === "success") {
            setVideos(data["videos"]);
          } else if (data["variant"] && data["variant"] === "error") {
            console.log(data["message"]);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [label]);

  const handleClickCard = (v) => {
    setLoading(true);
    try {
      setLike(false);
      setVideoSelected({ ...v, url: `${url}${v.video_id}` });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    like,
    videos,
    loading,
    videoSelected,
    expanded,
    handleClickCard,
    handleChangeLike,
    handleExpandClick,
  };
};

export default useVideo;
