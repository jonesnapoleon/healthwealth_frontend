import React from "react";
import { useTranslation } from "react-i18next";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import "./index.scss";
import { useModal } from "contexts/ModalContext";
import { useFormInput } from "helpers/hooks";
import { useHistory } from "react-router";
import { FRONTEND_URL } from "helpers/constant";

const FasterThanPrinting = () => {
  const { t } = useTranslation();
  const { openSendWhatsapp } = useModal();

  return (
    <div className="faster-than-printing-container">
      <h5 className="head">{t("popup.wa.fasterThan")}</h5>
      <div className="desc">
        <div>{t("popup.wa.docsBeenSent")}</div>
        <div>{t("popup.wa.checkTheStatus")}</div>
      </div>
      <hr />
      <div className="desc">
        <div>{t("popup.wa.easyReq")}</div>
      </div>
      <div>
        <button className="send-wa" onClick={() => openSendWhatsapp()}>
          <WhatsAppIcon className="success-color" />

          <span>{t("popup.wa.sendViaWA")}</span>
        </button>
      </div>
    </div>
  );
};

export default FasterThanPrinting;

export const SendWhatsapp = () => {
  const { t } = useTranslation();
  const name = useFormInput("");
  const wa = useFormInput("");

  const { push } = useHistory();

  return (
    <div className="send-whatsapp-container">
      <div className="top">{t("popup.wa.sendFaster")}</div>
      <div className="input-area d-flex justify-content-between align-items-center">
        <input {...name} />
        <input {...wa} />
      </div>
      <div className="bottom-text-area">
        <span className="">
          <WhatsAppIcon />
        </span>
        <span className="mx-2">
          {t("popup.wa.template1")} {name?.value}
          {t("popup.wa.template2")} {wa?.value}
        </span>
      </div>
      <div className="mt-5 item-right">
        <button
          className="btn btn-black squared"
          onClick={() => {
            if (name?.value !== "" && wa.value !== "") {
              window.open(
                `https://api.whatsapp.com/send?phone=${decodeURIComponent(
                  wa.value
                )}&text=${decodeURIComponent(name.value)}`
              );
              setTimeout(() => push(FRONTEND_URL.docs), 3000);
            }
          }}
        >
          {t("general.send")}
        </button>
      </div>
    </div>
  );
};
