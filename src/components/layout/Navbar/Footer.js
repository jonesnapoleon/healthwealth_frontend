import React from "react";
import { useTranslation } from "react-i18next";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="text-center mb-2 footer container">
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start">
          <div className="footer-item">{/* <img src={} */}</div>
          {[
            "header.pricing",
            "header.products",
            "header.getStarted",
            "header.faq",
          ].map((a) => (
            <div className="footer-item">{t(a)}</div>
          ))}
        </div>
        <div>
          <div>
            <div className="d-flex justify-content-between">
              {[
                [<FacebookIcon />],
                [<InstagramIcon />],
                [<LinkedInIcon />],
              ].map((icon) => (
                <div className="icon">{icon[0]}</div>
              ))}
            </div>
          </div>
          <small>© 2021 STEALTHX | {t("login.termsAndCondition")}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
