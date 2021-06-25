import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import Snackbar from "../commons/Snackbar";
import { FRONTEND_URL } from "../../helpers/constant";
import { Link } from "react-router-dom";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginArea = ({ isLoginPage, setIsLoginPage }) => {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false); // 0: disabled, 1: active

  const responseGoogle = async (response) => {
    setLoading(true);
    try {
      await setAuth({
        id_token: response?.tokenId,
        expires_at: response?.tokenObj?.expires_at,
      });
    } catch (err) {
      setError(err);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Snackbar text={error} />}
      {loading && <Snackbar text={"Loading..."} type="success" />}

      <div className="cta-container">
        <div>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText={
              isLoginPage
                ? t("login.loginWithGoogle")
                : t("login.signupWithGoogle")
            }
            onSuccess={responseGoogle}
            onFailure={(err) => setError(err?.error)}
            cookiePolicy={"single_host_origin"}
            // theme="dark"
          />
          {isLoginPage ? (
            <div className="lower-cta">
              <hr />
              <div>
                {t("login.dontHaveAccount")}
                <span
                  onClick={() => setIsLoginPage((a) => !a)}
                  className="text-primary cursor-pointer"
                >
                  {t("login.signUp")}
                </span>
              </div>
            </div>
          ) : (
            <div className="lower-cta">
              <div>
                {t("login.bySigningUpBlabla")}{" "}
                <Link
                  className="text-primary cursor-pointer text-decoration-none"
                  to={FRONTEND_URL.privacyPolicy}
                >
                  {t("login.termsAndCondition")}
                </Link>
              </div>
              <hr />
              <div>
                {t("login.haveAccount")}{" "}
                <span
                  onClick={() => setIsLoginPage((a) => !a)}
                  className="text-primary cursor-pointer"
                >
                  {t("login.signIn")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginArea;
