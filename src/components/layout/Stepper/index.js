import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSvg } from "../../../assets/bnw/Home Icon.svg";
import { FRONTEND_URL } from "../../../helpers/constant";
import { ReactComponent as HelpSvg } from "../../../assets/bnw/Help Icon.svg";

import "./stepper.css";

const Stepper = ({ items, activeItem, isFixed }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const renderSteppers = () =>
    items?.map((datum, i) => (
      <span
        key={datum?.name}
        className={`item-center ${i <= activeItem ? "" : "disabled"}`}
      >
        {i !== 0 && <strong className="px-2 lead">➔</strong>}
        <div className={`px-2`}>{datum?.icon}</div>
        <div>{datum.name}</div>
      </span>
    ));

  return (
    <div className={`stepper-container ${isFixed ? "position-fixed" : ""}`}>
      <div className="back cursor-pointer">
        <HomeSvg onClick={() => history.push(FRONTEND_URL.sign)} />
      </div>
      <div className="item-center">{renderSteppers()}</div>
      <div className="item-center">
        <div>
          <button className="stepper-buy-now-button">
            {t("general.buyNow")}
          </button>
        </div>
        <div className="">
          <HelpSvg />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
