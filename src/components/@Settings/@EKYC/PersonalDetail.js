import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import { useTranslation } from "react-i18next";
import { sendOTPPhone, updateUser, verifyOTPPhone } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { ReactComponent as CalendarIcon } from "../../../assets/bnw/Add Field - Dates Icon.svg";
import {
  useFormInput,
  useInput,
  useIsLargeScreen,
} from "../../../helpers/hooks";

import { PersonalDetailValidator } from "../../../helpers/validator";
import { getBackendDateFormat } from "../../../helpers/transformer";
import { useSnackbar } from "contexts/SnackbarContext";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useModal } from "contexts/ModalContext";

const PersonalDetail = () => {
  const { auth, putAuth } = useAuth();
  const { t } = useTranslation();
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

  const { addSnackbar } = useSnackbar();
  const { openVerifySignature, onClose } = useModal();

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
      if (res?.data) putAuth(res.data);

      addSnackbar(t("settings.ekyc.editProfileSuccess"), "success");
    } catch (err) {
      addSnackbar(String(err));
    } finally {
      setLoading(false);
    }
  };

  const sendOTPToPhone = async () => {
    try {
      setLoading(true);
      const res = await sendOTPPhone();
      if (res) {
        addSnackbar(t("popup.sign.verify.success1"), "success");
      }
    } catch (err) {
      addSnackbar(String(err));
    } finally {
      setLoading(!true);
    }
  };

  const verifyOTP = async (otp) => {
    try {
      setLoading(true);
      const res = await verifyOTPPhone(otp);
      if (res?.data) {
        putAuth(res.data);
        addSnackbar(t("popup.sign.verify.success2"), "success");
        onClose();
      }
    } catch (err) {
      addSnackbar(String(err));
    } finally {
      setLoading(!true);
    }
  };

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
      <div className="head">UID: {auth?.uid}</div>
      <div className="head bold">{t("settings.ekyc.personalDetail")}</div>

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

          <tr className="position-relative">
            <td>{t("settings.ekyc.email")}</td>
            <td>
              <input className="form-input" value={auth?.email} disabled />
            </td>
            {isLargeScreen && (
              <VerifiedUserIcon className="hanging-right-icon verified-icon" />
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

              {!auth?.verifiedPhone && (
                <div className="item-right">
                  <button
                    className="text-only-button"
                    onClick={() =>
                      openVerifySignature({
                        isAuth: true,
                        sendOTPAuthWrapper: sendOTPToPhone,
                        verifyOTPAuthWrapper: verifyOTP,
                      })
                    }
                  >
                    {t("otp.sendOtp")}
                  </button>
                </div>
              )}
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
                  className="btn btn-black btn-primary btn-lg"
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
