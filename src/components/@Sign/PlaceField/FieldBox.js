import React, { useRef, useMemo } from "react";
import { Rnd } from "react-rnd";
import { useTranslation } from "react-i18next";
import { INIT_FIELD_WIDTH } from "./PDFViewer";
import { QR_CODE_RELATIVE_SIZE } from ".";

export const getReadableFieldName = (field, t) => {
  const fieldName = t(String(field.type));
  let label = "";
  const fieldType = {
    SIGNATURE: String(t("sign.placeFields.left.buttons.signature")),
    INITIAL: String(t("sign.placeFields.left.buttons.initial")),
    DATE: String(t("sign.placeFields.left.buttons.date")),
    EMAIL: String(t("sign.placeFields.left.buttons.email")),
    NAME: String(t("sign.placeFields.left.buttons.name")),
    COMPANY: String(t("sign.placeFields.left.buttons.company")),
    TITLE: String(t("sign.placeFields.left.buttons.title")),
    TEXTBOX: String(t("sign.placeFields.left.buttons.textbox")),
    CHECKBOX: String(t("sign.placeFields.left.buttons.checkbox")),
  };
  switch (fieldName) {
    case fieldType.NAME:
      label = field.signer.label;
      break;
    case fieldType.EMAIL:
      label = field.signer.value;
      break;
    case fieldType.TEXTBOX:
      label = "TEXTBOX";
      break;
    case fieldType.CHECKBOX:
      label = "CHECKBOX";
      break;
    default:
      label = `${field.signer.label}'s ${t(String(field.type))}`;
      break;
  }
  return label;
};

const FieldHandle = ({ color, stroke }) => {
  return (
    <svg
      height="10pt"
      width="10pt"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="5"
        cy="5"
        r="5"
        stroke={stroke}
        strokeWidth="0.1"
        fill={color}
      />
    </svg>
  );
};

const DeleteFieldHandle = () => {
  return (
    <svg
      height="10pt"
      width="10pt"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <path
        d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
        fill="red"
      />
      <path
        d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
        fill="white"
      />
    </svg>
  );
};

const FieldBox = ({ field, pushToStack, fields, setFields, onClick }) => {
  const { t } = useTranslation();
  const handle = (
    <FieldHandle
      color={field?.signer?.color ?? ""}
      stroke={field?.signer?.color ?? ""}
    />
  );

  const deleteHandle = <DeleteFieldHandle />;
  const EPSILON = 0.002;
  const sampleRef = useRef(null);
  sampleRef?.current?.updatePosition({
    x: field.x * field.pagePosition.width,
    y: field.y * field.pagePosition.height,
  });
  sampleRef?.current?.updateSize({
    width: field.w * field.pagePosition.width,
    height: field.h * field.pagePosition.height,
  });

  const fieldLabel = useMemo(() => getReadableFieldName(field, t), [field, t]);

  return (
    <Rnd
      ref={sampleRef}
      bounds="parent"
      resizeHandleComponent={{
        topLeft: handle,
        topRight: deleteHandle,
        bottomLeft: handle,
        bottomRight: handle,
      }}
      default={{
        x: field.x * field.pagePosition.width,
        y: field.y * field.pagePosition.height,
        width: field.w * field.pagePosition.width,
        height: field.h * field.pagePosition.height,
      }}
      enableResizing={{
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
      }}
      onResizeStop={(e, handlePos, component, delta, position) => {
        if (delta.width === 0 && delta.height === 0) {
          if (handlePos === "topRight") {
            field.deleted = true;
            console.log("deleted!", field);
            setFields(fields);
            pushToStack(fields);
          }
        } else {
          field.x = position.x / field.pagePosition.width;
          field.y = position.y / field.pagePosition.height;
          field.w += delta.width / field.pagePosition.width;
          field.h += delta.height / field.pagePosition.height;
          console.log("resized!", field);
          setFields(fields);
          pushToStack(fields);
        }
      }}
      onDragStop={(e, component) => {
        let newX = component.x / field.pagePosition.width;
        let newY = component.y / field.pagePosition.height;
        if (
          Math.abs(newX - field.x) > EPSILON &&
          Math.abs(newY - field.y) > EPSILON
        ) {
          field.x = newX;
          field.y = newY;
          console.log("moved!", JSON.parse(JSON.stringify(field)));
          // setFields(fields);
          pushToStack(fields);
        }
      }}
      style={{ border: 0, zIndex: 888 }}
      className="draggable-item"
    >
      <span
        className="rnd-content"
        onClick={onClick}
        style={{
          backgroundColor: field.signer.backgroundColor,
          color: "white",
        }}
      >
        <span className="text-uppercase">
          {/* {field.type} - {field.pageNum} */}
          {fieldLabel}
        </span>
      </span>
    </Rnd>
  );
};

export const QRCodeBox = ({ qrPosition, pageNum }) => {
  // useEffect(() => {
  const divPosition = document
    .getElementById(`one-image-area-${pageNum}`)
    ?.getBoundingClientRect();
  const size = QR_CODE_RELATIVE_SIZE * divPosition?.width ?? INIT_FIELD_WIDTH;

  const offsetLeftPercentage = [1, 4].includes(qrPosition)
    ? 0.02
    : 0.98 - QR_CODE_RELATIVE_SIZE;
  const offsetTop = [1, 2].includes(qrPosition)
    ? 0.015 * divPosition?.height ?? 0
    : 0.985 * divPosition?.height - size;
  //   if (!divPosition) return;
  // const qrCodeFromBorder = 0.02;
  // divPosition.width /= scale / 100;
  // divPosition.height /= scale / 100;
  //   let qrCodeSize = Math.min(
  //     QR_CODE_RELATIVE_SIZE * divPosition.width,
  //     QR_CODE_RELATIVE_SIZE * divPosition.height
  //   );

  // console.log("div[pos", divPosition);
  return (
    <img
      src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
      alt="qrcode"
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: offsetLeftPercentage * divPosition?.width ?? 0,
        top: offsetTop,
      }}
    />
  );
};

export default FieldBox;
