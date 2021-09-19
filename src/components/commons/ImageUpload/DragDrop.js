import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// import icon from "../../../assets/bnw/Upload Document Icon.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./imageupload.scss";
import DragDropClass from "./DragDropClass";

const DragDrop = ({ data, disabled = false, progress }) => {
  const { setFile, filePicker } = data;
  const { t } = useTranslation();

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      progress.set(0);
      if (newFile) setFile(newFile);
    };
  }, [filePicker, setFile, progress]);

  const handleDrop = (file) => {
    if (!disabled && file) {
      progress.set(0);
      setFile(file[0]);
    }
  };

  const [bgOpacity, setBgOpacity] = useState(false);

  return (
    <DragDropClass handleDrop={handleDrop} setBgOpacity={setBgOpacity}>
      <div
        className="drag-drop-container"
        style={{
          backgroundColor: bgOpacity ? "var(--secondary-extra-color-1)" : "",
        }}
      >
        <div>
          <button
            className="btn btn-primary upload-button"
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
          <div className="icon">
            <GetAppIcon />
          </div>
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
