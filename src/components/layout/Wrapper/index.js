import React from "react";
import Sidebar from "../../commons/Sidebar";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="home-wrapper container mt-4">
      <div className="row">
        <div className="col col-xl-3">
          <Sidebar />
        </div>
        <div className="col col-xl-9">{children}</div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
