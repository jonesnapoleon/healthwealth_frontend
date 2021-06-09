import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import icon from "../../../assets/images/Upload Document Icon.svg";
import "./imageupload.css";
import DragDropClass from "./DragDropClass";

const DragDrop = ({ data }) => {
  const { file, setFile, filePicker } = data;
  const { t } = useTranslation();

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) setFile(newFile);
      //   else setSnackbarData({ open: true, text: "Upload file failed" });
    };
  }, [filePicker, setFile]);

  const handleDrop = (file) => {
    if (file) setFile(file);
    // else setSnackbarData({ open: true, text: "Upload file failed" });
  };

  return (
    <DragDropClass handleDrop={handleDrop}>
      <div className="drag-drop-container">
        <div>
          <button
            className="btn btn-light primary-color upload-button"
            onClick={() => {
              if (filePicker) {
                filePicker.current.click();
              }
            }}
          >
            {t("form.uploadFile")}
          </button>
        </div>
        <div className="item-center drag-drop-area">
          <img src={icon} alt="" />
          <div>{t("form.dragDrop")}</div>
        </div>
        <input type="file" ref={filePicker} style={{ display: "none" }} />
      </div>
    </DragDropClass>
  );
};

export default DragDrop;
