import React from "react";
import { useTranslation } from "react-i18next";

import icon from "../../../assets/images/Upload Document Icon.svg";
import "./imageupload.css";

const DragDrop = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="drag-drop-container">
      <div>
        <button className="btn btn-secondary" onClick={() => {}}>
          {t("form.uploadFile")}
        </button>
      </div>
      <div className="item-center drag-drop-area">
        <img src={icon} alt="" />
        <div>{t("form.dragDrop")}</div>
      </div>
    </div>
  );
};

export default DragDrop;
