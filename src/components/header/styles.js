import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#282c34",
    borderBottom: "rgb(192, 200, 248) 2.5px solid",
    borderTop: "rgb(192, 200, 248) 2.5px solid",
  },
  fontStyle: {
    color: "rgb(192, 200, 248)",
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  },
  uploadButton: {
    color: "rgb(192, 200, 248)",
    textTransform: "capitalize",
  },
  uploadInput: {
    color: "rgb(192, 200, 248)",
  },
  button: {
    color: "rgb(192, 200, 248)",
    textTransform: "capitalize",
    fontSize: 16,
  },
  link: {
    cursor: "pointer",
    color: "rgb(192, 200, 248)",
    fontSize: 14,
  },
}));
