import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
// import { useModal } from "contexts/ModalContext";
import { useFormInput, useInput, useOTP } from "helpers/hooks";
import OTPInput from "components/commons/OTPInput";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { sendOTPDoc, verifyOTPDoc } from "api/docs";

const VerifySignature = (props) => {
  console.log(props);
  const { onClickCTA, fileUID } = props;
  const { t } = useTranslation();
  const { auth } = useAuth();
  const phone = useFormInput(auth?.phone);
  const isSentPhone = useInput(false);
  const otp = useOTP(6);
  const [loading, setLoading] = useState(false);
  const { addSnackbar } = useSnackbar();

  const sendOTPToPhone = async () => {
    try {
      setLoading(true);
      const res = await sendOTPDoc(fileUID, phone?.value);
      if (res) {
        addSnackbar(t("popup.sign.verify.success1"), "success");
        isSentPhone?.set(true);
      }
    } catch (err) {
      addSnackbar(String(err));
    } finally {
      setLoading(!true);
    }
  };

  // const verifyOTPWrap = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await verifyOTP();
  //     if (res) {
  //       setLoading(1);
  //       addSnackbar(t("popup.verify.success"), "success");
  //       isSentPhone?.set(true);
  //       setCanSend(true)
  //     }
  //   } catch (err) {
  //     addSnackbar(String(err));
  //   } finally {
  //     setLoading(!true);
  //   }
  // };

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
            onClick={sendOTPToPhone}
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
          <button
            className="btn btn-light squared"
            disabled={!phone?.value}
            onClick={sendOTPToPhone}
          >
            {t("popup.sign.verify.resend")}
          </button>
        </div>
      </div>
      <div className="button-below">
        <button
          className="btn btn-primary squared"
          disabled={loading || String(otp?.number).length < 6}
          onClick={async () => {
            try {
              setLoading(true);
              const res = await verifyOTPDoc(
                fileUID,
                otp?.number,
                auth?.id_token
              );
              if (res) {
                onClickCTA();
                addSnackbar(t("popup.verify.success2"), "success");
                isSentPhone?.set(true);
              }
            } catch (err) {
              addSnackbar(String(err));
            } finally {
              setLoading(!true);
            }
          }}
        >
          {t("general.submit")}
        </button>
      </div>
    </div>
  );
};

export default VerifySignature;
