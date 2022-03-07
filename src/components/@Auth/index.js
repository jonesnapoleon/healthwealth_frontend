import React, { useState } from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";
import { useFormInput, useWidth } from "utils/hooks";
import "./index.scss";

import logo from "../../assets/images/logo.jpg";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  center: {
    textAlign: "center",
  },
});

const Auth = () => {
  const classes = useStyles();
  const { login, register } = useAuth();

  const { isLargeScreen } = useWidth();

  const email = useFormInput("");
  const fullName = useFormInput("");
  const password = useFormInput("");
  const [isLogin, setIsLogin] = useState(!false);

  const [loading, setLoading] = useState(false);

  const clickLogin = async () => {
    setLoading(true);
    isLogin
      ? await login(email.value, password.value, () => setLoading(false))
      : await register(fullName.value, email.value, password.value, () =>
          setLoading(false)
        );
  };

  const formStyle = {
    width: isLargeScreen ? "80%" : "100%",
    margin: isLargeScreen ? "1rem 10%" : "1rem 0%",
  };

  return (
    <div className="auth-page">
      <div>
        <img src={logo} alt="" />
        <div className={classes.container}>
          {!isLogin && (
            <TextField
              {...fullName}
              label="Full name"
              variant="outlined"
              style={formStyle}
            />
          )}
          <TextField
            {...email}
            label="Email"
            variant="outlined"
            style={formStyle}
          />
          <TextField
            type="password"
            {...password}
            label="Password"
            variant="outlined"
            style={formStyle}
          />
        </div>
        <>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickLogin}
            disabled={loading}
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
