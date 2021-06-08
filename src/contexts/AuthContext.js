import React, { useEffect, useState, createContext, useContext } from "react";
import { login } from "../api/auth";
import { isTimeInMsBeforeNow } from "../helpers/utils";
import Snackbar from "../components/commons/Snackbar";
import { navigate } from "@reach/router";
import { AUTH_KEY } from "../helpers/constant";
import axios from "axios";

// import { DynamicRoute } from "../../utils/constants/dynamic-route";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useState({});

  const setAndSaveAuth = async (newValue) => {
    try {
      axios.defaults.headers["Authorization"] = `Bearer ${newValue?.id_token}`;
      const res = await login(newValue?.id_token);
      console.log(res);
      if (res) {
        localStorage.setItem(
          AUTH_KEY,
          JSON.stringify({ ...newValue, ...res.data })
        );
        setAuth(newValue);
        setAuthenticated(true);
        navigate("/");
      }
    } catch (e) {
      console.log("this is err");
      localStorage.removeItem(AUTH_KEY);
      setAuthenticated(false);
      throw e;
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    const tokenData = JSON.parse(savedAuth) ?? {};
    if (tokenData && isTimeInMsBeforeNow(tokenData?.expired_in)) {
      setAuth(tokenData);
      setAuthenticated(true);
    }
  }, []);

  const authContext = {
    authenticated,
    auth,
    setAuth: setAndSaveAuth,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
