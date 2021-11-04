import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: "calc(56px + 0.2rem)",
  },
  root: {
    flexGrow: 1,
    backgroundColor: "var(--background-color)",
    boxShadow: "0px 2px .5px rgba(200, 200, 200, 0.75)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "var(--text-color)",
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(220, 220, 220, .7)",
    marginLeft: 0,
    width: "100%",
  },
  toolBar: {
    padding: 0,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0.2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function DisplayTopBar({ title }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.wrapper}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            className={classes.menuButton}
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant={"h2"} color="textPrimary">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
