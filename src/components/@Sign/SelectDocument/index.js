import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFile,
  useRefreshedData,
  useProgressBar,
} from "../../../helpers/hooks";

import DragDrop from "../../commons/ImageUpload/DragDrop";
import FloatingButton from "../commons/FloatingButton";
import Snackbar from "../../commons/Snackbar";
import Progressbar from "../../../components/commons/Progressbar";

import { ReactComponent as DocumentIcon } from "../../../assets/images/Upload Document Icon.svg";
import { ReactComponent as DeleteDocumentIcon } from "../../../assets/images/Delete Upload Document Icon.svg";

import { uploadFile, deleteFile } from "../../../api/upload";
import { addDoc } from "../../../api/docs";
import { isFileValid } from "../../../helpers/validator";

import "./selectDocument.css";

const SelectDocument = ({
  activeItem,
  setActiveItem,
  availableLevel,
  setAvailableItem,
  setFileUrl,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const data = useFile();
  const progress = useProgressBar();
  const loading = useRefreshedData(!data?.file);

  const handleUploadFile = useCallback(async () => {
    if (!data?.file || data?.file === null) return;
    if (progress.value !== 0) return;
    // throw new Error(t("form.error.fileNotUploadedYet"));
    try {
      const bool = isFileValid(data?.file, [".pdf", ".docx"], 3000);
      if (bool) {
        progress.set(1);
        const res = await uploadFile(data?.file);
        if (res) {
          const newRes = await addDoc(res?.url, data?.file?.name);
          if (newRes) {
            setFileUrl(newRes?.linkToPdf);
            setAvailableItem((a) => a + 1);
            progress.set(100);
          }
        }
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  }, [data?.file, setFileUrl, setAvailableItem, progress]);

  useEffect(() => {
    handleUploadFile();
  }, [handleUploadFile]);

  const handleDeleteFile = async () => {
    try {
      if (!data?.file || data?.file === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const bool = isFileValid(data?.file, [".pdf", ".docx"], 3000);
      if (bool) {
        progress.set(1);
        const res = await deleteFile(data?.file);
        if (res) {
          console.log(res);
          progress.set(100);
        }
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="container container-center sign-select-document-container">
      {error && <Snackbar text={error} />}
      <h4 className="">{t("sign.selectDocument.whatNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.selectDocument.text")}</div>
      <DragDrop data={data} />

      <div className="mt-5 lead mb-2">
        {t("sign.selectDocument.docsUSelected")}
      </div>
      {data?.file ? (
        <>
          <div className="item-left">
            <DocumentIcon />
            <div className="px-2">{data?.file?.name}</div>
            <div className="mx-2 cursor-pointer">
              <DeleteDocumentIcon onClick={handleDeleteFile} />
            </div>
          </div>
          <div className="mt-3">
            <Progressbar progress={progress.value} />
          </div>
        </>
      ) : (
        "-"
      )}

      <FloatingButton
        activeItem={activeItem}
        availableLevel={availableLevel}
        onClickNext={() => {
          setActiveItem(1);
        }}
        loading={loading?.value}
      />
    </div>
  );
};

export default SelectDocument;
