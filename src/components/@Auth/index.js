import React, { useState } from "react";
import logoUrl from "../../assets/Asset B_W/Company Logo@2x.png";
import "./auth.css";
import LoginArea from "./LoginArea";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div className="background-sign-in">
      <div className="logo-container">
        <img src={logoUrl} alt="" />
      </div>
      {isLoginPage ? (
        <>
          <div className="text-container">
            <h5>
              <strong>{t("login.loginWithYourAccount")}</strong>
            </h5>
          </div>
          <LoginArea
            isLoginPage={isLoginPage}
            setIsLoginPage={setIsLoginPage}
          />
        </>
      ) : (
        <div className="row">
          <div className="col-lg-7 col-md-12">
            efwgtrjewfkgtrjijfewgtirfwjgtui efwgtrjewfkgtrjijfewgtirfwjgtui
            efwgtrjewfkgtrjijfewgtirfwjgtui
          </div>
          <div className="col-lg-5 col-md-12 ">
            <div className="text-container">
              <h5>
                <strong>{t("login.createFreeAccount")}</strong>
              </h5>
            </div>
            <LoginArea
              isLoginPage={isLoginPage}
              setIsLoginPage={setIsLoginPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
