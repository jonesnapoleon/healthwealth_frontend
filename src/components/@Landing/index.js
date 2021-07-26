import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

// import { ReactComponent as OnlyMeIcon } from "../../assets/bnw/User Me Only Icon.svg";
// import { ReactComponent as AllIcon } from "../../assets/bnw/User Me and Other Icon.svg";
// import { ReactComponent as RequestIcon } from "../../assets/bnw/Request Sign Icon.svg";

import OnlyMeIcon from "@material-ui/icons/PermIdentityOutlined";
import AllIcon from "@material-ui/icons/PeopleAltOutlined";
import RequestIcon from "@material-ui/icons/SendOutlined";

import { FRONTEND_URL } from "../../helpers/constant";

// import { ReactComponent as Down } from "../../assets/svg/down-arrow.svg";

const Welcome = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const signComponents = [
    {
      icon: <OnlyMeIcon />,
      title: t("landing.me.title"),
      ctaText: t("landing.me.ctaText"),
      desciption: t("landing.me.desc"),
      dest: FRONTEND_URL.me,
    },
    {
      icon: <AllIcon />,
      title: t("landing.all.title"),
      ctaText: t("landing.all.ctaText"),
      desciption: t("landing.all.desc"),
      dest: FRONTEND_URL.all,
    },
    {
      icon: <RequestIcon />,
      title: t("landing.req.title"),
      ctaText: t("landing.req.ctaText"),
      desciption: t("landing.req.desc"),
      dest: FRONTEND_URL.request,
    },
  ];
  return (
    <>
      <strong className="hello lead">
        {t("landing.hello")}, {auth?.fullname}!
      </strong>
      {/* <div className="row">
        <Down className="col-1" />
      </div> */}

      <div className="row">
        {signComponents?.map((component) => (
          <div className="col-xl-4 col-sm-12 sign-area" key={component?.title}>
            <div className="item-centery">
              <div>
                <div className={`component-icon`}>{component?.icon}</div>
                <div>
                  <div className="lead">{component?.title}</div>
                  <div className="desc">{component?.desciption}</div>
                </div>
              </div>
              <div className="button">
                <Link
                  className="btn-primary button-landing"
                  to={component?.dest}
                >
                  {component?.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Welcome;
