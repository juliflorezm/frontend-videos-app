import React from "react";
import { AppBar, Chip, Stack, Toolbar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
import { VideosByLabel } from "../../videos/videos_by_label/VideosByLabel";
import { useLabels } from "./useLabels";
import { Error } from "../../Error";
import { useStyles } from "../label_list/styles";

export const Labels = (props) => {
  const classes = useStyles();
  const { videos } = props;
  const { url, error, label, labels, handleClick } = useLabels({ videos });

  if (error) {
    return (
      <>
        <Error error={error} />
      </>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar position="static" className={classes.labelsBar}>
            <Stack className={classes.margin} direction="row" spacing={1}>
              {Array.isArray(labels) &&
                labels.map((l) => (
                  <Chip
                    style={{
                      color: "rgb(192, 200, 248)",
                      borderColor: "rgb(192, 200, 248) 5px solid",
                    }}
                    key={l["_id"]}
                    variant="outlined"
                    label={l["name"]}
                    onClick={() => {
                      handleClick(l);
                    }}
                    icon={
                      label && l["_id"] === label["_id"] ? (
                        <DoneIcon
                          style={{ color: "rgb(192, 200, 248)" }}
                        ></DoneIcon>
                      ) : (
                        false
                      )
                    }
                  />
                ))}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      <div>
        <VideosByLabel
          videosSearch={videos}
          url={url}
          label={label}
        ></VideosByLabel>
      </div>
    </>
  );
};
