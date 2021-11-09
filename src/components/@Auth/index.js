import React, { useState } from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";
import { useFormInput } from "utils/hooks";
import "./index.scss";

import logo from "../../assets/images/logo.jpg";

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

  const email = useFormInput();
  const fullName = useFormInput();
  const password = useFormInput();
  const [isLogin, setIsLogin] = useState(!false);

  const clickLogin = async () => {
    isLogin
      ? await login(email.value, password.value)
      : await register(fullName.value, email.value, password.value);
  };

  return (
    <div className="auth-page">
      <div>
        <img src={logo} alt="" />
        <div className={classes.container}>
          {/* <Typography className={classes.center} variant="h1">
            {isLogin ? `Login` : "Sign up"}
          </Typography> */}
          {!isLogin && (
            <TextField
              {...fullName}
              label="Full name"
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
            {!isLogin
              ? `Already has account? Log in`
              : `New to HealthWealth? Sign up`}
          </Typography>
        </>
      </div>
    </div>
  );
};

export default Auth;
