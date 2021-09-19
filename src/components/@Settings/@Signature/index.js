import React from "react";
import { useAuth } from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../contexts/ModalContext";
import ModalSign from "../../commons/ImageUpload/ModalSign";
import EditIcon from "@material-ui/icons/EditRounded";
import "./signature.scss";

const Signature = () => {
  const { t } = useTranslation();
  const { openSignatureModal, onClose } = useModal();

  const { auth } = useAuth();

  const { signature_finished_url = null, initial_finished_url = null } = auth;

  const handleInitialSignatureClick = (isInitial) => {
    openSignatureModal({
      isInitial,
      extraCallback: onClose,
    });
  };

  return (
    <div className="signature-page-container">
      <div>
        <div className="head bold">
          {t("settings.signature.text")}
          {signature_finished_url && (
            <EditIcon
              className="cursor-pointer"
              onClick={() => handleInitialSignatureClick(false)}
            />
          )}
        </div>
        {(!signature_finished_url || signature_finished_url === null) && (
          <ModalSign
            meta={{ head: t("settings.signature.addSignature") }}
            onClick={() => handleInitialSignatureClick(false)}
          />
        )}
        <div className="parent">
          {signature_finished_url && (
            <img
              src={signature_finished_url}
              className="non-initial-signature"
              alt=""
            />
          )}
        </div>
      </div>
      <div>
        <div className="head bold">
          {t("settings.signature.initial")}
          {initial_finished_url && (
            <EditIcon
              className="cursor-pointer"
              onClick={() => handleInitialSignatureClick(true)}
            />
          )}
        </div>
        {(!initial_finished_url || initial_finished_url === null) && (
          <ModalSign
            meta={{ head: t("settings.signature.addInitials") }}
            onClick={() => handleInitialSignatureClick(true)}
          />
        )}
        <div className="parent">
          {initial_finished_url && (
            <img
              className="non-initial-signature"
              src={initial_finished_url}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signature;
