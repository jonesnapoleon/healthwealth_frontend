import React from "react";

import "./imageupload.css";

const ImageUpload = ({ meta }) => {
  const { icon, head, desc, isUpload } = meta;
  return (
    <div className="image-upload-container">
      <div>
        <div>{head}</div>
        <div>{desc}</div>
      </div>
      <div>
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

export default ImageUpload;
