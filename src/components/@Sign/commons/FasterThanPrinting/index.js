import React from "react";
import { useTranslation } from "react-i18next";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import "./index.scss";
import { useModal } from "contexts/ModalContext";
import { useFormInput, useInput } from "helpers/hooks";
import { useHistory } from "react-router";
import { FRONTEND_URL } from "helpers/constant";
import { openWA } from "helpers/action";
import { useAuth } from "contexts/AuthContext";

const FasterThanPrinting = ({ finalUrl }) => {
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
        <button
          className="send-wa"
          onClick={() => openSendWhatsapp({ finalUrl })}
        >
          <WhatsAppIcon className="success-color" />
          <span>{t("popup.wa.sendViaWA")}</span>
        </button>
      </div>
    </div>
  );
};

export default FasterThanPrinting;

export const SendWhatsapp = ({ finalUrl }) => {
  const { t } = useTranslation();
  const name = useFormInput("");
  const wa = useFormInput("");

  const { push } = useHistory();
  const { onClose } = useModal();

  return (
    <div className="send-whatsapp-container">
      <div className="top">{t("popup.wa.sendFaster")}</div>
      <div className="input-area d-flex justify-content-between align-items-center">
        <input {...name} placeholder="Receiver name" />
        <input {...wa} placeholder="Phone number" />
      </div>
      <div className="bottom-text-area">
        <span className="">
          <WhatsAppIcon />
        </span>
        <span className="mx-2">
          {t("popup.wa.template1")} {name?.value}
          {t("popup.wa.template2")} {finalUrl}
        </span>
      </div>
      <div className="mt-5 item-right">
        <button
          className="btn btn-black squared"
          onClick={async () => {
            if (name?.value !== "" && wa.value !== "") {
              openWA(
                wa.value,
                name.value,
                t("popup.wa.template1"),
                t("popup.wa.template2"),
                finalUrl
              );
              onClose();
              push(FRONTEND_URL.docs);
            }
          }}
        >
          {t("general.send")}
        </button>
      </div>
    </div>
  );
};

export const WasntThatEasy = () => {
  const { t } = useTranslation();
  const email = useInput();
  const { signOut } = useAuth();

  return (
    <div className="send-whatsapp-container p-3 pb-0">
      <div className="top mt-4">
        <h5 className="text-center primary-color">
          <strong>{t("popup.wa.wasntThatEasy")}</strong>
        </h5>
      </div>
      <div className="mt-3 mb-3 text-center">
        {t("popup.wa.was1")}
        <br /> <span className="primary-color">3 free</span>{" "}
        {t("popup.wa.was2")}
      </div>

      <div className="ml-4 mr-4">
        <div
          className="body mr-5 ml-5 mt-4 mb-4 p-4"
          style={{ background: "var(--secondary-extra-color-4)" }}
        >
          <div
            className="w-100"
            style={{ display: "grid", placeItems: "center" }}
          >
            <div>
              <div className="text-left mb-1">{t("popup.wa.act")}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <input
                  {...email}
                  type="email"
                  required
                  style={{ padding: ".3rem 1rem" }}
                />
                <span>
                  <button
                    className="btn btn-primary btn-sm "
                    type="submit"
                    style={{ marginLeft: "1rem", padding: ".25rem .5rem" }}
                  >
                    Submit
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <small
        className="small-bottom text-center"
        style={{ fontSize: "0.7rem" }}
      >
        {t("popup.wa.ty")}
      </small>
      <style>
        {`
          .react-responsive-modal-modal.react-responsive-modal-modalCenter {
            border: 2px solid var(--tertiary-color);
          }
          `}
      </style>
    </div>
  );
};
