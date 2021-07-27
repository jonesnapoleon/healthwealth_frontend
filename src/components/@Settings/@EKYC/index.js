import React from "react";
import "./ekyc.scss";
import PersonalDetail from "./PersonalDetail";
import Picture from "./Picture";

const EKYC = () => {
  return (
    <div className="ekyc-container">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <PersonalDetail />
        </div>
        <div className="col-md-12 col-lg-6">
          <Picture />
        </div>
      </div>
    </div>
  );
};

export default EKYC;
