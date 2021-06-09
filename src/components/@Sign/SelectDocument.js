import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile } from "../../helpers/hooks";
import DragDrop from "../commons/ImageUpload/DragDrop";
import "./main.css";
import icon from "../../assets/images/Upload Document Icon.svg";
import FloatingButton from "./commons/FloatingButton";
import Snackbar from "../commons/Snackbar";

import { uploadFile } from "../../api/upload";
import { isFileValid } from "../../helpers/validator";

const SelectDocument = ({
  activeItem,
  setActiveItem,
  availableLevel,
  setFileUrl,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const data = useFile();

  const handleUploadFile = async () => {
    setLoading(true);
    try {
      if (!data?.file || data?.file === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const bool = isFileValid(data?.file, [".pdf", ".docx", ".png"], 3000);
      if (bool) {
        const res = await uploadFile(data?.file);
        setFileUrl(res.url);
        setActiveItem(1);
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container sign-select-document-container">
      {error && <Snackbar text={error} />}
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
          loading={loading}
          t={t}
        />
      )}
    </div>
  );
};

export default SelectDocument;
