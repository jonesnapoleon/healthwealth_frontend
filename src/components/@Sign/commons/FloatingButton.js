import React from "react";
import { useTranslation } from "react-i18next";

import "./commons.scss";

const FloatingButton = ({
  onClickNext,
  disabled,
  activeItemId,
  onClickPrev,
  nextText,
}) => {
  const { t } = useTranslation();

  return (
    <div className="floating-button-container">
      <div className="item-right">
        <div>
          {activeItemId > 0 && onClickPrev && (
            <button onClick={onClickPrev} className="btn btn-light btn-lg">
              {t("general.back")}
            </button>
          )}
          <button
            onClick={onClickNext}
            disabled={disabled}
            className="btn btn-black btn-primary btn-lg"
          >
            {nextText ?? t("general.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
