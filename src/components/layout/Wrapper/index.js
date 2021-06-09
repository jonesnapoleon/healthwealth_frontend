import React from "react";
import Sidebar from "../../layout/Sidebar";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="home-wrapper container-xl mt-4">
      <div className="row">
        <div className="  col-xl-3 col-lg-3 col-md-3">
          <Sidebar />
        </div>
        <div className="col-xl-9 col-lg-9 col-md-9">{children}</div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
