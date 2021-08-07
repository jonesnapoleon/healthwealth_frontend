import { set } from "date-fns";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
// import { getImageSize } from "../../../helpers/transformer";
import VisibilitySensor from "react-visibility-sensor";

import FieldBox from "./FieldBox";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/822204_jpg1627207587207";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;
const QR_CODE_RELATIVE_SIZE = 0.15;

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
}) => {
  // const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  // const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

  const [, drop] = useDrop(
    () => ({
      accept: "field",
      drop: (item, monitor) => {
        // console.log("mon", monitor);
        return addFieldToWorkspace(
          item.type,
          monitor.getClientOffset(),
          pageNum
        );
      },
      // collect: (monitor) => ({
      //   position: monitor.getClientOffset(),
      // }),
    }),
    [currentSigner, fields, stateStack]
  );

  const addFieldToWorkspace = (type, fieldPosition, pageNum) => {
    let curPage = document.getElementById("one-image-area-" + pageNum);
    const pagePosition = curPage?.getBoundingClientRect();

    console.log("add", fieldPosition, pageNum, pagePosition);

    let x =
      (fieldPosition?.x - pagePosition.left - INIT_FIELD_WIDTH / 2) /
      pagePosition.width;
    let y =
      (fieldPosition?.y - pagePosition.top - INIT_FIELD_HEIGHT / 2) /
      pagePosition.height;

    let w = INIT_FIELD_WIDTH / pagePosition.width;
    let h = INIT_FIELD_HEIGHT / pagePosition.height;
    let newField = {
      type,
      x,
      y,
      w,
      h,
      pageNum,
      signer: currentSigner,
      required: true,
      pagePosition,
      deleted: false,
      uid: "a5bf6a9f-3656-40c8-b159-1fcb2f9d3a44", // TODO get from BE
    };

    setFields((fields) => [...fields, newField]);
    pushToStack([...fields, newField]);
    console.log(`dropped ${type} at (${x}, ${y}) on page ${pageNum}`);
  };

  // useEffect(() => {
  //   const x = getImageSize(data, (_, height) => console.log(height));
  //   console.log(x);
  // }, [data]);

  // useEffect(() => {
  //   console.log(height);
  // }, [height]);

  // TODO calculate after render
  const [qrCodeDimension, setqrCodeDimension] = useState(0);
  const [qrCodeSize, setqrCodeSize] = useState(0);
  useEffect(() => {
    const divPosition = document
      .getElementById(`one-image-area-${pageNum}`)
      ?.getBoundingClientRect();
    if (!divPosition) return;
    const qrCodeFromBorder = 0.02;
    let qrCodeSize = Math.min(
      QR_CODE_RELATIVE_SIZE * divPosition.width,
      QR_CODE_RELATIVE_SIZE * divPosition.height
    );
    let qrCodeDimension = { x: 20, y: 20 };
    if (qrCodePosition === 0) {
      qrCodeDimension.x = qrCodeFromBorder * divPosition.width;
      qrCodeDimension.y = qrCodeFromBorder * divPosition.height;
    } else if (qrCodePosition === 1) {
      qrCodeDimension.x =
        (1 - qrCodeFromBorder) * divPosition.width - qrCodeSize;
      qrCodeDimension.y = qrCodeFromBorder * divPosition.height;
    } else if (qrCodePosition === 2) {
      qrCodeDimension.x =
        (1 - qrCodeFromBorder) * divPosition.width - qrCodeSize;
      qrCodeDimension.y =
        (1 - qrCodeFromBorder) * divPosition.height - qrCodeSize;
    } else if (qrCodePosition === 3) {
      qrCodeDimension.x = qrCodeFromBorder * divPosition.width;
      qrCodeDimension.y =
        (1 - qrCodeFromBorder) * divPosition.height - qrCodeSize;
    }
    setqrCodeDimension(qrCodeDimension);
    setqrCodeSize(qrCodeSize);
  }, [pageNum, qrCodePosition]);
  // const { qrCodeDimension, qrCodeSize } = useMemo(() => {
  //   return { qrCodeDimension, qrCodeSize };
  // }, [pageNum, qrCodePosition]);

  return (
    <VisibilitySensor
      // partialVisibility
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
          <img src={data} alt="" className="invisible" />
          {playableFields}
          {/* {divPosition === undefined ? */}
          <img
            src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
            alt="qrcode"
            style={{
              position: "absolute",
              width: qrCodeSize,
              height: qrCodeSize,
              left: qrCodeDimension.x,
              top: qrCodeDimension.y,
            }}
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
  pushToStack,
  stateStack,
  qrCodePosition,
  setVisibility,
  scale,
}) => {
  const num = [0, 0, 0].map((_) => image);

  const currentRef = useRef(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView();
  }, [scale]);
  // React.useEffect(() => {
  //   console.log("frgt", visibility);
  // }, [visibility]);

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        <div
          className="wrap-again"
          style={{ transform: `scale(${scale}%)` }}
          ref={currentRef}
        >
          {num?.map((data, i) => {
            const playableFields = fields
              ? fields
                  ?.filter((field) => field.pageNum === i + 1)
                  .map((field, j) => {
                    return field.deleted ? null : (
                      <FieldBox
                        field={field}
                        onClick={() => setCurrentField(field)}
                        key={j}
                        id={`field-${j + 1}`}
                        pushToStack={pushToStack}
                        fields={fields}
                        setFields={setFields}
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
