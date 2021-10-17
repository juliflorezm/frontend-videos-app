import React from "react";
import { Row } from "react-flexbox-grid";
import { VideoDisplayed } from "../display_video/VideoDisplayed";
import useVideo from "./useVideo";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "./styles";
import { Item } from "./Item";

export const VideosByLabel = ({ videosSearch, label, url }) => {
  const classes = useStyles();
  const {
    like,
    videos,
    videoSelected,
    expanded,
    loading,
    handleClickCard,
    handleChangeLike,
    handleExpandClick,
  } = useVideo({ label, url });

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div>
        <Row className={classes.center}>
          {label && Array.isArray(videos)
            ? videos.map((vid, index) => (
                <Item
                  key={index}
                  handleClickCard={handleClickCard}
                  url={url}
                  vid={vid}
                />
              ))
            : null}{" "}
          {Array.isArray(videosSearch) && !label
            ? videosSearch.map((vid, index) => (
                <Item
                  key={index}
                  handleClickCard={handleClickCard}
                  url={url}
                  vid={vid}
                />
              ))
            : null}
        </Row>
        {videoSelected ? (
          <Row>
            <VideoDisplayed
              like={like}
              expanded={expanded}
              videoSelected={videoSelected}
              handleChangeLike={handleChangeLike}
              handleExpandClick={handleExpandClick}
            />
          </Row>
        ) : null}
      </div>
    </>
  );
};
