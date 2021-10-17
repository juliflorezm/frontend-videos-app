import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  CardHeader,
  Avatar,
} from "@mui/material";
import React from "react";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { styled } from "@mui/material/styles";
import { useStyles } from "./styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const VideoDisplayed = (props) => {
  const classes = useStyles();
  const { expanded, videoSelected, handleChangeLike, handleExpandClick } =
    props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div className={classes.container}>
        <Card
          style={{
            borderRadius: 10,
            color: "rgb(203, 198, 216)",
            border: "rgb(192, 200, 248) 1px solid",
            backgroundColor: "#282c34",
            display: "flex",
          }}
        >
          <CardContent>
            <video
              src={videoSelected["url"]}
              type="video/mp4"
              style={{ width: 800 }}
              id="videoObj"
              controls
            />
            <br />
            <br />
            <Typography
              style={{
                color: "rgb(192, 200, 248)",
                fontSize: 16,
              }}
            >
              {videoSelected["tags"].map((t) => " " + t)}
            </Typography>
            <Typography
              style={{
                color: "rgb(192, 200, 248)",
                fontSize: 18,
                fontWeight: "bold",
              }}
              variant="body2"
            >
              {videoSelected["title"]}
            </Typography>
            <CardHeader
              className={classes.text}
              avatar={
                <Avatar
                  style={{ backgroundColor: "rgb(192, 200, 248)" }}
                  aria-label="recipe"
                >
                  <PersonOutlineRoundedIcon className={classes.colorIcon} />
                </Avatar>
              }
              title={videoSelected["author"]}
              subheader={
                <Typography className={classes.text}>
                  {moment(videoSelected["createdAt"]).format("lll")}
                </Typography>
              }
            ></CardHeader>
            <CardActions className={classes.collapse}>
              <Checkbox
                checked={
                  localStorage.getItem(videoSelected.video_id) &&
                  localStorage.getItem(videoSelected.video_id + "_like")
                    ? JSON.parse(
                        localStorage.getItem(videoSelected.video_id + "_like")
                      )
                    : false
                }
                className={classes.back}
                {...label}
                sx={{
                  color: "red",
                  "&.Mui-checked": {
                    color: "red",
                  },
                }}
                onChange={handleChangeLike}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />

              <Typography variant="body2">
                {localStorage.getItem(videoSelected.video_id) &&
                localStorage.getItem(videoSelected.video_id + "_likes")
                  ? JSON.parse(
                      localStorage.getItem(videoSelected.video_id + "_likes")
                    )
                  : videoSelected["likes"]}
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Ver más"
              >
                <ExpandMoreIcon className={classes.text} />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  {videoSelected["description"]}
                </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
