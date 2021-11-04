import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShareIcon from "@material-ui/icons/Share";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { searchProduct } from "api/product";
import { useSnackbar } from "contexts/SnackbarContext";
// import { useProduct } from "contexts/DataContext";
import { FRONTEND_URL } from "utils/constant/routeList";
import { Avatar } from "@material-ui/core";

const tokopediaImg =
  "https://assets.tokopedia.net/assets-tokopedia-lite/v2/arael/kratos/36c1015e.png";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: "56px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: "var(--background-color)",
    boxShadow: "0px 2px .5px rgba(200, 200, 200, 0.75)",
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
  avatar: {
    width: "2rem",
    margin: ".5rem",
  },
  inputInput: {
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

export default function TopBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { addSnackbar } = useSnackbar();
  // const { setSearchResults } = useProduct();
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    if (location.search) {
      const query = location.search.slice(3, location.search.length);
      if (query) setQueryText(decodeURIComponent(query.trim()));
    }
  }, [location]);

  useEffect(() => {
    if (queryText.trim() === "") {
      history.push(location.pathname);
      return;
    }
    history.push(`${location.pathname}?q=${queryText}`);
  }, [queryText, history, location.pathname]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const res = await searchProduct(queryText);
        if (res) {
          // setSearchResults(res);
          history.push(`${FRONTEND_URL.result}?q=${queryText}`);
        }
      } catch (err) {
        addSnackbar(err);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolBar}>
          {location?.pathname === FRONTEND_URL?.home ||
          location?.pathname === FRONTEND_URL?.account ? (
            <Avatar
              alt="Tokopedia"
              src={tokopediaImg}
              className={classes.avatar}
            />
          ) : (
            <IconButton onClick={() => history.push(FRONTEND_URL?.home)}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <div className={classes.search}>
            <InputBase
              onKeyDown={handleKeyDown}
              placeholder="Cari Vitamin C di Tokopedia"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
