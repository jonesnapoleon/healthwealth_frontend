import React from "react";
import { useAuth } from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import EditIcon from "@material-ui/icons/EditRounded";
import "./signature.scss";

const Signature = () => {
  const { t } = useTranslation();
  const { openSignatureModal } = useModal();
  const { auth } = useAuth();

  const handleInitialSignatureClick = (isInitial) => {
    openSignatureModal({ isInitial });
  };

  return (
    <div className="signature-page-container">
      <div>
        <div className="head bold">
          {t("settings.signature.text")}
          {auth?.signature && (
            <EditIcon
              className="cursor-pointer"
              onClick={() => handleInitialSignatureClick(false)}
            />
          )}
        </div>
        {(!auth?.signature || auth?.signature === null) && (
          <ModalSign
            meta={{ head: t("settings.signature.addSignature") }}
            onClick={() => handleInitialSignatureClick(false)}
          />
        )}
        <div className="parent">
          {auth?.signature && (
            <img
              src={auth?.signature}
              className="non-initial-signature"
              alt=""
            />
          )}
        </div>
      </div>
      <div>
        <div className="head bold">
          {t("settings.signature.initial")}
          {auth?.initial && (
            <EditIcon
              className="cursor-pointer"
              onClick={() => handleInitialSignatureClick(true)}
            />
          )}
        </div>
        {(!auth?.initial || auth?.initial === null) && (
          <ModalSign
            meta={{ head: t("settings.signature.addInitials") }}
            onClick={() => handleInitialSignatureClick(true)}
          />
        )}
        <div className="parent">
          {auth?.initial && (
            <img className="non-initial-signature" src={auth?.initial} alt="" />
          )}
        </div>
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
