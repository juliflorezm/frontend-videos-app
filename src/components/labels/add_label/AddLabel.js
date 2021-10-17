import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Col, Row } from "react-flexbox-grid";
import { useStyles } from "./styles";
import { useAddLabel } from "./useAddLabel";

export const AddLabel = (props) => {
  const classes = useStyles();
  const { open, change } = props;
  const { init, close, message, validate, submit } = useAddLabel({ change });

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
            !Agrega etiquetas propias antes de subir tus videos¡
          </DialogTitle>
          <Formik initialValues={init} validate={validate} onSubmit={submit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Row className={classes.center}>
                  <Col xs={6}>
                    <FormControl>
                      <TextField
                        error={errors.name && touched.name ? true : false}
                        id="name"
                        name="name"
                        label="Nombre"
                        size="small"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.name &&
                          touched.name && <span>{errors.name}</span>
                        }
                      />
                    </FormControl>
                  </Col>
                  <Col xs={6}>
                    <Row className={classes.center}>
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
                            Agregar
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
