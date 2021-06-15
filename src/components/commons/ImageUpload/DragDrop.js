import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import icon from "../../../assets/bnw/Upload Document Icon.svg";
import "./imageupload.css";
import DragDropClass from "./DragDropClass";

const DragDrop = ({ data, disabled }) => {
  const { setFile, filePicker } = data;
  const { t } = useTranslation();

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) setFile(newFile);
    };
  }, [filePicker, setFile]);

  const handleDrop = (file) => {
    if (!disabled && file) setFile(file[0]);
  };

  return (
    <DragDropClass handleDrop={handleDrop}>
      <div className="drag-drop-container">
        <div>
          <button
            className="btn btn-light primary-color upload-button"
            disabled={disabled}
            onClick={() => {
              if (!disabled && filePicker) {
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
        <input
          type="file"
          ref={filePicker}
          style={{ display: "none" }}
          disabled={disabled}
        />
      </div>
    </DragDropClass>
  );
};

export default DragDrop;
