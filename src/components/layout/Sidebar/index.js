import React from "react";
import { Link, useLocation } from "@reach/router";
import { NavLink } from "react-router-dom";

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
    link: "/sign",
    icon: signatureIcon,
  },
  {
    isAvailable: true,
    name: "Documents",
    link: "/docs",
    icon: documentIcon,
  },
  {
    isAvailable: true,
    name: "Settings",
    link: "/settings",
    icon: settingIcon,
  },
  {
    isAvailable: false,
    name: "Team",
    link: "/",
    icon: userIcon,
  },
  {
    isAvailable: false,
    name: "Templates",
    link: "/",
    icon: templateIcon,
  },
  {
    isAvailable: false,
    name: "Integration",
    link: "/",
    icon: integrationIcon,
  },
  {
    isAvailable: false,
    name: "Analytic",
    link: "/",
    icon: analyticsIcon,
  },
];

const Sidebar = () => {
  // const location = useLocation();

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
