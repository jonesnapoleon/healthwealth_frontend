import React from "react";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../../../helpers/constant";

import { ReactComponent as HelpSvg } from "../../../assets/images/Help Icon.svg";
import logoUrl from "../../../assets/images/Company Logo@2x.png";

const Header = ({ auth, t, signOut }) => {
  // console.log(temp);
  const dropdownSelector = document.querySelector(
    ".dropdown-menu.nav-dropdown"
  );

  const toggleDropdown = (bool) => {
    // const sel = dropdownSelector.style.display;
    if (bool) dropdownSelector.style.display = "block";
    else dropdownSelector.style.display = "none";
    // dropdownSelector.style.display =
    //   dropdownSelector.style.display === "block" ? "none" : "block";
    // console.log(dropdownSelector);
  };
  return (
    <div className="navbar-wrapper">
      <div className="nav-area">
        <div className="">
          <Link to={FRONTEND_URL.base} className="profileLink">
            <img className="logo" src={logoUrl} alt="" />
          </Link>
        </div>

        <div className="item-center super-pt-2">
          <div className="item-center super-pt-1">
            <div>
              <strong>{t("header.signReq")}</strong>
              <br />
              <span>{t("header.thisMonth")}</span>
            </div>
            <div>
              <button className="logout-button btn-secondary" onClick={signOut}>
                {t("general.signout")}
              </button>
            </div>
          </div>
          <div className="item-center super-pt-1 last-nav-child">
            <img className="rounded-img" src={auth?.picture} alt="" />
            <div>{auth?.fullname}</div>
            <div className="dropright">
              <span role="button" class="navlink expanded" id="comp-nav">
                &gt;
              </span>
              <ul id="navdropdown">
                <li class="navlink inactive">
                  <Link className="dropdownede-item" to={FRONTEND_URL.settings}>
                    {t("header.myProfile")}
                  </Link>
                </li>
                <li class="navlink inactive">
                  <div className="droefpdown-item" onClick={signOut}>
                    {t("header.signOut")}
                  </div>
                </li>
              </ul>
            </div>
            {/* <div className="dropright">
              <div
                className="dropdown-toggle"
                type="button"
                onMouseLeave={() => toggleDropdown(!true)}
                onMouseOver={() => toggleDropdown(true)}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></div>
              <div className="dropdown-menu nav-dropdown">
                <Link className="dropdown-item" to={FRONTEND_URL.settings}>
                  {t("header.myProfile")}
                </Link>
                <div className="dropdown-item" onClick={signOut}>
                  {t("header.signOut")}
                </div>
              </div>
            </div> */}
            {/* <div onClick={}>&gt;</div> */}
            <div>
              <HelpSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
