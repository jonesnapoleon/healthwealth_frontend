import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "contexts/SnackbarContext";
import { useAuth } from "contexts/AuthContext";
import { useFormInput } from "utils/hooks";
import "./index.scss";
import ReactLoginMS from "react-ms-login";
import { FRONTEND_URL } from "utils/constant/routeList";

const logo = "https://cdn.worldvectorlogo.com/logos/tokopedia.svg";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  item: {
    width: "80%",
    margin: "1rem 10%",
  },
});

const Auth = () => {
  // const classes = useStyles();
  const { login } = useAuth();
  const { addSnackbar } = useSnackbar();
  const username = useFormInput();
  const password = useFormInput();

  const clickLogin = async () => {
    try {
      await login(username.value, password.value);
    } catch (err) {
      addSnackbar(String(err));
    }
  };

  return (
    <div className="auth-page">
      <div>
        <img src={logo} alt="" />
        {/* <div className={classes.container}>
          <TextField
            {...username}
            label="Username"
            variant="outlined"
            className={classes.item}
          />
          <TextField
            type="password"
            {...password}
            label="Password"
            variant="outlined"
            className={classes.item}
          />
        </div> */}
        <div>
          <ReactLoginMS
            clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID}
            redirectUri={
              process.env.REACT_APP_FRONTEND_DOMAIN + FRONTEND_URL.home
            }
            btnContent="LOGIN WITH MICROSOFT"
            responseType="token"
            handleLogin={(data) => console.log(data)}
          />
          {/* <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickLogin}
          >
            Login
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
