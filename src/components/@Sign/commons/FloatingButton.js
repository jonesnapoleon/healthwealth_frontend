import React from "react";
import "./commons.css";

const FloatingButton = ({
  t,
  onClickNext,
  activeItem,
  availableLevel,
  loading,
  onClickPrev,
}) => {
  // console.log(availableLevel);
  return (
    <div className="floating-button-container">
      <div className="item-right">
        <div>
          {availableLevel > -20 && (
            <button
              onClick={onClickPrev}
              className="btn btn-light"
              disabled={loading}
            >
              {t("general.back")}
            </button>
          )}
          <button
            onClick={onClickNext}
            disabled={loading}
            className="btn btn-primary"
          >
            {t("general.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
