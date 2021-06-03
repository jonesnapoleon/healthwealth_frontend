import React from "react";
import "./style.css";

const Snackbar = ({ text, type = "danger" }) => {
  return text ? (
    <div className="snackbar-wrapper">
      <div class={`alert alert-${type}`} role="alert">
        {text}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Snackbar;
