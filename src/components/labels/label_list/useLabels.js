import { useEffect, useState } from "react";
import { LOCAL_URL, SERVER_ERROR } from "../../../constants/App";
import { findAllLabels } from "../../data/labels_data";

export const useLabels = ({ videos }) => {
  const [labels, setLabels] = useState([]);
  const [label, setLabel] = useState(null);
  const [error, setError] = useState(null);

  const url = `${LOCAL_URL}video/display?video_id=`;

  useEffect(() => {
    async function fetchLabels() {
      try {
        const response = await findAllLabels();
        if (response["variant"] && response["variant"] === "success") {
          setLabels(response["labels"]);
          let defaultLabel;
          if (!videos) {
            defaultLabel = response["labels"].find(
              (lbl) => lbl["name"] === "General"
            );
          }
          setLabel(defaultLabel);
        } else if (response["variant"] && response["variant"] === "error") {
          console.log(response);
          setError(response["message"]);
        }
      } catch (err) {
        if (err["message"] === "Failed to fetch") {
          setError(SERVER_ERROR);
        } else {
          setError(err["message"]);
        }
      }
    }
    fetchLabels();
  }, [videos]);

  const handleClick = (lbl) => {
    setLabel(lbl);
  };

  return {
    url,
    error,
    label,
    labels,
    handleClick,
  };
};
