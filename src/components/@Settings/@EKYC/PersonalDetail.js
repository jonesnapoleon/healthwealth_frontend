import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext";
import { useFormInput } from "../../../helpers/hooks";

const PersonalDetail = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const name = useFormInput("");
  const nik = useFormInput("");
  const birthDate = useFormInput("");
  const phoneNumber = useFormInput("");
  const companyName = useFormInput("");
  const title = useFormInput("");
  const email = useFormInput("");

  return (
    <>
      <div className="lead">{t("settings.ekyc.personalDetail")}</div>

      <table>
        <tbody>
          <tr>
            <td>{t("settings.ekyc.name")}</td>
            <td>
              <input className="form-input" {...name} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.nik")}</td>
            <td>
              <input className="form-input" {...nik} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.birthDate")}</td>
            <td>
              <input className="form-input" {...birthDate} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.email")}</td>
            <td>
              <input className="form-input" {...email} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.phoneNumber")}</td>
            <td>
              <input className="form-input" {...phoneNumber} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.companyName")}</td>
            <td>
              <input className="form-input" {...companyName} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.title")}</td>
            <td>
              <input className="form-input" {...title} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button className="btn btn-outline-primary">{t("general.save")}</button>
      </div>
    </>
  );
};

export default PersonalDetail;
