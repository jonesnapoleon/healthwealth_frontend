import React from "react";
import "./snackbar.scss";

const Snackbar = ({ text, type = "danger" }) => {
  return text ? (
    <div className="snackbar-wrapper">
      <div className={`alert alert-${type}`} role="alert">
        {text}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Snackbar;
