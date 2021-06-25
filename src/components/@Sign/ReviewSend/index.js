import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingButton from "../commons/FloatingButton";
import "./reviewSend.css";

import { ReactComponent as LockIcon } from "../../../assets/bnw/Lock Tab Icon.svg";
import Snackbar from "../../commons/Snackbar";
import { isValidEmail } from "../../../helpers/validator";
import { useData } from "../../../contexts/DataContext";
import { useFormInput } from "../../../helpers/hooks";
import StaticPersonRow from "../commons/StaticPersonRow";

const ReviewSend = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(0); // 0: disabled, 1: active
  const [success, setSuccess] = useState(null);
  const emailBody = useFormInput("");
  const emailSubject = useFormInput("");
  const [error, setError] = useState(null);

  const { handle_data_docs, getItemData } = useData();
  const fileData = getItemData(atr, "fileData");
  const signers = getItemData(atr, "signers");

  // const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(0);
      // const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
      // const res = await addUserToDocument(newData, fileData?.id);
      // if (res) {
      //   console.log(res);
      //   setActiveItem((a) => a + 1);
      //   setAvailableLevel((a) => a + 1);
      //   // setFileUrl(newRes?.linkToPdf);
      //   // setAvailableItem((a) => a + 1);
      //   // progress.set(100);
      //   setLoading(1);
      //   setSuccess(t("sign.addSigners.addSignersSuccess"));
      //   setTimeout(() => setSuccess(false), 3000);
      // }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  };

  // useEffect(() => {
  //   console.table(data);
  // }, [data]);

  const addUser = () => {
    let items = Array.from(data);
    items.push({
      name: "",
      email: "",
    });
    setData(items);
  };

  useEffect(() => {
    if (data?.length > 0) {
      console.log(data);
      for (let { name, email } of data) {
        if (name !== "" && email !== "" && isValidEmail(email)) continue;
        else {
          setLoading(0);
          return;
        }
      }
      setLoading(1);
      return;
    }
  }, [data]);

  const handleValue = (type, value, index) => {
    let items = Array.from(data);
    items[index][type] = value;
    setData(items);
  };

  return (
    <>
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="success" text={success} />}
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="container left sign-review-send-container">
            <h4 className="">{t("sign.reviewSend.left.doesAnyNeedCopy")}</h4>
            <div className="add-receivers-area">
              {data?.length > 0 && (
                <div className="row add-receivers">
                  <strong className="col-6">{t("form.name")}</strong>
                  <strong className="col-6">{t("form.emailAddress")}</strong>
                  {data.map((datum, index) => (
                    <StaticPersonRow
                      handleValue={handleValue}
                      data={datum}
                      index={index}
                      key={datum?.id}
                    />
                  ))}
                </div>
              )}
              <button className="add-signers-button" onClick={addUser}>
                <LockIcon />
                <span>{t("sign.reviewSend.left.addReceiver")}</span>
              </button>
            </div>

            <h4 className="">{t("sign.reviewSend.left.doYouWantCustomize")}</h4>

            <div className="mt-3 mb-2">
              <strong>{t("sign.reviewSend.left.emailSubject")}</strong>
              <div className="w-100 mt-1 mb-4">
                <input className="w-100 form" {...emailSubject} />
              </div>

              <strong>{t("sign.reviewSend.left.emailBody")}</strong>
              <div className="w-100  mt-1 mb-4">
                <textarea className="w-100 form" {...emailBody} rows={5} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 ">
          <div className="container right sign-review-send-container">
            <h4 className="text-uppercase">
              {t("sign.reviewSend.right.summary")}
            </h4>
            <div>
              <strong>{t("sign.reviewSend.right.documents")}</strong>
              <div className="w-100  mt-1 mb-4">{fileData?.filename}</div>

              <strong className="w-100  mt-1">
                {t("sign.reviewSend.right.signers")}
              </strong>
              <div className="w-100  mt-1 mb-4">
                <table>
                  <tbody>
                    {signers?.map((signer, i) => (
                      <tr key={i} className="table-row">
                        <td>{signer?.name}</td>
                        <td>{signer?.email}</td>
                        <td>{signer?.flowType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <strong>{t("sign.reviewSend.right.receiveCopy")}</strong>
              <div className="w-100  mt-1 mb-4">
                {fileData?.filename ?? "fewr"}
              </div>
            </div>
            <FloatingButton
              disabled={loading === 0}
              activeItem={activeItem}
              // availableLevel={availableLevel}
              onClickNext={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSend;
