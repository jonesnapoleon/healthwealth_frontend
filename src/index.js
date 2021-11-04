import React from "react";
import ReactDOM from "react-dom";
import App from "./base/App";
import axios from "axios";
import { AUTH_KEY } from "./utils/constant";
import { FRONTEND_URL } from "./utils/constant/routeList";
import { isTimeInMsBeforeNow } from "./utils/validator";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["Content-Type"] = "application/json";

var token = window.localStorage.getItem(AUTH_KEY);
var jsonizedToken = JSON.parse(token);

// if (jsonizedToken && !isTimeInMsBeforeNow(jsonizedToken?.expires_at)) {
//   window.location.pathname = FRONTEND_URL.login;
//   localStorage.removeItem(AUTH_KEY);
// }

// if (jsonizedToken && jsonizedToken?.id_token) {
//   axios.defaults.headers[
//     process.env.REACT_APP_TOKEN_HEADER
//   ] = `${jsonizedToken?.id_token}`;
// }

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

ReactDOM.render(
  <App />,
  // <React.StrictMode>
  // </React.StrictMode>
  document.getElementById("root")
);
