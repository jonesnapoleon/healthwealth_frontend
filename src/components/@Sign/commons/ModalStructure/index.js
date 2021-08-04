import React from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { useModal } from "contexts/ModalContext";

const ModalStucture = ({ onClickCTA }) => {
  const { t } = useTranslation();
  const { onClose } = useModal();

  return (
    <div className="modal-structure-container">
      <div className="text-above">
        <h5 className="head">{t("popup.sign.done.almd")}</h5>
        <div className="desc">
          <div>{t("popup.sign.done.long")}</div>
          <div>{t("popup.sign.done.shorter")}</div>
        </div>
      </div>
      <div className="button-below">
        <button className="btn btn-light squared" onClick={onClose}>
          {t("general.edit")}
        </button>
        <button className="btn btn-primary squared" onClick={onClickCTA}>
          {t("general.iagree")}
        </button>
      </div>
    </div>
  );
};

export default ModalStucture;
