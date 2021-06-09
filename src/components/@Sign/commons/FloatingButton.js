import React from "react";

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
    <div className="row mt-2">
      <div className="col col-sm-12 col-lg-7">
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
    </div>
  );
};

export default FloatingButton;
