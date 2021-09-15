import LoadingBackdrop from "components/commons/LoadingBackdrop";
import { useModal } from "contexts/ModalContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { getFrontendDateFormat } from "helpers/transformer";
import React, { Fragment, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import SignFieldBox, { QRCodeBox } from "./SignFieldBox";

export const INIT_FIELD_WIDTH = 100;
export const INIT_FIELD_HEIGHT = 50;

const Page = ({
  data,
  pageNum,
  playableFields,
  qrCodeComponent,
  setPageCount,
}) => {
  return (
    <div className="one-image-area">
      <div
        id={`one-sign-image-area-${pageNum}`}
        style={{ backgroundImage: `url(${data})` }}
        className="one-image"
      >
        <img
          src={data}
          alt=""
          className="invisible"
          onLoad={() => setPageCount((a) => a + 1)}
        />
        {playableFields}
        {qrCodeComponent}
      </div>
    </div>
  );
};

export const LeftArea = ({
  setFields,
  currentSigner,
  fields,
  isTheseFieldsSame,
}) => {
  const { t } = useTranslation();
  const initial_image_url = useMemo(
    () => currentSigner?.initial_finished_url ?? "",
    [currentSigner]
  );
  const signature_image_url = useMemo(
    () => currentSigner?.signature_finished_url ?? "",
    [currentSigner]
  );
  const { openSignatureModal, show } = useModal();
  const { addSnackbar } = useSnackbar();

  const getValue = (type) => {
    if (type === "name") return currentSigner?.fullname;
    if (type === "date") return getFrontendDateFormat();
    if (type === "initial") return initial_image_url;
    if (type === "signature") return signature_image_url;
    return currentSigner?.[type];
  };

  const handleClick = () => {
    let temp = fields;
    try {
      let val = [];
      for (let field of temp) {
        if (field.isEditing) {
          val.push(field);
        } else if (
          !["signature", "initial"].includes(String(field?.type).toLowerCase())
        ) {
          val.push({
            ...field,
            isEditing: true,
            value: getValue(String(field?.type).toLowerCase()),
          });
        } else {
          if (
            (!signature_image_url &&
              String(field?.type).toLowerCase() === "signature") ||
            (!initial_image_url &&
              String(field?.type).toLowerCase() === "initial")
          ) {
            openSignatureModal({
              isInitial: String(field?.type).toLowerCase() === "initial",
              extraCallback: () => {
                show.set(false);
                let temp = fields;
                let ax = temp.map((oneField) => {
                  return {
                    ...oneField,
                    value: !isTheseFieldsSame(oneField, field)
                      ? oneField?.value
                      : String(field?.type).toLowerCase() === "initial"
                      ? initial_image_url
                      : signature_image_url,
                  };
                });
                setFields(ax);
              },
            });
            throw new Error("");
          } else {
            return {
              ...field,
              isEditing: true,
              value: getValue(String(field?.type).toLowerCase()),
            };
          }
        }
      }
      console.log(val);
      setFields(val);
    } catch (e) {
      addSnackbar(String(e));
    }
  };
  return (
    <div className="left-sidebar position-fixed">
      <div className="container">
        <div className="row pt-2">
          <div style={{ display: "grid", placeItems: "center" }}>
            <div className="button">
              <button
                onClick={handleClick}
                className="btn-primary button-landing"
                style={{
                  borderRadius: "var(--border-radius)",
                }}
              >
                {t("sign.document.oneClickSign")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PDFSigner = ({
  fields,
  fileData,
  fetchAllFields,
  setFields,
  placeFieldImages,
  isTheseFieldsSame,
}) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (pageCount === placeFieldImages.length && pageCount !== 0)
      fetchAllFields();
  }, [pageCount, placeFieldImages, fetchAllFields]);

  const {
    filename: fileName = "",
    qrcode: qrCodePosition = 2,
    qrcodeImg: qrCodeImg,
  } = fileData;

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        <div className="wrap-again">
          {placeFieldImages && placeFieldImages?.length > 0 ? (
            placeFieldImages?.map((data, i) => {
              const playableFields = fields
                ? fields
                    ?.filter(
                      (field) => field.pageNum === i + 1 && field.editable
                    )
                    .map((field, j) => {
                      return (
                        <SignFieldBox
                          field={field}
                          isTheseFieldsSame={isTheseFieldsSame}
                          key={j}
                          fields={fields}
                          setFields={setFields}
                        />
                      );
                    })
                : [];

              const QRCode = () => (
                <QRCodeBox
                  qrCodeImg={qrCodeImg}
                  qrPosition={qrCodePosition}
                  pageNum={i + 1}
                />
              );

              return (
                <Fragment key={i}>
                  <Page
                    data={data}
                    pageNum={i + 1}
                    setPageCount={setPageCount}
                    playableFields={playableFields}
                    qrCodeComponent={<QRCode />}
                  />
                  <div className="one-image-meta-info">
                    <span>{fileName}</span>
                    <span>
                      Page {i + 1} of {placeFieldImages?.length}
                    </span>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <LoadingBackdrop />
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFSigner;
