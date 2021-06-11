import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import Snackbar from "../commons/Snackbar";
import "./auth.css";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignIn = () => {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();
  const { t } = useTranslation();

  const responseGoogle = async (response) => {
    try {
      await setAuth({
        id_token: response?.tokenId,
        expires_at: response?.tokenObj?.expires_at,
      });
    } catch (err) {
      setError(err);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="background-sign-in1">
      <div className="container">
        {error && <Snackbar text={error} />}
        <h1>{t("login.text")}</h1>
      </div>
      <div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText={t("login.loginWithGoogle")}
          onSuccess={responseGoogle}
          onFailure={(err) => setError(err?.error)}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          // style={{
          //   width: "100%",
          //   textAlign: "center",
          // }}
        />
      </div>
    </div>
  );
};
export default SignIn;
