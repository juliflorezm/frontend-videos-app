import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Col } from "react-flexbox-grid";
import moment from "moment";
import { animateScroll as scroll } from "react-scroll";
import { useStyles } from "./styles";

export const Item = ({ vid, handleClickCard, url }) => {
  const classes = useStyles();
  return (
    <>
      <Col className={classes.margin} key={vid["_id"]}>
        <Card
          style={{
            borderRadius: 10,
            color: "rgb(203, 198, 216)",
            border: "rgb(192, 200, 248) 0.5px solid",
            backgroundColor: "#282c34",
            display: "flex",
            width: "300px",
            height: "325px",
          }}
        >
          <CardActionArea
            onClick={() => {
              handleClickCard(vid);
              scroll.scrollToBottom();
            }}
          >
            <video className={classes.video} id="videoObj" loop>
              <source src={url + vid["video_id"]} alt=""></source>
            </video>
            <CardContent>
              <Typography
                style={{
                  color: "rgb(192, 200, 248)",
                  fontSize: 12,
                }}
              >
                {vid["tags"].map((t) => " " + t)}
              </Typography>
              <Typography
                style={{
                  color: "rgb(192, 200, 248)",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                variant="body2"
              >
                {vid["title"]}
              </Typography>
              <Typography variant="body2">{vid["author"]}</Typography>
              <br />
              <Typography variant="body2">
                {moment(vid["createdAt"]).format("lll")}
              </Typography>
              <Typography variant="body2">
                {localStorage.getItem(vid["video_id"]) &&
                localStorage.getItem(vid["video_id"] + "_likes")
                  ? JSON.parse(localStorage.getItem(vid["video_id"] + "_likes"))
                  : parseInt(vid["likes"])}{" "}
                me gusta
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Col>
    </>
  );
};
