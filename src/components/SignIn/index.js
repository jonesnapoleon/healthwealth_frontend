import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
// import { auth, signInWithGoogle } from "../../firebase/firebase";
import Snackbar from "../commons/Snackbar";
import "gestalt/dist/gestalt.css";
import "./SignIn.css";
import { useAuth } from "../../contexts/AuthContext";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignIn = () => {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();

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

  // useEffect(() => {
  //   const savedAuth = localStorage.getItem(AUTH_KEY);
  //   const tokenData = JSON.parse(savedAuth) ?? {};
  //   if (tokenData && isTimeInMsBeforeNow(tokenData?.expired_in)) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="background-sign-in">
      <div className="container">
        {error && <Snackbar text={error} />}
        <h1>Sign in</h1>
      </div>
      <div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText=" Login with Google "
          onSuccess={responseGoogle}
          onFailure={(err) => setError(err?.error)}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
};
export default SignIn;
