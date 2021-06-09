import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFile } from "../../helpers/hooks";
import DragDrop from "../commons/ImageUpload/DragDrop";
import "./main.css";
import icon from "../../assets/images/Upload Document Icon.svg";
import FloatingButton from "./commons/FloatingButton";

const SelectDocument = ({ activeItem, setActiveItem, availableLevel }) => {
  const { t } = useTranslation();
  const data = useFile();

  const handleUploadFile = () => {
    console.log("f");

    setActiveItem(1);
  };

  return (
    <div className="container sign-select-document-container">
      <h4 className="">{t("sign.selectDocument.whatNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.selectDocument.text")}</div>
      <DragDrop data={data} />

      <div className="mt-5 lead mb-2">
        {t("sign.selectDocument.docsUSelected")}
      </div>
      {data?.file ? (
        <div className="item-left">
          <img src={icon} alt="" />
          <div className="px-2">{data?.file?.name}</div>
        </div>
      ) : (
        "-"
      )}

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
