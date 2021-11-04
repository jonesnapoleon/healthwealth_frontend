import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { login } from "api/auth";
import { AUTH_KEY } from "utils/constant";
import { FRONTEND_URL } from "utils/constant/routeList";
import { useHistory, useLocation } from "react-router-dom";

export const authInitialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) ?? false,
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const token = window.localStorage.getItem(AUTH_KEY);
const jsonizedToken = JSON.parse(token);

const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({});
  const [auth, dispatchAuth] = useReducer(authReducer, authInitialState);
  const history = useHistory();
  const location = useLocation();

  const callLogin = async (username, password) => {
    try {
      const res = await login(username, password);
      if (res && res?.status === "success") {
        localStorage.setItem(AUTH_KEY, JSON.stringify(res));
        // dispatchAuth({ type: "LOGIN", })
        console.log(res);
        // setAuth(res);

        if (location?.pathname === FRONTEND_URL.auth)
          history.push(FRONTEND_URL.home);
      }
    } catch (e) {
      localStorage.removeItem(AUTH_KEY);
      throw e;
    }
  };

  useEffect(() => {
    if (jsonizedToken?.token) {
      console.log(jsonizedToken);
      // setAuth(jsonizedToken);
    } else {
      history.push(FRONTEND_URL.auth);
    }
  }, [history]);

  const signOut = () => {
    // setAuth({});
    localStorage.removeItem(AUTH_KEY);
    history.push(FRONTEND_URL.auth);
    window.location.reload();
  };

  const authContext = {
    auth,
    signOut,
    login: callLogin,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
