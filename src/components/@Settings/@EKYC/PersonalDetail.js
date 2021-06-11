import React, { useEffect, useMemo, useState } from "react";
import Snackbar from "../../commons/Snackbar";
import { useTranslation } from "react-i18next";
import { getUser } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { useFormInput, useIsLargeScreen } from "../../../helpers/hooks";

import circleCorrectIcon from "../../../assets/images/Circle Correct Icon.svg";

const PersonalDetail = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const name = useFormInput(auth?.fullname);
  const nik = useFormInput(auth?.nik);
  const birthDate = useFormInput(auth?.birthDate);
  const phoneNumber = useFormInput(auth?.phone);
  const companyName = useFormInput(auth?.company);
  const title = useFormInput(auth?.title);
  const isLargeScreen = useIsLargeScreen();

  const [showButton, setShowButton] = useState(false);

  const isSameAsOriginal = useMemo(() => {
    if (name?.value !== "" && String(name?.value) !== String(auth?.fullname))
      return false;
    if (nik?.value !== "" && String(nik?.value) !== String(auth?.nik))
      return false;
    if (
      birthDate?.value !== "" &&
      String(birthDate?.value) !== String(auth?.birthDate)
    )
      return false;
    if (
      phoneNumber?.value !== "" &&
      String(phoneNumber?.value) !== String(auth?.phone)
    )
      return false;
    if (
      companyName?.value !== "" &&
      String(companyName?.value) !== String(auth?.company)
    )
      return false;
    if (title?.value !== "" && String(title?.value) !== String(auth?.title))
      return false;
    return true;
  }, [name, nik, birthDate, phoneNumber, companyName, title, auth]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await getUser(auth?.userid);
      if (res) {
        setAuth(res);
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShowButton(!isSameAsOriginal);
  }, [name, nik, birthDate, phoneNumber, companyName, title, isSameAsOriginal]);

  return (
    <>
      <div className="lead">{t("settings.ekyc.personalDetail")}</div>
      {error && <Snackbar text={error} />}

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
              <input className="form-input" value={auth?.email} disabled />
            </td>
            {isLargeScreen && (
              <td>
                <img
                  src={circleCorrectIcon}
                  alt=""
                  className="mx-2 circle-correct-icon"
                />
              </td>
            )}
          </tr>

          <tr>
            <td>{t("settings.ekyc.phoneNumber")}</td>
            <td>
              <input className="form-input" {...phoneNumber} />
              <br />

              <div className="item-right">
                <button className="text-only-button">
                  {t("form.sendOtp")}
                </button>
              </div>
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
      {showButton && (
        <div className="mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {t("general.save")}
          </button>
        </div>
      )}
    </>
  );
};

export default PersonalDetail;
