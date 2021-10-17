import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
import { Formik } from "formik";
import { Col, Row } from "react-flexbox-grid";
import { useUploadVideo } from "./useUploadVideo";
import { useStyles } from "./styles.js";

export const UploadVideo = (props) => {
  const classes = useStyles();
  const { open, change } = props;
  const {
    tags,
    init,
    close,
    input,
    labels,
    submit,
    message,
    setInput,
    validate,
    handleAddTag,
    handleDeleteTag,
  } = useUploadVideo({ change });

  return (
    <>
      <Dialog className={classes.fondo} open={open} onClose={close}>
        <DialogContent className={classes.dialog}>
          <DialogTitle
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
          >
            !An&iacute;mate a subir un video¡
          </DialogTitle>

          <Formik initialValues={init} validate={validate} onSubmit={submit}>
            {({
              setFieldValue,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={4}>
                    <FormControl
                      style={{
                        minWidth: 180,
                        maxWidth: 280,
                      }}
                    >
                      <TextField
                        error={errors.title && touched.title ? true : false}
                        id="title"
                        name="title"
                        label="Título"
                        size="small"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.title &&
                          touched.title && <span>{errors.title}</span>
                        }
                      />
                    </FormControl>
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      style={{
                        minWidth: 180,
                        maxWidth: 280,
                      }}
                    >
                      <TextField
                        error={
                          errors.description && touched.description
                            ? true
                            : false
                        }
                        id="description"
                        name="description"
                        label="Descripción"
                        size="small"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.description &&
                          touched.description && (
                            <span>{errors.description}</span>
                          )
                        }
                        placeholder="Máximo 200 caracteres"
                        minRows={4}
                        maxRows={4}
                      />
                    </FormControl>
                  </Col>
                  <Col xs={4}>
                    <FormControl
                      style={{
                        minWidth: 180,
                        maxWidth: 280,
                      }}
                    >
                      <TextField
                        error={errors.author && touched.author ? true : false}
                        id="author"
                        name="author"
                        label="Autor"
                        size="small"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.author &&
                          touched.author && <span>{errors.author}</span>
                        }
                      />
                    </FormControl>
                  </Col>
                </Row>
                <Row className={classes.margin}>
                  <Col xs={6}>
                    <FormControl
                      style={{
                        minWidth: 180,
                        maxWidth: 280,
                      }}
                    >
                      <TextField
                        error={
                          errors.label_id && touched.label_id ? true : false
                        }
                        id="label_id"
                        name="label_id"
                        select
                        size="small"
                        label="Etiqueta"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.label_id &&
                          touched.label_id && <span>{errors.label_id}</span>
                        }
                        value={values.label_id}
                      >
                        {Array.isArray(labels) &&
                          labels.map(({ name, _id }) => (
                            <MenuItem key={_id} value={_id}>
                              {name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormControl>
                  </Col>
                  <Col xs={6}>
                    <FormControl
                      style={{
                        minWidth: 180,
                        maxWidth: 280,
                      }}
                    >
                      <ChipInput
                        id="tags"
                        name="tags"
                        variant="outlined"
                        value={tags}
                        label="Tags"
                        placeholder="Enter para agregar"
                        onChange={handleChange}
                        onAdd={(tag) => handleAddTag(tag)}
                        onDelete={(tag) => handleDeleteTag(tag)}
                      />
                    </FormControl>
                  </Col>
                </Row>
                <Row className={classes.margin}>
                  <Col xs={12} className={classes.center}>
                    <FormControl
                      style={{
                        minWidth: 240,
                        maxWidth: 340,
                      }}
                    >
                      <div className={classes.customInputFile}>
                        <input
                          id="video"
                          name="video"
                          type="file"
                          accept="video"
                          onChange={(event) => {
                            if (event.currentTarget.files[0]) {
                              setFieldValue(
                                "video",
                                event.currentTarget.files[0]
                              );
                              setInput(event.currentTarget.files[0].name);
                            } else {
                              setFieldValue("video", null);
                              setInput("Cargar video...");
                            }
                          }}
                          onBlur={handleBlur}
                          className={
                            (classes.customInputFile, classes.inputFile)
                          }
                        ></input>
                        {input}
                      </div>
                      <FormHelperText style={{ color: "red" }}>
                        {errors.video && touched.video && (
                          <span>{errors.video}</span>
                        )}
                      </FormHelperText>
                    </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <center>
                      <Button
                        variant="contained"
                        color="inherit"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#282c34",
                          color: "rgb(192, 200, 248)",
                        }}
                        type="submit"
                      >
                        Guardar
                      </Button>
                    </center>
                  </Col>
                  <Col xs={6}>
                    <center>
                      <Button
                        variant="outlined"
                        color="inherit"
                        style={{
                          textTransform: "capitalize",
                          color: "#282c34",
                        }}
                        onClick={close}
                      >
                        Salir
                      </Button>
                    </center>
                  </Col>
                </Row>
                <p className={classes.center}>{message}</p>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};
