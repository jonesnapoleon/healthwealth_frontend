import React from "react";
import logoUrl from "../../assets/images/Company Logo@2x.png";
import "./auth.css";
import LoginArea from "./LoginArea";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <div className="background-sign-in">
      <div className="logo-container">
        <img src={logoUrl} alt="" />
      </div>
      <div className="text-container">
        <h5>
          <strong>{t("login.loginWithYourAccount")}</strong>
        </h5>
      </div>
      <LoginArea />
    </div>
  );
};
export default SignIn;
