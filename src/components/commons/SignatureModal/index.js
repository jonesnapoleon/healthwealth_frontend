import React, { useState, useRef, useMemo } from "react";
import SignaturePad from "react-signature-canvas";
import { useTranslation } from "react-i18next";
import {
  useCheckbox,
  useFile,
  useFormInput,
  useProgressBar,
} from "../../../helpers/hooks";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import "./signaturemodal.scss";
import DragDropWithProgressBar from "../ImageUpload/DragDropWithProgressBar";
import { isFileValid } from "helpers/validator";
import { Snackbar } from "@material-ui/core";
import BasicInputLabel, { BasicSelect } from "../InputLabel/basic";
import { FONTLIST } from "helpers/constant";

const TextWrite = ({ t, formItemData, fontData }) => {
  return (
    <>
      <BasicInputLabel label={t("form.name")} data={formItemData} />
      <BasicInputLabel
        label={t("form.preview")}
        isShow
        data={formItemData}
        fontFamily={fontData?.value}
      />
      <BasicSelect data={fontData} label={t("form.font")} list={FONTLIST} />
    </>
  );
};

const SignatureModal = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const checkbox = useCheckbox();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imageURL, setImageURL] = useState(null);
  const signCanvas = useRef({});
  const clear = () => signCanvas.current?.clear();

  const data = useFile();
  const progress = useProgressBar();

  const formItemData = useFormInput("");

  const fontData = useFormInput(FONTLIST[0][0]);
  const formItemDisplay = useMemo(
    () => (
      <span
        className="form-item-display"
        style={{ fontFamily: fontData?.value }}
      >
        {formItemData?.value}
      </span>
    ),
    [formItemData, fontData]
  );

  const save = () => {
    if (tab === 0)
      setImageURL(signCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    if (tab === 1) handleUploadFile();
  };

  const handleUploadFile = async () => {
    if (!data?.file || data?.file === null) return;
    if (progress.value !== 0) return;
    // throw new Error(t("form.error.fileNotUploadedYet"));
    try {
      const bool = isFileValid(data?.file, [".pdf", ".docx"], 3000);
      if (bool) {
        progress.set(1);
        let res;
        //   res = await addDoc(
        //     data?.file,
        //     data?.file?.name,
        //     String(atr).toUpperCase()
        //   );
        //   if (res?.data) {
        //     handle_data_docs(true, atr, "fileData", res.data);
        //     setAvailableItem((a) => a + 1);
        //     progress.set(100);
        //     setSuccess(t("sign.selectDocument.uploadFileSuccess"));
        //     setTimeout(() => setSuccess(false), 3000);
        //   }
      }
    } catch (err) {
      setError(String(err));
      progress.set(-1);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleDeleteFile = async () => {
    // try {
    //   if (!fileData?.id || fileData?.id === null)
    //     throw new Error(t("form.error.fileNotUploadedYet"));
    //   const res = await deleteDoc(fileData?.id);
    //   if (res?.data) {
    //     data?.setFile(null);
    //     data?.filePicker.current.focus();
    //     data.filePicker.current.value = null;
    //     handle_data_docs(false, atr, "fileData");
    //     progress.set(0);
    //     setSuccess(t("sign.selectDocument.deleteFileSuccess"));
    //     setTimeout(() => setSuccess(false), 3000);
    //   }
    // } catch (err) {
    //   progress.set(-1);
    //   setError(String(err));
    //   setTimeout(() => setError(false), 3000);
    // }
  };

  return (
    <>
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="success" text={success} />}

      <div className="row whole-signature-modal">
        <div className="col col-3">
          {[
            ["settings.signature.draw", <EditIcon />],
            ["settings.signature.upload", <CloudUploadIcon />],
            ["settings.signature.textText", <TextFieldsIcon />],
          ].map((text, i) => (
            <div className="tab-area" key={i} onClick={() => setTab(i)}>
              {text[1]}
              <span>{t(text[0])}</span>
            </div>
          ))}
        </div>
        <div className="col col-9">
          <div className="signature-container">
            {tab === 0 && (
              <>
                <SignaturePad
                  ref={signCanvas}
                  canvasProps={{
                    className: "signature-canvas",
                  }}
                />
                <div className="handle-text">
                  <div className="edit-icon">
                    <EditIcon />
                  </div>
                  <hr />
                </div>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="my signature"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      border: "1px solid black",
                      width: "150px",
                    }}
                  />
                )}
              </>
            )}

            {tab === 1 && (
              <div className="dd-wpb-container">
                <DragDropWithProgressBar
                  data={data}
                  handleDeleteFile={handleDeleteFile}
                  progress={progress}
                />
              </div>
            )}

            {tab === 2 && (
              <div className="signature-popup-text-container">
                <TextWrite
                  formItemData={formItemData}
                  t={t}
                  fontData={fontData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center signature-below">
        <div className="left-saying">
          <span>
            <input type="checkbox" {...checkbox} />
            <label>{t("settings.signature.iUnderstand")}</label>
          </span>
        </div>
        <div className="button-container">
          <button onClick={save} className="btn btn-black circled">
            Save
          </button>
          {/* <button onClick={clear}>Clear</button> */}
        </div>
      </div>
    </>
  );
};
export default SignatureModal;
