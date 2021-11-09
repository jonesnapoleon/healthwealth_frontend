import React from "react";
import ReactDOM from "react-dom";
import App from "./base/App";
import axios from "axios";
import { AUTH_KEY } from "./utils/constant";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.headers["Content-Type"] = "application/json";

var token = window.localStorage.getItem(AUTH_KEY);
var jsonizedToken = JSON.parse(token);

if (jsonizedToken && jsonizedToken?.token)
  axios.defaults.headers["Authorization"] = `Bearer ${jsonizedToken.token}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem(AUTH_KEY);
      window.location.reload();
    }
    throw error;
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

ReactDOM.render(<App />, document.getElementById("root"));
