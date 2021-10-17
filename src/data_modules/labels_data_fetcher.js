import { LOCAL_URL } from "../constants/App";

export const findAllLabelsFetch = async () => {
  const url = `${LOCAL_URL}labels`;
  return window
    .fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
    .then((response) => response.json());
};

export const addLabelFetch = ({ name }) => {
  const url = `${LOCAL_URL}label`;
  const toJson = {
    name,
  };
  return window
    .fetch(url, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(toJson),
    })
    .then((response) => response.json());
};
