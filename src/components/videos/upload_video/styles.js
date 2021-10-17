import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
  },
  center: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  customInputFile: {
    borderRadius: 20,
    border: "1px solid rgb(192, 200, 248)",
    backgroundColor: "#282c34",
    color: "rgb(192, 200, 248)",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    margin: "0 auto 0",
    minHeight: 15,
    overflow: "hidden",
    padding: 10,
    position: "relative",
    textAlign: "center",
    width: 250,
  },
  inputFile: {
    border: "10000px solid transparent",
    cursor: "pointer",
    fontSize: 10000,
    margin: 0,
    opacity: 0,
    outline: "0 none",
    padding: 0,
    position: "absolute",
    right: -1000,
    top: -1000,
  },
  dialog: {
    backgroundColor: "rgb(192, 200, 248)",
  },
  fondo: {
    backgroundColor: "#282c34",
  },
}));
