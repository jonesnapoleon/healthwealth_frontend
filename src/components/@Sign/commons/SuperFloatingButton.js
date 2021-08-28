import React from "react";
import { useTranslation } from "react-i18next";
import "./commons.scss";

const SuperFloatingButton = ({ onClickNext, disabled, onClickPrev }) => {
  const { t } = useTranslation();

  return (
    <div className="super-floating-button-container">
      <div />
      <div className="item-center">
        © 2021 STEALTHX | {t("login.termsAndCondition")}
      </div>
      <div className="item-right">
        <div>
          <button
            onClick={onClickPrev}
            className="btn btn-light btn-lg"
            disabled={disabled}
          >
            {t("general.back")}
          </button>
          <button
            onClick={onClickNext}
            disabled={disabled}
            className="btn btn-primary btn-lg"
          >
            {t("general.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperFloatingButton;
