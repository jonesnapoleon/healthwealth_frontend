import React, { useEffect } from "react";
// import { auth } from "../../api";
// import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./navbar.css";

import logoUrl from "../../../assets/images/Company Logo@2x.png";
import helpSvg from "../../../assets/images/Help Icon.svg";
import { useAuth } from "../../../contexts/AuthContext";

const Navbar = () => {
  // console.log(props);
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const { auth, signOut } = useAuth();
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

  if (location?.pathname === "/login" || location?.pathname === "/login/")
    return <></>;

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
              <div className="btn-secondary" onClick={signOut}>
                {t("general.signout") ?? "e"}
              </div>
            </div>
          </div>
          <div className="item-center super-pt-1 last-nav-child">
            <img className="rounded-img" src={auth?.picture} alt="" />
            <div>{auth?.fullname}</div>
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
