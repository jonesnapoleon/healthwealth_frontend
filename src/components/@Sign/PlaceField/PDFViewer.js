import LoadingBackdrop from "components/commons/LoadingBackdrop";
import React, { Fragment, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import VisibilitySensor from "react-visibility-sensor";
// import { TransformComponent } from "react-zoom-pan-pinch";

import FieldBox, { QRCodeBox } from "./FieldBox";

export const INIT_FIELD_WIDTH = 100;
export const INIT_FIELD_HEIGHT = 50;

const Page = ({
  data,
  pageNum,
  setFields,
  currentSigner,
  pushToStack,
  stateStack,
  fields,
  playableFields,
  qrCodePosition,
  setVisibility,
  scale,
  qrCodeImg,
  auth,
  isTheSelectedFieldSameAsThisField,
}) => {
  const { t } = useTranslation();
  const [, drop] = useDrop(
    () => ({
      accept: "field",
      drop: (item, monitor) => {
        return addFieldToWorkspace(
          item.type,
          monitor.getClientOffset(),
          pageNum
        );
      },
      collect: (monitor) => ({
        position: monitor.getClientOffset(),
      }),
    }),
    [currentSigner, fields, stateStack]
  );

  const getNewFieldValue = (type) => {
    if (type === "date") return String(new Date());
    if (type === "name") return auth?.fullname;
    if (type in auth) return auth?.[type];
    return "";
  };

  const addFieldToWorkspace = (type, fieldPosition, pageNum) => {
    let curPage = document.getElementById("one-image-area-" + pageNum);
    const pagePosition = curPage?.getBoundingClientRect();
    let x =
      (fieldPosition?.x - pagePosition.left - INIT_FIELD_WIDTH / 2) /
      pagePosition.width;
    let y =
      (fieldPosition?.y - pagePosition.top - INIT_FIELD_HEIGHT / 2) /
      pagePosition.height;

    let w = INIT_FIELD_WIDTH / pagePosition.width;
    let h = INIT_FIELD_HEIGHT / pagePosition.height;

    let newField = {
      type: t(String(type)),
      x,
      y,
      w,
      h,
      fieldname: t(String(type)),
      pageNum,
      signer: currentSigner,
      required: true,
      pagePosition,
      value:
        auth?.email !== currentSigner?.email
          ? ""
          : getNewFieldValue(t(String(type)).toLowerCase()),
      formatting: { font: "Arial", size: 12 },
    };

    setFields([...fields, newField]);
    pushToStack([...fields, newField]);
  };

  return (
    <VisibilitySensor
      containment={document.querySelector(`fu-wrapper`)}
      minTopValue={0.5 * window.innerHeight}
      partialVisibility
      onChange={(isVisible) => {
        isVisible && setVisibility(pageNum);
      }}
    >
      <div className="one-image-area" ref={drop}>
        <div
          id={`one-image-area-${pageNum}`}
          style={{ backgroundImage: `url(${data})` }}
          className="one-image"
        >
          <img
            src={data}
            alt=""
            className="invisible"
            onLoad={() => {
              setVisibility(1);
              let curPage = document.getElementById(
                "one-image-area-" + pageNum
              );
              const pagePosition = curPage?.getBoundingClientRect();
              let temp = fields.map((field) => {
                return { ...field, pagePosition };
              });
              setFields(temp);
            }}
          />
          {playableFields}
          {/* {divPosition === undefined ? */}
          <QRCodeBox
            qrCodeImg={qrCodeImg}
            qrPosition={qrCodePosition}
            pageNum={pageNum}
          />

          {/* : null} */}
        </div>
      </div>
    </VisibilitySensor>
  );
};

const PDFViewer = ({
  fields,
  setFields,
  currentSigner,
  setCurrentField,
  currentField,
  pushToStack,
  stateStack,
  qrCodePosition,
  setVisibility,
  scale,
  setScale,
  fileName,
  placeFieldImages,
  qrCodeImg,
  auth,
  isTheSelectedFieldSameAsThisField,
  isTheseFieldsSame,
}) => {
  // const currentRef = useRef(null);

  // useEffect(() => {
  //   currentRef.current?.scrollIntoView();
  // }, [scale]);

  useEffect(() => {
    console.log("ACTIVE FIELED", currentField);
    console.log(
      "CURRENT ALL FIELDS",
      fields,
      fields.map((a) => isTheSelectedFieldSameAsThisField(a))
    );
  }, [fields, currentField, isTheSelectedFieldSameAsThisField]);

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        {/* {({ zoomIn, zoomOut, resetTransform, ...rest }) => ( */}
        {/* <TransformComponent> */}
        <div
          className="wrap-again"
          // style={{ transform: `scale(${scale}%)` }}
          // ref={currentRef}
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
                          onClick={() => {
                            setCurrentField(field);
                          }}
                          currentField={currentField}
                          isTheseFieldsSame={isTheseFieldsSame}
                          setCurrentField={setCurrentField}
                          key={j}
                          id={`field-${j + 1}`}
                          isTheSelectedFieldSameAsThisField={
                            isTheSelectedFieldSameAsThisField
                          }
                          pushToStack={pushToStack}
                          fields={fields}
                          setFields={setFields}
                          scale={scale}
                        />
                      );
                    })
                : [];
              return (
                <Fragment key={i}>
                  <Page
                    setVisibility={setVisibility}
                    data={data}
                    pageNum={i + 1}
                    fields={fields}
                    setFields={setFields}
                    currentSigner={currentSigner}
                    pushToStack={pushToStack}
                    stateStack={stateStack}
                    playableFields={playableFields}
                    qrCodePosition={qrCodePosition}
                    scale={scale}
                    qrCodeImg={qrCodeImg}
                    auth={auth}
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

export default PDFViewer;

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
