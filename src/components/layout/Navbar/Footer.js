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
            ["header.pricing", "https://jonesnapoleon.com/nimfinder"],
            ["header.products", "https://youtube.com"],
            ["header.getStarted", "https://google.com"],
            ["header.faq", "https://netflix.com"],
          ].map((a, i) => (
            <div key={i} className="footer-item">
              <a
                href={a[1]}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "unset",
                }}
              >
                {t(a[0])}
              </a>
            </div>
          ))}
        </div>
        <div>
          <div>
            <div className="d-flex justify-content-between">
              {[
                [<FacebookIcon />],
                [<InstagramIcon />],
                [<LinkedInIcon />],
              ].map((icon, i) => (
                <div className="icon" key={i}>
                  {icon[0]}
                </div>
              ))}
            </div>
          </div>
          <small>&copy; 2021 STEALTHX | {t("login.termsAndCondition")}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
