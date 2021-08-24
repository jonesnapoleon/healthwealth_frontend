import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
// import { ReactComponent as HomeSvg } from "../../../assets/bnw/Home Icon.svg";
import { FRONTEND_URL } from "../../../../helpers/constant";
// import { ReactComponent as HelpSvg } from "../../../assets/bnw/Help Icon.svg";

import "./sign-nav.scss";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { useAuth } from "contexts/AuthContext";

const SignNav = () => {
  const history = useHistory();
  const { auth, signOut } = useAuth();
  const { t } = useTranslation();
  const dropdownSelector = document.querySelector(
    ".dropdown-menu.nav-dropdown"
  );
  const toggleDropdown = (bool) => {
    const dropdownSelector = document.querySelector(
      ".dropdown-menu.nav-dropdown"
    );
    if (bool) dropdownSelector.style.display = "block";
    else dropdownSelector.style.display = "none";
  };

  return (
    <div className={`stepper-container position-fixed`}>
      <div className="back cursor-pointer">
        <ClearOutlinedIcon onClick={() => history.push(FRONTEND_URL.sign)} />
      </div>
      <div className="item-center">
        <div className="dropright">
          <div
            className="dropdown-toggle"
            type="button"
            onMouseLeave={() => toggleDropdown(!true)}
            onClick={() =>
              toggleDropdown(dropdownSelector.style.display === "none")
            }
            onMouseOver={() => toggleDropdown(true)}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img className="rounded-img" src={auth?.picture} alt="" />
          </div>
          <div className="dropdown-menu nav-dropdown">
            <Link className="dropdown-item" to={FRONTEND_URL.settings}>
              {t("header.myProfile")}
            </Link>
            <div className="dropdown-item" onClick={signOut}>
              {t("header.signOut")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignNav;
