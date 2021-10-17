import React from "react";
import {
  Typography,
  Toolbar,
  Avatar,
  IconButton,
  InputBase,
  AppBar,
  Box,
  Button,
  Link,
} from "@mui/material";
import { APP_NAME } from "../../constants/App";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Image from "../../videws_icon.svg";
import { alpha, styled } from "@mui/system";
import { UploadVideo } from "../videos/upload_video/UploadVideo";
import { Labels } from "../labels/label_list/Labels";
import { useHeader } from "./useHeader";
import { AddLabel } from "../labels/add_label/AddLabel";
import { Error } from "../Error";
import { useStyles } from "./styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("rgb(192, 200, 248)", 0.15),
  "&:hover": {
    backgroundColor: alpha("rgb(192, 200, 248)", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(8)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const HeaderBar = (props) => {
  const classes = useStyles();
  const {
    error,
    holder,
    keyword,
    dialogForm,
    videosFound,
    handleSearch,
    addLabelForm,
    handleClickSearch,
    handleClickUpload,
    handleClickAddLabel,
  } = useHeader();

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
          <Toolbar position="static" className={classes.header}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Avatar src={Image} />
            </IconButton>
            <Typography
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              className={classes.fontStyle}
              variant="h6"
            >
              {APP_NAME}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search className={classes.uploadInput}>
              <SearchIconWrapper>
                <StyledInputBase
                  value={keyword}
                  onChange={handleSearch}
                  placeholder={holder ? holder : "Busca un video aquí..."}
                  inputProps={{ "aria-label": "buscar" }}
                />{" "}
                <SearchIcon />
              </SearchIconWrapper>
            </Search>
            <Box>
              <Button
                type="submit"
                onClick={handleClickSearch}
                style={{
                  color: "rgb(192, 200, 248)",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Buscar
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link
                style={{
                  cursor: "pointer",
                  color: "rgb(192, 200, 248)",
                  fontSize: 14,
                }}
                onClick={() => handleClickAddLabel(true)}
              >
                ¡Agrega una etiqueta!
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={() => handleClickUpload(true)}
                edge="end"
                size="large"
              >
                <FileUploadOutlinedIcon className={classes.uploadButton} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <UploadVideo change={handleClickUpload} open={dialogForm} />
      <AddLabel change={handleClickAddLabel} open={addLabelForm} />
      <Labels videos={videosFound} />
    </>
  );
};
