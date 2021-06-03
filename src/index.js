import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

if (process.env.REACT_APP_USE_TOKEN === "true") {
  var token = window.localStorage.getItem("token");
  axios.defaults.headers[process.env.REACT_APP_TOKEN_HEADER_NAME] = token;
}
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
