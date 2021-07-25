import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { useTranslation } from "react-i18next";
import { useCheckbox } from "../../../helpers/hooks";

import "./signaturemodal.scss";

const SignatureModal = () => {
  const { t } = useTranslation();
  const [imageURL, setImageURL] = useState(null);
  const [tab, setTab] = useState(0);
  const checkbox = useCheckbox();

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <>
      <div className="row whole-signature-modal">
        <div className="col col-3">
          {[
            ["settings.signature.draw"],
            ["settings.signature.upload"],
            ["settings.signature.textText"],
          ].map((text, i) => (
            <div className="tab-area" onClick={() => setTab(i)}>
              X {t(text[0])}
            </div>
          ))}
        </div>
        <div className="col col-9">
          <div className="signature-container">
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signature-canvas",
              }}
            />
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
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between signature-below">
        <div className="left-saying">
          <span>
            <input type="checkbox" {...checkbox} />
            <label>{t("settings.signature.iUnderstand")}</label>
          </span>
        </div>
        <div className="button-container">
          <button onClick={save}>Save</button>
          {/* <button onClick={clear}>Clear</button> */}
        </div>
      </div>
    </>
  );
};
export default SignatureModal;
