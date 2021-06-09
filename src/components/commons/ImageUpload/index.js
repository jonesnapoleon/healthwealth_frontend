import React from "react";

import "./imageupload.css";

const ImageUpload = ({ meta, data, onClick }) => {
  const { icon, head, desc } = meta;

  return (
    <div className="image-upload-container" onClick={onClick}>
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
