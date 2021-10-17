import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  video: { width: 300 },
  tags: {
    color: "rgb(192, 200, 248)",
    fontSize: 14,
  },
  center: {
    display: "flex",
    placeContent: "center",
  },
}));
