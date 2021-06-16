import React from "react";
import { NavLink } from "react-router-dom";

import { FRONTEND_URL } from "../../../helpers/constant";

import { ReactComponent as SignatureIcon } from "../../../assets/bnw/Add Signer Icon.svg";
import { ReactComponent as AnalyticsIcon } from "../../../assets/bnw/Analytic Tab Icon.svg";
import { ReactComponent as DocumentIcon } from "../../../assets/bnw/document tab icon.svg";
import { ReactComponent as IntegrationIcon } from "../../../assets/bnw/Integration Tab Icon.svg";
import { ReactComponent as TemplateIcon } from "../../../assets/bnw/Template Tab Icon.svg";
import { ReactComponent as SettingIcon } from "../../../assets/bnw/setting tab icon.svg";
import { ReactComponent as UserIcon } from "../../../assets/bnw/User tab icon.svg";
import { ReactComponent as LockIcon } from "../../../assets/bnw/Lock Tab Icon.svg";
import { ReactComponent as RightIcon } from "../../../assets/bnw/Right Arrow.svg";

import "./sidebar.css";

const landingData = [
  {
    isAvailable: true,
    name: "Sign",
    link: FRONTEND_URL.sign,
    icon: <SignatureIcon />,
  },
  {
    isAvailable: true,
    name: "Documents",
    link: FRONTEND_URL.docs,
    icon: <DocumentIcon />,
  },
  {
    isAvailable: true,
    name: "Settings",
    link: FRONTEND_URL.settings,
    icon: <SettingIcon />,
  },
  {
    isAvailable: false,
    name: "Team",
    link: FRONTEND_URL.realBase,
    icon: <UserIcon />,
  },
  {
    isAvailable: false,
    name: "Templates",
    link: FRONTEND_URL.realBase,
    icon: <TemplateIcon />,
  },
  {
    isAvailable: false,
    name: "Integration",
    link: FRONTEND_URL.realBase,
    icon: <IntegrationIcon />,
  },
  {
    isAvailable: false,
    name: "Analytic",
    link: FRONTEND_URL.realBase,
    icon: <AnalyticsIcon />,
  },
];

const Sidebar = () => {
  // useEffect(() => {
  //   const temp = Array.from(Array(landingData.length));
  //   Array.from(Array(landingData.length)).forEach((a, i) => {
  //     const id = `one-sidebar-item-${i}`;
  //     const tag = document.getElementById(id);

  //     window.addEventListener('');
  //   });
  // }, []);

  return (
    <div className="row">
      <div className="col col-10">
        <div className="sidebar">
          {landingData?.map((datum, i) => (
            <div className={`one-sidebar-item`} key={i}>
              {datum?.isAvailable ? (
                <NavLink
                  to={datum?.link}
                  activeClassName="active primary-color"
                >
                  <div className="sidebar-icon">
                    {datum?.icon}
                    {/* <img src={datum?.icon} alt={datum?.name} className="icon" /> */}
                    <span>{datum?.name}</span>
                  </div>
                  <span className="right-icon">
                    <RightIcon />
                  </span>
                </NavLink>
              ) : (
                <div id={`one-sidebar-item-${i}`}>
                  <div className="sidebar-icon">
                    {datum?.icon}
                    {/* <img src={datum?.icon} alt={datum?.name} className="icon" /> */}
                    <span>{datum?.name}</span>
                  </div>
                  <LockIcon />
                  {/* <img src={lockIcon} alt={datum?.name} /> */}
                  <small id={`coming-soon-${i}`}>Coming soon</small>
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
