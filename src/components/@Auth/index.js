import React, { useState } from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
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
  center: {
    textAlign: "center",
  },
});

const Auth = () => {
  const classes = useStyles();
  const { login, register } = useAuth();
  const { addSnackbar } = useSnackbar();
  const email = useFormInput();
  const full_name = useFormInput();
  const password = useFormInput();
  const [isLogin, setIsLogin] = useState(!false);

  const clickLogin = async () => {
    try {
      isLogin
        ? await login(email.value, password.value)
        : await register(full_name.value, email.value, password.value);
    } catch (err) {
      addSnackbar(String(err));
    }
  };

  return (
    <div className="auth-page">
      <div>
        <img src={logo} alt="" />
        <div className={classes.container}>
          <Typography className={classes.center} variant="h1">
            {isLogin ? `Login` : "Sign up"}
          </Typography>
          {!isLogin && (
            <TextField
              {...full_name}
              label="Username"
              variant="outlined"
              className={classes.item}
            />
          )}
          <TextField
            {...email}
            label="Email"
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
        </div>
        <>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickLogin}
          >
            {isLogin ? "Login" : "Sign up"}
          </Button>
        </>
        <>
          <Typography
            className={classes.center}
            style={{
              color: "var(--primary-color)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => setIsLogin((a) => !a)}
          >
            {!isLogin ? `Already has account?` : `New to HealthWealth?`}
          </Typography>
        </>
      </div>
    </div>
  );
};

export default Auth;
