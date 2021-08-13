// import FasterThanPrinting from "components/@Sign/commons/FasterThanPrinting";
// import ModalStucture from "components/@Sign/commons/ModalStructure";
import VerifySignature from "components/@Sign/commons/VerifySignature";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import SignatureModal from "../../commons/SignatureModal";
import "./signature.scss";

const Signature = () => {
  const { t } = useTranslation();
  const { setInnerComponent, show, backgroundColor, size, bg } = useModal();

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
            setInnerComponent(<VerifySignature />);
            size?.set("unset");
            backgroundColor?.set("white");
            bg?.set("light");
            show?.set(true);
          }}
        />
      </div>
    </div>
  );
};

export default Signature;

// setInnerComponent(<ModalStucture />);
//             size?.set("small");
//             backgroundColor?.set("white");
//             bg?.set("light");
//             show?.set(true);
