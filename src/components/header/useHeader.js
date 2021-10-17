import { useState } from "react";
import { SERVER_ERROR } from "../../constants/App";
import { findVideosByKeyword } from "../data/videos_data";

export const useHeader = () => {
  const [dialogForm, setDialogForm] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [videosFound, setVideosFound] = useState(null);
  const [addLabelForm, setAddLabel] = useState(false);
  const [error, setError] = useState(null);
  const [holder, setHolder] = useState(null);

  const handleClickUpload = (value) => setDialogForm(value);

  const handleClickAddLabel = (value) => setAddLabel(value);

  const handleClickSearch = async () => {
    try {
      const videos = await findVideosByKeyword({ keyword });
      if (videos.variant === "error") {
        setHolder(videos.message);
      } else if (videos.variant === "success") {
        setVideosFound(videos.videos);
        if (videos.videos.length === 0) {
          setHolder("Ningún video coincide con tú busqueda");
        } else {
          setHolder(null);
        }
      }
      setKeyword("");
    } catch (err) {
      if (err["message"] === "Failed to fetch") {
        setError(SERVER_ERROR);
      } else {
        setError(err["message"]);
      }
    }
  };
  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setHolder(null);
  };

  return {
    error,
    holder,
    keyword,
    dialogForm,
    videosFound,
    handleSearch,
    addLabelForm,
    handleClickSearch,
    handleClickUpload,
    handleClickAddLabel,
  };
};
