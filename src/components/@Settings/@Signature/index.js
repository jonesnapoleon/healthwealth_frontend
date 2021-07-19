import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ImageUpload from "../../commons/ImageUpload";
import SignatureModal from "../../commons/SignatureModal";
import "./signature.css";

const Signature = () => {
  const { t } = useTranslation();
  const { setInnerComponent, show } = useModal();

  return (
    <div className="signature-container">
      <div>
        <div className="lead">{t("settings.signature.text")}</div>
        <ImageUpload
          meta={{
            head: t("settings.signature.addSignature")
          }}
          onClick={() => {
            setInnerComponent(<SignatureModal />);
            show?.set(true);
          }} />
      </div>
      <div>
        <div className="lead">{t("settings.signature.initial")}</div>
        <ImageUpload meta={{ head: t("settings.signature.addInitials") }} />
      </div>
    </div>
  );
};

export default Signature;
