import React from "react";
import { useTranslation } from "react-i18next";
import "./commons.css";

const FloatingButton = ({
  onClickNext,
  activeItem,
  // availableLevel,
  disabled,
  onClickPrev,
}) => {
  console.log(disabled);
  const { t } = useTranslation();
  // console.log(availableLevel);
  return (
    <div className="floating-button-container">
      <div className="item-right">
        <div>
          {/* {availableLevel > -20 && (
          )} */}
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

export default FloatingButton;
