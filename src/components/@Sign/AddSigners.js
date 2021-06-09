import React from "react";
import { useTranslation } from "react-i18next";
import { useFile } from "../../helpers/hooks";
import FloatingButton from "./commons/FloatingButton";
import "./main.css";
// import DragDrop from "../commons/ImageUpload/DragDrop";
// import icon from "../../assets/images/Upload Document Icon.svg";

const SelectDocument = ({ activeItem, setActiveItem, availableLevel }) => {
  const { t } = useTranslation();
  const data = useFile();

  const handleUploadFile = () => {
    console.log("f");
  };

  return (
    <div className="container sign-select-document-container">
      <h4 className="">{t("sign.addSigners.whoNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.selectDocument.sender")}</div>

      {data?.file && (
        <FloatingButton
          activeItem={activeItem}
          availableLevel={availableLevel}
          onClickNext={handleUploadFile}
          t={t}
        />
      )}
    </div>
  );
};

export default SelectDocument;
