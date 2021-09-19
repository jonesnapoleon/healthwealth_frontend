import React, { useCallback, useEffect, useState } from "react";
import CancelRounded from "@material-ui/icons/CancelRounded";

import "./imageupload.scss";

const ImageUpload = ({
  meta,
  data,
  onDelete,
  onClick,
  currentFile,
  bgOpacity,
}) => {
  const { icon, head, desc, isEdit, isUpload } = meta;

  const [url, setUrl] = useState("");

  const DeleteIcon = () => (
    <CancelRounded
      onClick={onDelete}
      className="hanging-right-icon cursor-pointer ekyc-del-icon"
    />
  );

  const changingFilePicker = useCallback(() => {
    if (data?.filePicker?.current) {
      data.filePicker.current.onchange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) data.setFile(newFile);
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => setUrl(reader.result);
      };
    }
  }, [data]);

  useEffect(() => {
    if (data?.file) {
      const reader = new FileReader();
      reader.readAsDataURL(data?.file);
      reader.onloadend = () => setUrl(reader.result);
    }
  }, [data?.file]);

  useEffect(() => {
    if (!isUpload) return;
    changingFilePicker();
  }, [isUpload, changingFilePicker]);

  useEffect(() => {
    if (!data?.file || data?.file === null) {
      setUrl("");
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
    if (
      (!isUpload && !data?.value && !!!currentFile) ||
      (isUpload && !data?.file && !!!currentFile)
    )
      return <ImageGetInput />;
    if (isUpload && data?.file && url)
      return <img src={url} alt="" className="showing-image" />;
    if (!isUpload && data?.value)
      return <img src={data?.value} alt="" className="showing-image" />;
    if (isEdit && !imageToShow) return <ImageGetInput />;
    if (!isEdit && currentFile)
      return (
        <>
          {/* <input
            type="file"
            style={{ display: "none" }}
            ref={data?.filePicker}
            accept="image/*"
          /> */}
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
      style={{
        backgroundColor: bgOpacity ? "var(--secondary-extra-color-1)" : "",
      }}
      onClick={isUpload ? () => data?.filePicker?.current?.click() : onClick}
    >
      {currentFile && !isEdit && <DeleteIcon />}
      {getImage()}
    </div>
  );
};

export default ImageUpload;
