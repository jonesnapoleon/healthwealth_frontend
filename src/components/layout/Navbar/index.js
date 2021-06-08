import React, { useEffect } from "react";
// import { auth } from "../../api";
// import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./navbar.css";

import logoUrl from "../../../assets/images/Company Logo@2x.png";
import helpSvg from "../../../assets/images/Help Icon.svg";

const Navbar = () => {
  // console.log(props);
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const displayName = user?.displayName;
  // const photoURL = user?.photoURL;
  // const email = user?.email;
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location?.pathname === "/" || location?.pathname === "")
      history.push("/sign");
  }, [location, history]);

  const displayName = "Christopher Chatoel";
  const photoURL =
    "https://indodax.com/v2/images/logo-indodax-dark.png?20210525";
  const email = "";

  return (
    <div className="navbar-wrapper">
      <div className="nav-area">
        <div className="">
          <Link to="/" className="profileLink">
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
              <div className="btn-secondary">{t("general.signout") ?? "e"}</div>
            </div>
          </div>
          <div className="item-center super-pt-1 last-nav-child">
            <img
              className="rounded-img"
              src={"https://jonesnapoleon.com/static/media/Jones.14fc7267.png"}
              alt=""
            />
            <div>{displayName}</div>
            <div>&gt;</div>
            <div>
              <img src={helpSvg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
