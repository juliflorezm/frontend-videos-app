import {
  findVideosByLabelFetch,
  displayVideoFetch,
  setLikeVideoFetch,
  postVideoFetch,
  findVideosByKeywordFetch,
} from "../../data_modules/videos_data_fetcher";

export const findVideosByLabel = async (props) => {
  return findVideosByLabelFetch(props).then((response) => response);
};

export const displayVideo = async (props) => {
  return displayVideoFetch(props).then((response) => response);
};

export const setLikeVideo = async (props) => {
  return setLikeVideoFetch(props).then((response) => response);
};

export const postVideo = async (props) => {
  return postVideoFetch(props).then((response) => response);
};

export const findVideosByKeyword = async (props) => {
  return findVideosByKeywordFetch(props).then((response) => response);
};
