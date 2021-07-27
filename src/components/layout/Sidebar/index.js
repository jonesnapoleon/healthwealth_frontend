import React from "react";
import { NavLink } from "react-router-dom";

import { FRONTEND_URL } from "../../../helpers/constant";

// import { ReactComponent as SignatureIcon } from "../../../assets/bnw/Add Signer Icon.svg";
// import { ReactComponent as AnalyticsIcon } from "../../../assets/bnw/Analytic Tab Icon.svg";
// import { ReactComponent as DocumentIcon } from "../../../assets/bnw/document tab icon.svg";
// import { ReactComponent as IntegrationIcon } from "../../../assets/bnw/Integration Tab Icon.svg";
// import { ReactComponent as TemplateIcon } from "../../../assets/bnw/Template Tab Icon.svg";
// import { ReactComponent as SettingIcon } from "../../../assets/bnw/setting tab icon.svg";
// import { ReactComponent as UserIcon } from "../../../assets/bnw/User tab icon.svg";
// import { ReactComponent as LockIcon } from "../../../assets/bnw/Lock Tab Icon.svg";
// import { ReactComponent as RightIcon } from "../../../assets/bnw/Right Arrow.svg";

import DocumentIcon from "@material-ui/icons/DescriptionOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faChartLine,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

const landingData = [
  {
    isAvailable: true,
    name: "Sign",
    link: FRONTEND_URL.sign,
    icon: <FontAwesomeIcon icon={faFileSignature} />,
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
    icon: <FontAwesomeIcon icon={faSlidersH} />,
    // icon: <i className="fa-solid fa-sliders" />,
  },
  {
    isAvailable: false,
    name: "Team",
    link: FRONTEND_URL.realBase,
    // icon: <i className="fi-rr-user-add" />,
    icon: <FontAwesomeIcon icon={"user-add"} />,
  },
  {
    isAvailable: false,
    name: "Templates",
    link: FRONTEND_URL.realBase,
    icon: <i className="fi-rr-apps-add"></i>,
  },
  {
    isAvailable: false,
    name: "Integration",
    link: FRONTEND_URL.realBase,
    icon: <SettingsIcon />,
  },
  {
    isAvailable: false,
    name: "Analytic",
    link: FRONTEND_URL.realBase,
    icon: <FontAwesomeIcon icon={faChartLine} />,
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
                    <ChevronRightIcon />
                  </span>
                </NavLink>
              ) : (
                <div id={`one-sidebar-item-${i}`}>
                  <div className="sidebar-icon">
                    {datum?.icon}
                    {/* <img src={datum?.icon} alt={datum?.name} className="icon" /> */}
                    <span>{datum?.name}</span>
                  </div>
                  <LockOutlinedIcon />
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
