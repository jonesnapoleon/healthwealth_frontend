import React, { useEffect, useState } from "react";

import "./imageupload.css";

const ImageUpload = ({ meta, data, onClick, currentFile }) => {
  const { icon, head, desc, isUpload } = meta;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isUpload && data?.filePicker?.current) {
      data.filePicker.current.onchange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) data?.setFile(newFile);
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => {
          setUrl(reader.result);
        };
      };
    }
  }, [data, isUpload]);

  const imageToShow = isUpload ? url : data?.value;

  return (
    <div
      className="image-upload-container"
      onClick={isUpload ? () => data?.filePicker?.current?.click() : onClick}
    >
      {currentFile ? (
        <img src={currentFile} alt="" className="showing-image" />
      ) : imageToShow ? (
        <img src={imageToShow} alt="" className="showing-image" />
      ) : (
        <>
          <div>
            <div>{head}</div>
            <div>{desc}</div>
            {isUpload && (
              <input
                type="file"
                style={{ display: "none" }}
                ref={data?.filePicker}
                accept="image/*"
              />
            )}
          </div>
          <div>
            <img src={icon} alt="" />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
