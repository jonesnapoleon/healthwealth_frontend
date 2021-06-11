import React from "react";
import { NavLink } from "react-router-dom";

import { FRONTEND_URL } from "../../../helpers/constant";

import signatureIcon from "../../../assets/images/Add Signer Icon.svg";
import analyticsIcon from "../../../assets/images/Analytic Tab Icon.svg";
import documentIcon from "../../../assets/images/document tab icon.svg";
import integrationIcon from "../../../assets/images/Integration Tab Icon.svg";
import templateIcon from "../../../assets/images/Template Tab Icon.svg";
import settingIcon from "../../../assets/images/setting tab icon.svg";
import userIcon from "../../../assets/images/User tab icon.svg";

import lockIcon from "../../../assets/images/Lock Tab Icon.svg";

import "./sidebar.css";

const landingData = [
  {
    isAvailable: true,
    name: "Sign",
    link: FRONTEND_URL.sign,
    icon: signatureIcon,
  },
  {
    isAvailable: true,
    name: "Documents",
    link: FRONTEND_URL.docs,
    icon: documentIcon,
  },
  {
    isAvailable: true,
    name: "Settings",
    link: FRONTEND_URL.settings,
    icon: settingIcon,
  },
  {
    isAvailable: false,
    name: "Team",
    link: FRONTEND_URL.realBase,
    icon: userIcon,
  },
  {
    isAvailable: false,
    name: "Templates",
    link: FRONTEND_URL.realBase,
    icon: templateIcon,
  },
  {
    isAvailable: false,
    name: "Integration",
    link: FRONTEND_URL.realBase,
    icon: integrationIcon,
  },
  {
    isAvailable: false,
    name: "Analytic",
    link: FRONTEND_URL.realBase,
    icon: analyticsIcon,
  },
];

const Sidebar = () => {
  return (
    <div className="row">
      <div className="col col-8">
        <div className="sidebar">
          {landingData?.map((datum, i) => (
            <div className="one-sidebar-item" key={i}>
              {datum?.isAvailable ? (
                <NavLink
                  to={datum?.link}
                  activeClassName="active primary-color"
                >
                  <div>
                    <img src={datum?.icon} alt={datum?.name} className="icon" />
                    <span>{datum?.name}</span>
                  </div>
                  <div>&gt;</div>{" "}
                </NavLink>
              ) : (
                <div>
                  <div>
                    <img src={datum?.icon} alt={datum?.name} className="icon" />
                    <span>{datum?.name}</span>
                  </div>
                  <img src={lockIcon} alt={datum?.name} />
                  {/* <div className="coming-soon">Coming soon</div> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
