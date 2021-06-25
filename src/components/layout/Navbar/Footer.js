import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mb-2 pt-3">
      <hr />© 2021 STEALTHX | {t("login.termsAndCondition")}
    </div>
  );
};

export default Footer;
