import LoadingBackdrop from "components/commons/LoadingBackdrop";
import React, { Fragment, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import VisibilitySensor from "react-visibility-sensor";
// import { TransformComponent } from "react-zoom-pan-pinch";

import SignFieldBox, { QRCodeBox } from "./SignFieldBox";

export const INIT_FIELD_WIDTH = 100;
export const INIT_FIELD_HEIGHT = 50;

const Page = ({
  data,
  pageNum,
  setFields,
  currentSigner,
  pushToStack,
  stateStack,
  setPageCount,
  fields,
  playableFields,
  qrCodePosition,
  setVisibility,
  scale,
  qrCodeImg,
  // fetchAllFields,
  auth,
  addFieldToWorkspace,
  isTheSelectedFieldSameAsThisField,
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

        <QRCodeBox
          qrCodeImg={qrCodeImg}
          qrPosition={qrCodePosition}
          pageNum={pageNum}
        />
      </div>
    </div>
  );
};

const PDFSigner = ({
  fields,
  fileData,
  fetchAllFields,
  setFields,
  currentSigner,
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
    qrCodeImg,
  } = fileData;

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        <div className="wrap-again">
          {placeFieldImages && placeFieldImages?.length > 0 ? (
            placeFieldImages?.map((data, i) => {
              const playableFields = fields
                ? fields
                    ?.filter((field) => field.pageNum === i + 1)
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
              return (
                <Fragment key={i}>
                  <Page
                    data={data}
                    pageNum={i + 1}
                    fields={fields}
                    setFields={setFields}
                    currentSigner={currentSigner}
                    setPageCount={setPageCount}
                    playableFields={playableFields}
                    qrCodePosition={qrCodePosition}
                    qrCodeImg={qrCodeImg}
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
        {/* </TransformComponent> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default PDFSigner;

// export const StaticPDFViewer =

/* <div
          className="wrap-again"
          // style={{ transform: `scale(${scale}%)` }}
          ref={currentRef}
        >
          {placeFieldImages && placeFieldImages?.length > 0 ? (
            placeFieldImages?.map((data, i) => {
              const playableFields = fields
                ? fields
                    ?.filter((field) => field.pageNum === i + 1)
                    .map((field, j) => {
                      return (
                        <FieldBox
                          field={field}
                          onClick={() => setCurrentField(field)}
                          key={j}
                          id={`field-${j + 1}`}
                          pushToStack={pushToStack}
                          fields={fields}
                          setFields={setFields}
                          scale={scale}
                        />
                      );
                    })
                : [];
              return (
                <Page
                  setVisibility={setVisibility}
                  data={data}
                  pageNum={i + 1}
                  fields={fields}
                  setFields={setFields}
                  currentSigner={currentSigner}
                  key={i}
                  pushToStack={pushToStack}
                  stateStack={stateStack}
                  playableFields={playableFields}
                  qrCodePosition={qrCodePosition}
                  scale={scale}
                />
              );
            })
          ) : (
            <LoadingBackdrop />
          )}
        </div>
         */
