import React from "react";
import { useTranslation } from "react-i18next";
import DragDrop from "../commons/ImageUpload/DragDrop";
import "./main.css";

const SelectDocument = () => {
  const { t } = useTranslation();
  return (
    <div className="container sign-select-document-container">
      <div className="lead">{t("sign.selectDocument.whatNeed")}</div>
      <div className="mt-5">{t("sign.selectDocument.text")}</div>
      <DragDrop />
    </div>
  );
};

export default SelectDocument;
