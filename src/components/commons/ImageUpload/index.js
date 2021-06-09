import React from "react";

import "./imageupload.css";

const ImageUpload = ({ meta, data }) => {
  const { icon, head, desc, isUpload } = meta;
  return (
    <div className="image-upload-container">
      <div>
        <div>{head}</div>
        {isUpload}
        <div>{desc}</div>
      </div>
      <div>
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

export default ImageUpload;
