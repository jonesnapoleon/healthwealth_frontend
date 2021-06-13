import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import Snackbar from "../commons/Snackbar";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginArea = () => {
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
    <>
      {error && <Snackbar text={error} />}
      <div className="cta-container">
        <div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText={t("login.loginWithGoogle")}
            onSuccess={responseGoogle}
            onFailure={(err) => setError(err?.error)}
            cookiePolicy={"single_host_origin"}
            // theme="dark"
          />
          <div className="lower-cta">
            <hr />
            <div>
              {t("login.dontHaveAccount")}
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginArea;
