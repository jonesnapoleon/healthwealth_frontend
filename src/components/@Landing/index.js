import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

const Welcome = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const signComponents = [
    {
      icon: "",
      title: t("landing.me.title"),
      ctaText: t("landing.me.ctaText"),
      desciption: t("landing.me.desc"),
      dest: "/me",
    },
    {
      icon: "",
      title: t("landing.all.title"),
      ctaText: t("landing.all.ctaText"),
      desciption: t("landing.all.desc"),
      dest: "/all",
    },
    {
      icon: "",
      title: t("landing.req.title"),
      ctaText: t("landing.req.ctaText"),
      desciption: t("landing.req.desc"),
      dest: "/req",
    },
  ];

  return (
    <>
      <strong className="hello lead">
        {t("landing.hello")}, {auth?.fullname}!
      </strong>

      <div className="row">
        {signComponents?.map((component) => (
          <div
            className="col col-xl-4 col-sm-12 sign-area"
            key={component?.title}
          >
            <div className="item-centery">
              <img
                src={
                  "https://jonesnapoleon.com/static/media/Jones.14fc7267.png" ??
                  component?.icon
                }
                alt=""
              />
              <div className="lead">{component?.title}</div>
              <div className="desc">{component?.desciption}</div>
              <div className="button">
                <Link className="btn-primary" to={component?.dest}>
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
