import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFile, useProgressBar } from "../../../helpers/hooks";
import { useData } from "../../../contexts/DataContext";

import DragDrop from "../../commons/ImageUpload/DragDrop";
import FloatingButton from "../commons/FloatingButton";
import Progressbar from "../../../components/commons/Progressbar";

import { deleteDoc, addDoc, replaceDoc } from "../../../api/docs";
import { isFileValid } from "../../../helpers/validator";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "./selectDocument.scss";
import { useSnackbar } from "contexts/SnackbarContext";
import { useHistory } from "react-router-dom";
import Footer from "components/layout/Navbar/Footer";

const SelectDocument = ({ atr, activeItemId }) => {
  const { t } = useTranslation();
  const { addSnackbar } = useSnackbar();
  const data = useFile();
  const { handle_data_docs, getItemData, setDocs } = useData();
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);

  const fileData = getItemData(atr, "fileData");

  const progress = useProgressBar();

  const shallNext = () => {
    if (fileData) return false;
    return progress.value !== 100;
  };

  const handleUploadFile = useCallback(async () => {
    if (!data.file || data.file === undefined || data.file === null) return;
    if (progress.value !== 0) return;
    if (loading) return;

    try {
      const bool = isFileValid(data?.file, [".pdf", ".docx"], 3000);
      if (bool) {
        setLoading(true);
        progress.set(1);
        let res;
        if (fileData?.uid) {
          res = await replaceDoc(
            data?.file,
            data?.file?.name,
            fileData.uid,
            String(atr).toUpperCase()
          );
        } else {
          res = await addDoc(
            data?.file,
            data?.file?.name,
            String(atr).toUpperCase()
          );
        }
        if (res?.data) {
          handle_data_docs(true, atr, "fileData", res.data);
          setDocs((docs) => {
            if (docs) {
              return [res.data, ...docs];
            } else return docs;
          });
          progress.set(100);
          addSnackbar(t("sign.selectDocument.uploadFileSuccess"), "success");
        }
      }
    } catch (err) {
      addSnackbar(String(err));
      progress.set(-1);
    } finally {
      setLoading(false);
    }
  }, [
    data?.file,
    handle_data_docs,
    progress,
    t,
    setDocs,
    fileData,
    atr,
    addSnackbar,
    loading,
    setLoading,
  ]);

  useEffect(() => {
    handleUploadFile();
  }, [handleUploadFile]);

  const handleDeleteFile = async () => {
    try {
      if (!fileData?.uid || fileData?.uid === null)
        throw new Error(t("form.error.fileNotUploadedYet"));
      const fileUid = fileData?.uid;
      const res = await deleteDoc(fileUid);
      if (res?.data) {
        data?.setFile(null);
        data?.filePicker.current.focus();
        data.filePicker.current.value = null;
        handle_data_docs(false, atr, "fileData");
        progress.set(0);
        setDocs((docs) => {
          if (docs) {
            return docs.filter((doc) => doc?.uid === fileUid);
          } else return docs;
        });
        addSnackbar(t("sign.selectDocument.deleteFileSuccess"), "success");
      }
    } catch (err) {
      progress.set(-1);
      addSnackbar(String(err));
    }
  };

  return (
    <>
      <div className="container container-center sign-select-document-container">
        <div className="first-child">
          <h4 className="bold">{t("sign.selectDocument.whatNeed")}</h4>
          <div className="mt-5 bold mb-2">{t("sign.selectDocument.text")}</div>
          <DragDrop
            data={data}
            progress={progress}
            // disabled={progress.value === 100}
          />

          <div className="mt-5 bold mb-2">
            {t("sign.selectDocument.docsUSelected")}
          </div>
          {fileData && !data?.file && (
            <>
              <div className="item-left">
                <DescriptionRoundedIcon className="file-icon" />
                <div className="px-2">{fileData?.filename}</div>
                <div className="mx-2 cursor-pointer">
                  <CancelRoundedIcon
                    onClick={handleDeleteFile}
                    className="delete-red"
                  />
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
                <DescriptionRoundedIcon className="file-icon" />
                <div className="px-2">{data?.file?.name}</div>
                <div className="mx-2 cursor-pointer">
                  <CancelRoundedIcon
                    className="delete-red"
                    onClick={handleDeleteFile}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Progressbar progress={progress.value} />
              </div>
            </>
          )}
        </div>

        <FloatingButton
          onClickNext={() => {
            push(`${atr}#${activeItemId + 1}`);
          }}
          disabled={shallNext()}
        />
      </div>
      <Footer />
    </>
  );
};

export default SelectDocument;
