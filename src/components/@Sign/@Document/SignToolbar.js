import React from "react";
import { SCALE } from "helpers/constant";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const SignToolbar = () => {
  const { t } = useTranslation();
  const { goBack } = useHistory();
  return (
    <>
      <div className="tools-area">
        <div className="wrapper">
          <div>
            <select
            // value={scale}
            // onChange={(e) => setScale(e.target.value)}
            // disabled={!canEdit}
            >
              {SCALE.map((val, i) => (
                <option value={val} key={i}>
                  {val}%
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="button-right-tools-area">
        <div>
          <button className="btn btn-light btn-lg" onClick={goBack}>
            {t("general.back")}
          </button>
          <button className="btn btn-primary btn-lg">
            {t("general.next")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignToolbar;
