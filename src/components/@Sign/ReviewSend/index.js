import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingButton from "../commons/FloatingButton";
import "./reviewSend.scss";

import { isValidEmail } from "../../../helpers/validator";
import { useData } from "../../../contexts/DataContext";
import { useFormInput } from "../../../helpers/hooks";
import ClearRounded from "@material-ui/icons/ClearRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { useHistory } from "react-router";
import Footer from "components/layout/Navbar/Footer";
import { useModal } from "contexts/ModalContext";
import { FRONTEND_URL } from "helpers/constant";

const DEFAULT_EMAIL_BODY =
  "Your kontrak is nearly complete, please help to review and sign this document";
const DEFAULT_EMAIL_SUBJECT = "Hi Awesome! Please kontrasign this document";

const ReviewSend = ({ atr, activeItemId }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(0); // 0: disabled, 1: active
  const { push } = useHistory();

  const emailBody = useFormInput(DEFAULT_EMAIL_BODY);
  const emailSubject = useFormInput(DEFAULT_EMAIL_SUBJECT);

  const [data, setData] = useState([]);

  const { getItemData } = useData();
  // const { addSnackbar } = useSnackbar();
  const fileData = getItemData(atr, "fileData");
  const signers = fileData?.nextflow;
  const { openVerifySignature } = useModal();
  // const { auth } = useAuth();

  useEffect(() => {
    if (fileData) {
      if (fileData?.uid === undefined) push(`${FRONTEND_URL.docs}`);
    } else push(`${FRONTEND_URL.docs}`);
  }, [fileData, push]);

  const handleNext = () => {
    const body = {
      subject: emailSubject.value,
      body: emailBody.value,
      cc: data?.map((datum) => {
        return { name: datum.name, email: datum.email };
      }),
    };
    openVerifySignature({ body, fileUID: fileData?.uid });
  };

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(0);
  //     const res = await sendDoc(fileData?.uid, body);
  //     if (res) {
  //       handle_data_docs(true, atr, "fileData", res);
  //       addSnackbar(t("sign.reviewSend.submitSuccess"), "success");
  //     }
  //   } catch (err) {
  //     addSnackbar(String(err));
  //   }
  // };
  const lastElementId = useMemo(
    () =>
      data?.reduce(function (a, b) {
        return Math.max(a, b);
      }, 0),
    [data]
  );

  const addUser = () => {
    let items = Array.from(data);
    items.push({
      name: "",
      email: "",
      id: String(lastElementId + 1),
    });
    setData(items);
  };

  const deleteUser = (id) => {
    const items = data?.filter((datum) => datum.id !== id);
    setData(items);
  };

  const isValidUser = useCallback(
    ({ name, email }) =>
      name.trim() !== "" && email.trim() !== "" && isValidEmail(email),
    []
  );

  useEffect(() => {
    if (data?.length > 0) {
      for (let datum of data) {
        if (isValidUser(datum)) continue;
        else {
          setLoading(0);
          return;
        }
      }
      if (emailSubject.value.trim() !== "" && emailBody.value.trim() !== "") {
        setLoading(1);
        return;
      }
      setLoading(0);
      return;
    }
  }, [data, isValidUser, emailSubject.value, emailBody.value]);

  const handleValue = (type, value, index) => {
    let items = Array.from(data);
    items[index][type] = value;
    setData(items);
  };

  return (
    <>
      <div className="row ">
        <div className="col-lg-6 col-md-12">
          <div className="container left sign-review-send-container">
            <h4 className="">{t("sign.reviewSend.left.doesAnyNeedCopy")}</h4>
            <div className="add-receivers-area">
              <div className="row add-receivers">
                <div className="col-6">
                  <strong>{t("form.name")}</strong>
                </div>
                <div className="col-6">
                  <strong className="">{t("form.emailAddress")}</strong>
                </div>
              </div>
              <div className="add-copy-user-container">
                {data?.length > 0 &&
                  data.map((datum, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-6">
                          <input
                            className="w-100"
                            value={datum?.name}
                            onChange={(e) =>
                              handleValue("name", e.target.value, index)
                            }
                          />
                        </div>
                        <div className="col-6">
                          <input
                            className="w-100"
                            value={datum?.email}
                            onChange={(e) =>
                              handleValue("email", e.target.value, index)
                            }
                          />
                        </div>
                        <div className="clear-rounded-icon">
                          <ClearRounded onClick={() => deleteUser(datum?.id)} />
                        </div>
                      </div>
                    );
                  })}

                <div className="row">
                  <div className="col-12">
                    <button className="add-signers-button" onClick={addUser}>
                      <div>
                        <AddCircleOutlineRoundedIcon />
                        <span>{t("sign.reviewSend.left.addReceiver")}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="">{t("sign.reviewSend.left.doYouWantCustomize")}</h4>

            <div className="mt-3 mb-2">
              <strong>{t("sign.reviewSend.left.emailSubject")}</strong>
              <div className="w-100 mt-1 mb-4">
                <input className="w-100 form p-1" {...emailSubject} />
              </div>

              <strong>{t("sign.reviewSend.left.emailBody")}</strong>
              <div className="w-100  mt-1 mb-4">
                <textarea className="w-100 form p-1" {...emailBody} rows={5} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 ">
          <div className="container right sign-review-send-container">
            <div className="first-child">
              <h4 className="text-uppercase mb-4">
                {t("sign.reviewSend.right.summary")}
              </h4>
              <div>
                <strong>{t("sign.reviewSend.right.documents")}</strong>
                <div className="w-100  mt-1 mb-4">{fileData?.filename}</div>

                <strong className="w-100  mt-1">
                  {t("sign.reviewSend.right.signers")}
                </strong>
                <div className="w-100 mt-1 mb-4">
                  <table className="signers-table">
                    <tbody>
                      {signers &&
                        signers?.map((signer, i) => (
                          <tr key={i} className="table-row">
                            <td>{signer?.name}</td>
                            <td>{signer?.email}</td>
                            <td>{signer?.flowtype}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <strong>{t("sign.reviewSend.right.receiveCopy")}</strong>
                <div className="w-100 mt-1 mb-4">
                  <table>
                    <tbody>
                      {data?.length > 0 ? (
                        data?.map(
                          (copy, i) =>
                            isValidUser(copy) && (
                              <tr key={i} className="table-row">
                                <td>{copy.name}</td>
                                <td>{copy.email}</td>
                                <td>
                                  {t("sign.reviewSend.right.receiveCopy")}
                                </td>
                              </tr>
                            )
                        )
                      ) : (
                        <>
                          <tr className="fallback-empty-row">
                            <td>{t("sign.reviewSend.right.noEntry")}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <div>
                    <small>{t("sign.reviewSend.right.allRecBlaBla")}</small>
                  </div>
                </div>
              </div>
            </div>
            <FloatingButton
              disabled={loading === 20}
              onClickPrev={() => push(`${atr}#${activeItemId - 1}`)}
              activeItemId={activeItemId}
              onClickNext={handleNext}
              nextText={t("general.iagree")}
            />
          </div>
        </div>
      </div>
      <div className="mt-4" />
      <Footer />
    </>
  );
};

export default ReviewSend;
