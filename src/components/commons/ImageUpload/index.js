import React, { useEffect, useState } from "react";

import "./imageupload.scss";

const ImageUpload = ({ meta, data, onClick, currentFile }) => {
  const { icon, head, desc, isUpload, isEdit, isSelfie } = meta;

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isUpload && data?.filePicker?.current) {
      data.filePicker.current.onchange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) data?.setFile(newFile);
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => setUrl(reader.result);
      };
    }
  }, [data, isUpload]);

  useEffect(() => {
    if (!data?.file || data?.file === null) {
      setUrl(false);
    }
  }, [data?.file, setUrl]);

  const imageToShow = isUpload ? url : data?.value;

  const ImageGetInput = () => (
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
      <div>{icon}</div>
    </>
  );

  const getImage = () => {
    if (isSelfie && data?.value)
      return <img src={data?.value} alt="" className="showing-image" />;
    if (isSelfie || (isEdit && !imageToShow)) return <ImageGetInput />;
    if (!isEdit && currentFile)
      return (
        <>
          <img src={currentFile} alt="" className="showing-image" />
        </>
      );
    return (
      <>
        {isUpload && (
          <input
            type="file"
            style={{ display: "none" }}
            ref={data?.filePicker}
            accept="image/*"
          />
        )}
        <img src={imageToShow} alt="" className="showing-image" />
      </>
    );
  };

  return (
    <div
      className="image-upload-container"
      onClick={isUpload ? () => data?.filePicker?.current?.click() : onClick}
    >
      {getImage()}
    </div>
  );
};

export default ImageUpload;
