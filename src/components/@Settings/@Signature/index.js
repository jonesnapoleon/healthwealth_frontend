import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import SignatureModal from "../../commons/SignatureModal";
import "./signature.css";

const Signature = () => {
  const { t } = useTranslation();
  const { setInnerComponent, show } = useModal();

  return (
    <div className="signature-container">
      <div>
        <div className="lead">{t("settings.signature.text")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addSignature") }}
          onClick={() => {
            setInnerComponent(<SignatureModal />);
            show?.set(true);
          }}
        />
      </div>
      <div>
        <div className="lead">{t("settings.signature.initial")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addInitials") }}
          onClick={() => {
            setInnerComponent(<SignatureModal />);
            show?.set(true);
          }}
        />
      </div>
    </div>
  );
};

export default Signature;
