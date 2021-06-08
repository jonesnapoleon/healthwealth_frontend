import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AUTH_KEY } from "./helpers/constant";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

var token = window.localStorage.getItem(AUTH_KEY);
var jsonizedToken = JSON.parse(token);

if (token && token?.id_token) {
  axios.defaults.headers["Authorization"] = `Bearer ${jsonizedToken?.id_token}`;
}

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
