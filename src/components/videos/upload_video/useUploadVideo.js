import { useEffect, useState } from "react";
import { SERVER_ERROR } from "../../../constants/App";
import { findAllLabels } from "../../data/labels_data";
import { postVideo } from "../../data/videos_data";

export const useUploadVideo = ({ change }) => {
  const [labels, setLabels] = useState([]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("Cargar video...");
  const [tags, setTags] = useState([]);

  const init = {
    title: "",
    description: "",
    label_id: "",
    video: null,
    author: "",
  };

  const handleDeleteTag = (tag) =>
    setTags((tagss) => tagss.filter((t) => t !== tag));

  const handleAddTag = (tag) => {
    setTags((tagss) => [...tagss, "#" + tag.replace(/\s+/g, "")]);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "El título del video es requerido.";
    }

    if (values.description.length >= 200) {
      errors.description = "Llegó al límite de caracteres permitidos.";
    }

    if (!values.label_id) {
      errors.label_id = "La etiqueta del video es requerida";
    }

    if (labels.length === 0) {
      errors.label_id = "Debe agregar etiquetas para subir sus videos.";
    }

    if (!values.video) {
      errors.video = "El archivo de video es requerido";
    }

    if (!values.author) {
      errors.author = "El autor del video es requerido";
    }

    return errors;
  };

  const submit = async (values, { resetForm }) => {
    setMessage("Subiendo video...");
    var formData = new FormData();
    const { video, title, author, description, label_id } = values;
    formData.append("video", video);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("label_id", label_id);
    formData.set("author", author);
    tags.map((t) => formData.append("tags", t));

    try {
      const response = await postVideo(formData);

      if (response.data["variant"] === "success") {
        setMessage("Video subido con éxito.");
      } else if (response.data["variant"] === "error") {
        if (response.data["message"] === "video is too big") {
          setMessage(
            "El video es demasiado grande, inténtelo nuevamente con otro de menor peso."
          );
        } else {
          setMessage(response.data["message"]);
        }
      }
      setInput("Cargar video...");
      setTags([]);
      resetForm();
    } catch (err) {
      if (err["message"] === "Network Error") {
        setMessage(SERVER_ERROR);
      } else {
        setMessage(err["message"]);
      }
    }
  };

  const close = () => {
    change(false);
    window.location.replace("");
  };

  useEffect(() => {
    async function fetchLabels() {
      try {
        const response = await findAllLabels();
        if (response["variant"] && response["variant"] === "success") {
          setLabels(response["labels"]);
        } else if (response["variant"] && response["variant"] === "error") {
          console.log(response);
          setMessage(response["message"]);
        }
      } catch (err) {
        if (err["message"] === "Failed to fetch") {
          setMessage(SERVER_ERROR);
        } else {
          setMessage(err["message"]);
        }
      }
    }
    fetchLabels();
  }, []);

  return {
    tags,
    init,
    close,
    input,
    submit,
    labels,
    message,
    validate,
    setInput,
    setMessage,
    handleAddTag,
    handleDeleteTag,
  };
};
