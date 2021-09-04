import React from "react";
import OpenCam from "./OpenCam";

const TakePhoto = ({ data }) => {
  return (
    <div className="articles">
      <OpenCam imageDataURL={data} />
    </div>
  );
};

export default TakePhoto;
