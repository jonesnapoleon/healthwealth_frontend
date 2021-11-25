import React, { useState, createContext, useContext, useEffect } from "react";
import { editAccount, login, register } from "api/auth";
import { AUTH_KEY } from "utils/constant";
import { FRONTEND_URL } from "utils/constant/routeList";
import { useHistory, useLocation } from "react-router-dom";
import { useSnackbar } from "./SnackbarContext";
import { isValidEmail } from "utils/validator";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [firstTime, setFirstTime] = useState(true);
  const { addSnackbar } = useSnackbar();

  const callRegister = async (fullname, email, password) => {
    try {
      if (fullname.trim() === "") throw new Error("Fill in the full name");
      if (!isValidEmail(email)) throw new Error("Email is not valid");
      if (password.trim().length < 9)
        throw new Error("Password must has more than 8 characters");
      const res = await register(fullname, email, password);
      if (res) {
        const newRes = await callLogin(email, password);
        if (newRes) addSnackbar(res.code, "success");
      }
    } catch (e) {
      addSnackbar(String(e));
    }
  };

  const callLogin = async (email, password) => {
    try {
      if (!isValidEmail(email)) throw new Error("Email is not valid");
      if (password.trim().length < 4) throw new Error("Password is not valid");
      const res = await login(email, password);
      if (res) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(res));
        setAuth(res);
        if (location?.pathname === FRONTEND_URL.auth)
          history.push(FRONTEND_URL.home);
      }
    } catch (e) {
      localStorage.removeItem(AUTH_KEY);
      addSnackbar(String(e));
    }
  };

  const putAuth = async (newValue) => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    const tokenData = JSON.parse(savedAuth) ?? {};
    if (newValue) {
      if (tokenData?.exp && tokenData?.token) {
        const allValue = {
          user: { ...newValue },
          exp: tokenData.exp,
          token: tokenData.token,
        };
        setAuth(allValue);
        localStorage.setItem(AUTH_KEY, JSON.stringify(allValue));
        addSnackbar("Successfully edit profile", "success");
      }
    }
  };

  const callEditProfile = async (data) => {
    try {
      const finalData = data;
      const res = await editAccount(finalData);
      if (res) await putAuth(res);
    } catch (e) {
      addSnackbar(String(e));
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    const tokenData = JSON.parse(savedAuth) ?? {};

    if (firstTime) {
      if (tokenData && tokenData?.exp && tokenData?.token) {
        setAuth(tokenData);
        if (
          location?.pathname === FRONTEND_URL.auth ||
          location?.pathname === `${FRONTEND_URL.auth}/`
        )
          history.push(FRONTEND_URL.home);
      } else {
        history.push(FRONTEND_URL.auth);
        localStorage.removeItem(AUTH_KEY);
      }
      setFirstTime(false);
    }
  }, [history, location, firstTime]);

  const signOut = () => {
    setAuth({});
    localStorage.removeItem(AUTH_KEY);
    history.push(FRONTEND_URL.auth);
    window.location.reload();
  };

  const authContext = {
    isLoggedIn: !!auth?.user?.email ?? false,
    auth,
    signOut,
    login: callLogin,
    register: callRegister,
    editProfile: callEditProfile,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
