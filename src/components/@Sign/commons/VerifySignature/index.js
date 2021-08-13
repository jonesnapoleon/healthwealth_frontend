import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
// import { useModal } from "contexts/ModalContext";
import { useFormInput, useInput, useOTP } from "helpers/hooks";
import OTPInput from "components/commons/OTPInput";

const VerifySignature = ({ onClickCTA }) => {
  const { t } = useTranslation();
  const phone = useFormInput();
  const isSentPhone = useInput(false);
  const otp = useOTP(6);

  const resendOTP = useCallback(() => {
    console.log("object");
  }, []);

  return (
    <div className="verify-signature-container">
      <h5 className="head">{t("popup.sign.verify.head")}</h5>
      <div className="middle">
        <div>
          <input {...phone} />
        </div>
        <div>
          <button
            className={`btn btn-${
              isSentPhone?.value ? "light" : "success"
            } squared`}
            onClick={() => isSentPhone?.set(true)}
            disabled={isSentPhone?.value}
          >
            {isSentPhone?.value ? t("form.sent") : t("form.send")}
          </button>
        </div>
      </div>
      <div className="sec-mid">
        <div className="text">{t("popup.sign.verify.bacod")}</div>
        <div className="otp">
          <OTPInput otp={otp} autoFocus={!false} />
        </div>
        <div className="resend-button-area">
          <button className="btn btn-light squared" onClick={resendOTP}>
            {t("popup.sign.verify.resend")}
          </button>
        </div>
      </div>
      <div className="button-below">
        <button className="btn btn-primary squared" onClick={onClickCTA}>
          {t("general.submit")}
        </button>
      </div>
    </div>
  );
};

export default VerifySignature;
