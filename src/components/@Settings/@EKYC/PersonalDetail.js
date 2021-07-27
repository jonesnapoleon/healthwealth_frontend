import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import Snackbar from "../../commons/Snackbar";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { ReactComponent as CalendarIcon } from "../../../assets/bnw/Add Field - Dates Icon.svg";
import {
  useFormInput,
  useInput,
  useIsLargeScreen,
} from "../../../helpers/hooks";

import circleCorrectIcon from "../../../assets/bnw/Circle Correct Icon.svg";
import { PersonalDetailValidator } from "../../../helpers/validator";
import { getBackendDateFormat } from "../../../helpers/transformer";

const PersonalDetail = () => {
  const { auth, putAuth } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const V = useMemo(() => new PersonalDetailValidator(), []);

  const name = useFormInput(auth?.fullname ?? "");
  const nik = useFormInput(auth?.nik ?? "");
  const birthDate = useInput(
    auth?.birthdate ? new Date(auth?.birthdate) : new Date()
  );
  const phoneNumber = useFormInput(auth?.phone ?? "");
  const company = useFormInput(auth?.company ?? "");
  const title = useFormInput(auth?.title ?? "");
  const isLargeScreen = useIsLargeScreen();

  const [showButton, setShowButton] = useState(false);

  useLayoutEffect(() => {
    const inputNumbers = document.querySelectorAll("input[type='number']");
    inputNumbers?.forEach((tag) =>
      tag.addEventListener("keypress", (evt) => {
        if (
          (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
          evt.which > 57
        )
          evt.preventDefault();
      })
    );
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let temp = {};
      if (V.isValidName(name?.value, auth?.fullname))
        temp.fullname = name?.value;
      if (V.isValidName(company?.value, auth?.company))
        temp.company = company?.value;
      if (V.isValidName(title?.value, auth?.title)) temp.title = title?.value;
      if (V.isValidNIK(nik?.value, auth?.nik)) temp.nik = nik?.value;
      if (V.isValidPhoneNumber(phoneNumber?.value, auth?.phone))
        temp.phone = phoneNumber?.value;
      if (V.isValidBirthDate(birthDate?.value, auth?.birthdate))
        temp.birthdate = getBackendDateFormat(birthDate?.value);
      const res = await updateUser(temp, auth?.userid);
      if (res?.data) {
        putAuth(res.data);
      }

      setSuccess(t("settings.ekyc.editProfileSuccess"));
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(birthDate?.value);
  //   console.table(auth);
  // }, [auth, birthDate]);

  const isSameAsOriginal = useMemo(() => {
    if (V.isValidName(name?.value, auth?.fullname)) return false;
    if (V.isValidNIK(nik?.value, auth?.nik)) return false;
    if (V.isValidBirthDate(birthDate?.value, auth?.birthdate)) return false;
    if (V.isValidPhoneNumber(phoneNumber?.value, auth?.phone)) return false;
    if (V.isValidName(company?.value, auth?.company)) return false;
    if (V.isValidName(title?.value, auth?.title)) return false;
    return true;
  }, [name, nik, birthDate, phoneNumber, company, title, auth, V]);

  useEffect(() => {
    setShowButton(!isSameAsOriginal);
  }, [isSameAsOriginal, setShowButton]);

  return (
    <>
      <div className="head bold">{t("settings.ekyc.personalDetail")}</div>
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="success" text={success} />}

      <table className="ekyc-table">
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
              <input
                className="form-input"
                {...nik}
                type="number"
                inputMode="numeric"
              />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.birthDate")}</td>
            <td className="date-table-data">
              <DatePicker
                onChange={birthDate?.set}
                value={birthDate?.value}
                className="form-input"
                dayPlaceholder="DD"
                monthPlaceholder="MM"
                yearPlaceholder="YYYY"
                format="dd-MM-yyyy"
                maxDate={new Date()}
                calendarIcon={<CalendarIcon />}
              />
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
              <input
                className="form-input"
                {...phoneNumber}
                type="number"
                inputMode="numeric"
              />
              <br />

              <div className="item-right">
                <button className="text-only-button">{t("otp.sendOtp")}</button>
              </div>
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.companyName")}</td>
            <td>
              <input className="form-input" {...company} />
            </td>
          </tr>

          <tr>
            <td>{t("settings.ekyc.title")}</td>
            <td>
              <input className="form-input" {...title} />
            </td>
          </tr>
          {showButton && (
            <tr>
              <td></td>
              <td className="item-right">
                <button
                  className="button-settings"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {t("general.save")}
                </button>
              </td>
            </tr>
          )}
          {/* <div className="mt-4">
        </div> */}
        </tbody>
      </table>
    </>
  );
};

export default PersonalDetail;
