import React from "react";
import Sidebar from "../../layout/Sidebar";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="home-wrapper container-xl mt-4">
      <div className="row">
        <div className="col-xl-2 col-lg-3 col-md-3">
          <Sidebar />
        </div>
        <div className="col-xl-10 col-lg-9 col-md-9">
          <div className="row item-center">
            <div className="col-xl-11 col-lg-12">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
