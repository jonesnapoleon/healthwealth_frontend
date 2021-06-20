import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile, useProgressBar } from "../../../helpers/hooks";
import { useData } from "../../../contexts/DataContext";

import DragDrop from "../../commons/ImageUpload/DragDrop";
import FloatingButton from "../commons/FloatingButton";
import Snackbar from "../../commons/Snackbar";
import Progressbar from "../../../components/commons/Progressbar";

import { ReactComponent as DocumentIcon } from "../../../assets/bnw/Upload Document Icon.svg";
import { ReactComponent as DeleteDocumentIcon } from "../../../assets/bnw/Delete Upload Document Icon.svg";

import { deleteDoc, addDoc, replaceDoc } from "../../../api/docs";
import { isFileValid } from "../../../helpers/validator";
import { getOnlyThePath } from "../../../helpers/transformer";

import "./selectDocument.css";
import { useLocation } from "react-router-dom";

const SelectDocument = ({
  activeItem,
  setActiveItem,
  availableLevel,
  setAvailableItem,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const data = useFile();
  const { fileData, setFileData } = useData();

  const progress = useProgressBar();
  const location = useLocation();
  const parsedPathname = useMemo(
    () => getOnlyThePath(location.pathname),
    [location?.pathname]
  );

  const shallNext = () => {
    if (fileData) return false;
    return progress.value !== 100;
  };

  const handleUploadFile = useCallback(async () => {
    if (!data?.file || data?.file === null) return;
    if (progress.value !== 0) return;
    // throw new Error(t("form.error.fileNotUploadedYet"));
    try {
      const bool = isFileValid(data?.file, [".pdf", ".docx"], 3000);
      if (bool) {
        progress.set(1);
        let res;
        if (fileData) {
          res = await replaceDoc(
            data?.file,
            data?.file?.name,
            fileData.id,
            parsedPathname
          );
        } else {
          res = await addDoc(data?.file, data?.file?.name, parsedPathname);
        }
        if (res?.data) {
          setFileData(res.data);
          setAvailableItem((a) => a + 1);
          progress.set(100);
          setSuccess(t("sign.selectDocument.uploadFileSuccess"));
          setTimeout(() => setSuccess(false), 3000);
        }
      }
    } catch (err) {
      setError(String(err));
      progress.set(-1);
      setTimeout(() => setError(false), 3000);
    }
  }, [
    data?.file,
    setFileData,
    setAvailableItem,
    progress,
    t,
    fileData,
    parsedPathname,
  ]);

  useEffect(() => {
    handleUploadFile();
    return () => handleUploadFile();
  }, [handleUploadFile]);

  const handleDeleteFile = async () => {
    try {
      if (!fileData?.id || fileData?.id === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const res = await deleteDoc(fileData?.id);
      if (res?.data) {
        data?.setFile(null);
        data?.filePicker.current.focus();
        data.filePicker.current.value = null;
        setFileData(null);
        progress.set(0);
        setSuccess(t("sign.selectDocument.deleteFileSuccess"));
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      progress.set(-1);
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="container container-center sign-select-document-container">
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="success" text={success} />}
      <h4 className="">{t("sign.selectDocument.whatNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.selectDocument.text")}</div>
      <DragDrop
        data={data}
        progress={progress}
        // disabled={progress.value === 100}
      />

      <div className="mt-5 lead mb-2">
        {t("sign.selectDocument.docsUSelected")}
      </div>
      {fileData && !data?.file && (
        <>
          <div className="item-left">
            {console.log(fileData)}
            <DocumentIcon />
            <div className="px-2">{fileData?.filename}</div>
            <div className="mx-2 cursor-pointer">
              <DeleteDocumentIcon onClick={handleDeleteFile} />
            </div>
          </div>
          <div className="mt-3">
            <Progressbar progress={100} />
          </div>
        </>
      )}
      {data?.file && (
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
      )}

      <FloatingButton
        activeItem={activeItem}
        // availableLevel={availableLevel}
        onClickNext={() => {
          setActiveItem((a) => a + 1);
        }}
        disabled={shallNext()}
      />
    </div>
  );
};

export default SelectDocument;
