import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
// import signatureIcon from "../../../assets/bnw/Add Signer Icon.svg";
// import analyticsIcon from "../../../assets/bnw/Analytic Tab Icon.svg";
// import documentIcon from "../../../assets/bnw/document tab icon.svg";
// import integrationIcon from "../../../assets/bnw/Integration Tab Icon.svg";
// import templateIcon from "../../../assets/bnw/Template Tab Icon.svg";
// import settingIcon from "../../../assets/bnw/setting tab icon.svg";
// import userIcon from "../../../assets/bnw/User tab icon.svg";

import lockIcon from "../../assets/bnw/Lock Tab Icon.svg";
import { FRONTEND_URL } from "../../helpers/constant";

import EKYC from "./@EKYC";
import Signature from "./@Signature";

import "./settings.scss";

const navSettingsData = [
  {
    isAvailable: true,
    name: "E-KYC",
    hash: "#e-kyc",
    component: <EKYC />,
  },
  {
    isAvailable: true,
    name: "Signature",
    hash: "#signature",
    component: <Signature />,
  },
  {
    isAvailable: false,
    name: "Billing",
    hash: "#billing",
  },
  {
    isAvailable: false,
    name: "API",
    hash: "#api",
  },
];

const Settings = () => {
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      setActive(location.hash);
    } else {
      setActive(navSettingsData[0]?.hash);
    }
  }, [location]);

  const chosenData = useMemo(
    () => navSettingsData?.filter((datum) => datum?.hash === active)?.[0],
    [active]
  );

  return (
    <div className="nav-container">
      <span className="nav nav-tabs">
        {navSettingsData?.map((datum) => (
          <div
            key={datum?.hash}
            className={`navlink ${active === datum?.hash ? "active" : ""}`}
            onClick={() => {
              if (datum?.isAvailable) {
                setActive(datum?.hash);
                history.push(`${FRONTEND_URL.settings}${datum?.hash}`);
              }
            }}
          >
            {datum?.name}
            {!datum?.isAvailable && (
              <img src={lockIcon} alt="" className="icon" />
            )}
          </div>
        ))}
      </span>
      <div className="description">{t("settings.complyText")}</div>
      {chosenData && chosenData?.component ? chosenData.component : <></>}
    </div>
  );
};

export default Settings;
