import LoadingBackdrop from "components/commons/LoadingBackdrop";
import React, { useState, useRef, useEffect, memo } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";

import FieldBox from "./FieldBox";

// const INIT_FIELD_WIDTH = 100;
// const INIT_FIELD_HEIGHT = 50;
const QR_CODE_RELATIVE_SIZE = 0.15;

const Page = ({ data, pageNum, playableFields, qrCodePosition }) => {
  // TODO calculate after render
  const [qrCodeDimension, setqrCodeDimension] = useState(0);
  const [qrCodeSize, setqrCodeSize] = useState(0);
  useEffect(() => {
    const divPosition = document
      .getElementById(`one-image-area-${pageNum}`)
      ?.getBoundingClientRect();
    if (!divPosition) return;
    const qrCodeFromBorder = 0.02;
    divPosition.width /= 100;
    divPosition.height /= 100;
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
    <div className="one-image-area">
      <div
        id={`one-image-area-${pageNum}`}
        style={{ backgroundImage: `url(${data})` }}
        className="one-image"
      >
        <img src={data} alt="" className="invisible" />
        {playableFields}
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
      </div>
    </div>
  );
};

const PDFSigner = ({
  fields,
  setFields,
  currentSigner,
  setCurrentField,
  pushToStack,
  stateStack,
  qrCodePosition,
  setVisibility,
  placeFieldImages,
}) => {
  const currentRef = useRef(null);

  return (
    <div id="main-workspace">
      <div className="fu-wrapper">
        <TransformComponent>
          <div className="wrap-again" ref={currentRef}>
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
              })
            ) : (
              <LoadingBackdrop />
            )}
          </div>
        </TransformComponent>
      </div>
    </div>
  );
};

export default memo(PDFSigner);
