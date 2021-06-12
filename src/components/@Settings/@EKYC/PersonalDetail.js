import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import Snackbar from "../../commons/Snackbar";
import { useTranslation } from "react-i18next";
import { getUser, updateUser } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { ReactComponent as CalendarIcon } from "../../../assets/images/Add Field - Dates Icon.svg";
import {
  useFormInput,
  useInput,
  useIsLargeScreen,
} from "../../../helpers/hooks";

import circleCorrectIcon from "../../../assets/images/Circle Correct Icon.svg";
import { isDateSame, isValidContactNumber } from "../../../helpers/validator";

const PersonalDetail = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const name = useFormInput(auth?.fullname ?? "");
  const nik = useFormInput(auth?.nik ?? "");
  const birthDate = useInput(auth?.birthDate);
  const phoneNumber = useFormInput(auth?.phone ?? "");
  const companyName = useFormInput(auth?.company ?? "");
  const title = useFormInput(auth?.title ?? "");
  const isLargeScreen = useIsLargeScreen();

  const [showButton, setShowButton] = useState(false);

  const isSameAsOriginal = useMemo(() => {
    // console.table([name, nik, birthDate, phoneNumber, companyName, title]);
    if (name?.value !== "" && String(name?.value) !== String(auth?.fullname))
      return false;
    if (nik?.value !== "" && String(nik?.value) !== String(auth?.nik))
      return false;
    if (
      birthDate?.value !== "" &&
      birthDate?.value !== undefined &&
      birthDate?.value !== null &&
      String(birthDate?.value) !== String(auth?.birthDate) &&
      !isDateSame(birthDate?.value, new Date())
    )
      return false;
    if (
      phoneNumber?.value !== "" &&
      String(phoneNumber?.value) !== String(auth?.phone) &&
      isValidContactNumber(auth?.phone)
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
      const dataToBeSubmitted = {
        name: name?.value,
        nik: nik?.value,
        birthDate: birthDate?.value,
        phoneNumber: phoneNumber?.value,
        companyName: companyName?.value,
        title: title?.value,
      };
      const res = await updateUser(dataToBeSubmitted, auth?.userid);
      if (res) {
        console.log(res);
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
              <input
                className="form-input"
                {...nik}
                type="number"
                inputmode="numeric"
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
              {/* <input className="form-input" {...birthDate} /> */}
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
                inputmode="numeric"
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
              <input className="form-input" {...companyName} />
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
