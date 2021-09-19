import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { ReactComponent as HomeSvg } from "../../../assets/bnw/Home Icon.svg";
import { FRONTEND_URL } from "../../../../helpers/constant";
// import { ReactComponent as HelpSvg } from "../../../assets/bnw/Help Icon.svg";
import logoUrl from "../../../../assets/bnw/Company Logo@2x.png";

import "./sign-nav.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useAuth } from "contexts/AuthContext";

const SignNav = () => {
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
    <div className={`sign-nav-container position-fixed`}>
      {/* <div className="back cursor-pointer">
        <ClearOutlinedIcon onClick={() => history.push(FRONTEND_URL.sign)} />
      </div> */}

      <Link to={FRONTEND_URL.base} className="profileLink">
        <img
          className="logo"
          src={logoUrl}
          alt=""
          style={{ height: "100%", padding: ".5rem 0" }}
        />
      </Link>

      <div className="item-right" style={{ position: "relative" }}>
        <div
          className="item-right"
          onMouseLeave={() => toggleDropdown(!true)}
          onClick={() =>
            toggleDropdown(dropdownSelector.style.display === "none")
          }
          style={{ height: "100%" }}
          onMouseOver={() => toggleDropdown(true)}
        >
          <img
            className="rounded-img"
            src={auth?.picture}
            alt=""
            style={{ height: "100%" }}
          />
          <div style={{ color: "black", margin: "0 .8rem 0 .5rem" }}>
            {auth?.fullname}
          </div>

          <div className="dropright">
            <div
              className="dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              // style={{ display: "grid", placeItems: "center" }}
            >
              <ChevronRightIcon style={{ margin: "auto" }} />
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
    </div>
  );
};

export default SignNav;
