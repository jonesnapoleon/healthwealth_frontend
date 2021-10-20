import LoadingBackdrop from "components/commons/LoadingBackdrop";
import React, { Fragment, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import VisibilitySensor from "react-visibility-sensor";
// import { TransformComponent } from "react-zoom-pan-pinch";

import FieldBox, { QRCodeBox } from "./FieldBox";

export const INIT_FIELD_WIDTH = 140;
export const INIT_FIELD_HEIGHT = 70;

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
  setIsShow,
  addFieldToWorkspace,
  isTheSelectedFieldSameAsThisField,
}) => {
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

  return (
    <div className="one-image-area" ref={drop}>
      <div
        id={`one-image-area-${pageNum}`}
        style={{ backgroundImage: `url(${data})` }}
        className="one-image"
      >
        <VisibilitySensor
          containment={document.querySelector(`.fu-wrapper`)}
          minTopValue={0.5 * window.innerHeight}
          partialVisibility
          onChange={(isVisible) => {
            isVisible && setVisibility(pageNum);
          }}
        >
          <>
            <img
              src={data}
              alt=""
              onClick={() => setIsShow(true)}
              className="invisible"
              onLoad={() => {
                setVisibility(1);
                // fetchAllFields();
                setPageCount((a) => a + 1);
                // let curPage = document.getElementById(
                //   "one-image-area-" + pageNum
                // );
                // const pagePosition = curPage?.getBoundingClientRect();
                // let temp = fields.map((field) => {
                //   return { ...field, pagePosition };
                // });
                // setFields(temp);
              }}
            />
            {playableFields}
            <QRCodeBox
              scale={scale}
              qrCodeImg={qrCodeImg}
              qrPosition={qrCodePosition}
              pageNum={pageNum}
            />
          </>
        </VisibilitySensor>
      </div>
    </div>
  );
};

const PDFViewer = ({
  fields,
  setIsShow,
  fetchAllFields,
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
  isTheSelectedFieldSameAsThisField,
  isTheseFieldsSame,
  addFieldToWorkspace,
}) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (pageCount === placeFieldImages.length && pageCount !== 0)
      fetchAllFields();
  }, [pageCount, placeFieldImages, fetchAllFields]);

  // useEffect(() => {
  //   console.log("ACTIVE FIELED", currentField);
  //   console.log("CURRENT ALL FIELDS", fields);
  // }, [fields, currentField, isTheSelectedFieldSameAsThisField]);

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        <div
          className="wrap-again"
          style={{ transform: `scale(${scale / 100})` }}
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
                          setIsShow={setIsShow}
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
                    addFieldToWorkspace={addFieldToWorkspace}
                    setFields={setFields}
                    currentSigner={currentSigner}
                    setPageCount={setPageCount}
                    pushToStack={pushToStack}
                    setIsShow={setIsShow}
                    stateStack={stateStack}
                    playableFields={playableFields}
                    qrCodePosition={qrCodePosition}
                    scale={scale}
                    qrCodeImg={qrCodeImg}
                  />
                  <div
                    className="one-image-meta-info"
                    onClick={() => setIsShow(true)}
                  >
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
