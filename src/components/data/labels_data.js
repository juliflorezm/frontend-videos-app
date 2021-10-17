import {
  findAllLabelsFetch,
  addLabelFetch,
} from "../../data_modules/labels_data_fetcher";

export const findAllLabels = async () => {
  return findAllLabelsFetch().then((response) => response);
};

export const addLabel = async (props) => {
  return addLabelFetch(props).then((response) => response);
};
