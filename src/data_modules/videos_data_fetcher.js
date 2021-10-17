import axios from "axios";
import { LOCAL_URL } from "../constants/App";

export const findVideosByLabelFetch = ({ label_id }) => {
  return window
    .fetch(
      `${LOCAL_URL}videos/by_label?` +
        new URLSearchParams({
          label_id,
        }),
      {
        mode: "cors",
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
    .then((response) => response.json());
};

export const displayVideoFetch = ({ video_id }) => {
  console.log(video_id);
  return window
    .fetch(
      `${LOCAL_URL}video/display?` +
        new URLSearchParams({
          video_id,
        }),
      {
        mode: "cors",
        method: "GET",
        headers: {
          "content-type": "video/mp4;charset=UTF-8",
        },
      }
    )
    .then((response) => response);
};

export const setLikeVideoFetch = ({ video_id, like }) => {
  return window
    .fetch(
      `${LOCAL_URL}video/like?` +
        new URLSearchParams({
          video_id,
          like,
        }),
      {
        mode: "cors",
        method: "PATCH",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
    .then((response) => response.json());
};

export const postVideoFetch = (formData) => {
  return axios.post(`${LOCAL_URL}video`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const findVideosByKeywordFetch = ({ keyword }) => {
  return window
    .fetch(
      `${LOCAL_URL}videos/by_keyword?` +
        new URLSearchParams({
          keyword,
        }),
      {
        mode: "cors",
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    )
    .then((response) => response.json());
};
