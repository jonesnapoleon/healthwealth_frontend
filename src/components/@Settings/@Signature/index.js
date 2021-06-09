import React from "react";
import { useTranslation } from "react-i18next";
import ImageUpload from "../../commons/ImageUpload";
import "./signature.css";

const Signature = () => {
  const { t } = useTranslation();

  return (
    <div className="signature-container">
      <div>
        <div className="lead">{t("settings.signature.text")}</div>
        <ImageUpload meta={{ head: t("settings.signature.addSignature") }} />
      </div>
      <div>
        <div className="lead">{t("settings.signature.initial")}</div>
        <ImageUpload meta={{ head: t("settings.signature.addInitials") }} />
      </div>
    </div>
  );
};

export default Signature;
