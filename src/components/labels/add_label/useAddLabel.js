import { useState } from "react";
import { SERVER_ERROR } from "../../../constants/App";
import { addLabel } from "../../data/labels_data";

export const useAddLabel = ({ change }) => {
  const [message, setMessage] = useState("");

  const close = () => {
    change(false);
    window.location.replace("");
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "El nombre de la etiqueta es requerido.";
    }

    return errors;
  };

  const submit = async ({ name }, { resetForm }) => {
    setMessage("Agregando etiqueta...");

    const response = await addLabel({ name });
    try {
      if (response["variant"] === "success") {
        setMessage("¡Etiqueta guardada! si desea, puede agregar más.");
        resetForm();
      } else if (response["variant"] === "error") {
        if (response["message"] === "unique_name") {
          setMessage(
            `El nombre de la etiqueta debe ser único y ya tienes una etiqueta llamada ${name}.`
          );
        } else {
          setMessage(response["message"]);
        }
      }
    } catch (err) {
      if (err["message"] === "Failed to fetch") {
        setMessage(SERVER_ERROR);
      } else {
        setMessage(err["message"]);
      }
    }
  };

  const init = {
    name: "",
  };

  return {
    init,
    close,
    submit,
    message,
    validate,
    setMessage,
  };
};
