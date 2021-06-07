import React from "react";
import { Link, useLocation } from "@reach/router";

import signatureIcon from "../../../assets/images/Add Signer Icon.svg";
import analyticsIcon from "../../../assets/images/Analytic Tab Icon.svg";
import documentIcon from "../../../assets/images/document tab icon.svg";
import integrationIcon from "../../../assets/images/Integration Tab Icon.svg";
import templateIcon from "../../../assets/images/Template Tab Icon.svg";
import settingIcon from "../../../assets/images/setting tab icon.svg";
import userIcon from "../../../assets/images/User tab icon.svg";

import lockIcon from "../../../assets/images/Lock Tab Icon.svg";

import "./sidebar.css";

const navSettingsData = [
  {
    isAvailable: true,
    name: "Sign",
    link: "/",
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
];

const Settings = () => {
  // const location = useLocation();

  return (
    <div className="row">
      <div className="col">efrg</div>
    </div>
  );
};

export default Settings;
