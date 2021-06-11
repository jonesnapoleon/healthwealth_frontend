import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSvg } from "../../../assets/images/Home Icon.svg";
import { FRONTEND_URL } from "../../../helpers/constant";
import { ReactComponent as HelpSvg } from "../../../assets/images/Help Icon.svg";

import "./stepper.css";

const Stepper = ({ items, activeItem }) => {
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
    <div className="stepper-container">
      <div className="back cursor-pointer">
        <HomeSvg onClick={() => history.push(FRONTEND_URL.sign)} />
      </div>
      <div className="item-center">{renderSteppers()}</div>
      <div className="item-center">
        <div>
          <div className="btn-secondary stepper-buy-now-button">
            {t("general.buyNow")}
          </div>
        </div>
        <div className="">
          <HelpSvg />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
