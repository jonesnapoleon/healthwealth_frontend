import FasterThanPrinting from "components/@Sign/commons/FasterThanPrinting";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import SignatureModal from "../../commons/SignatureModal";
import "./signature.scss";

const Signature = () => {
  const { t } = useTranslation();
  const { setInnerComponent, show, showIcon, size, bg } = useModal();

  return (
    <div className="signature-page-container">
      <div>
        <div className="head bold">{t("settings.signature.text")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addSignature") }}
          onClick={() => {
            setInnerComponent(<SignatureModal />);
            show?.set(true);
          }}
        />
      </div>
      <div>
        <div className="head bold">{t("settings.signature.initial")}</div>
        <ModalSign
          meta={{ head: t("settings.signature.addInitials") }}
          onClick={() => {
            setInnerComponent(<FasterThanPrinting />);
            // setInnerComponent(<SignatureModal />);
            size?.set("unset");
            bg?.set("light");
            show?.set(true);
            showIcon?.set(true);
          }}
        />
      </div>
    </div>
  );
};

export default Signature;
