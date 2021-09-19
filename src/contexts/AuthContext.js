import React, { useEffect, useState, createContext, useContext } from "react";
import { login } from "../api/auth";
import { isPublicLink, isTimeInMsBeforeNow } from "../helpers/validator";
import { AUTH_KEY } from "../helpers/constant";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import { FRONTEND_URL } from "../helpers/constant";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [firstTime, setFirstTime] = useState(true);
  const [auth, setAuth] = useState({});

  const history = useHistory();
  const location = useLocation();

  const setAndSaveAuth = async (newValue) => {
    try {
      axios.defaults.headers[
        process.env.REACT_APP_TOKEN_HEADER
      ] = `${newValue?.id_token}`;
      const res = await login(newValue?.id_token);
      if (res) {
        const allValue = { ...newValue, ...res.data };
        localStorage.setItem(AUTH_KEY, JSON.stringify(allValue));
        setAuth(allValue);
        if (
          location?.pathname === FRONTEND_URL.login ||
          location?.pathname === `${FRONTEND_URL.login}/`
        )
          history.push(FRONTEND_URL.base);
      }
    } catch (e) {
      localStorage.removeItem(AUTH_KEY);
      throw e;
    }
  };

  const putAuth = async (newValue) => {
    console.log("putAuth", newValue);
    const savedAuth = localStorage.getItem(AUTH_KEY);
    const tokenData = JSON.parse(savedAuth) ?? {};
    if (newValue) {
      if (tokenData?.expires_at && tokenData?.id_token) {
        const allValue = {
          ...newValue,
          expires_at: tokenData.expires_at,
          id_token: tokenData?.id_token,
        };
        setAuth(allValue);
        localStorage.setItem(AUTH_KEY, JSON.stringify(allValue));
      }
    }
  };

  const signOut = () => {
    setAuth({});
    localStorage.removeItem(AUTH_KEY);
    history.push(FRONTEND_URL.login);
    window.location.reload();
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    const tokenData = JSON.parse(savedAuth) ?? {};

    if (firstTime) {
      if (tokenData && isTimeInMsBeforeNow(tokenData?.expires_at)) {
        setAuth(tokenData);
        if (
          location?.pathname === FRONTEND_URL.login ||
          location?.pathname === `${FRONTEND_URL.login}/`
        )
          history.push(FRONTEND_URL.base);
      } else if (isPublicLink(location?.pathname)) {
      } else {
        history.push(FRONTEND_URL.login);
        localStorage.removeItem(AUTH_KEY);
      }
      setFirstTime(false);
    }
  }, [history, location, firstTime]);

  const authContext = {
    auth,
    signOut,
    setAuth: setAndSaveAuth,
    putAuth,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
