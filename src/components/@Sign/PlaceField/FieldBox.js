import React, { useRef, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { INIT_FIELD_WIDTH } from "./PDFViewer";
import { QR_CODE_RELATIVE_SIZE } from ".";

import DateRangeIcon from "@material-ui/icons/DateRangeRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmailRounded";
import BusinessIcon from "@material-ui/icons/BusinessRounded";
import WorkOutlineIcon from "@material-ui/icons/WorkOutlineRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faSignature } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "contexts/AuthContext";
import { useModal } from "contexts/ModalContext";

const fieldIcon = {
  SIGNATURE: <FontAwesomeIcon icon={faSignature} />,
  INITIAL: <FontAwesomeIcon icon={faPenSquare} />,
  DATE: <DateRangeIcon style={{ width: "0.875em" }} />,
  NAME: <PersonIcon style={{ width: "0.875em" }} />,
  EMAIL: <AlternateEmailIcon style={{ width: "0.875em" }} />,
  COMPANY: <BusinessIcon style={{ width: "0.875em" }} />,
  TITLE: <WorkOutlineIcon style={{ width: "0.875em" }} />,
};

export const getReadableFieldIcon = (field, t) => {
  // const fieldName = t(String(field.type));
  const fieldUpperCase = String(field?.type).toUpperCase();
  return fieldIcon[fieldUpperCase] ?? <BusinessIcon />;
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

const FieldBox = ({
  field,
  pushToStack,
  fields,
  setFields,
  onClick,
  currentField,
  setCurrentField,
  isTheSelectedFieldSameAsThisField,
  isTheseFieldsSame,
}) => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { openSignatureModal, show } = useModal();

  const initial_image_url = useMemo(
    () => auth?.initial_finished_url ?? "",
    [auth]
  );
  const signature_image_url = useMemo(
    () => auth?.signature_finished_url ?? "",
    [auth]
  );

  // useEffect(() => {
  //   let temp = fields;
  //   let ax = temp.map((oneField) => {
  //     return {
  //       ...oneField,
  //       value: !isTheSelectedFieldSameAsThisField(oneField)
  //         ? oneField?.value
  //         : String(field?.type).toLowerCase() === "initial"
  //         ? initial_image_url
  //         : signature_image_url,
  //     };
  //   });
  //   setFields(ax);
  //   setCurrentField((field) => {
  //     return {
  //       ...field,
  //       value: !isTheSelectedFieldSameAsThisField(field)
  //         ? field?.value
  //         : String(field?.type).toLowerCase() === "initial"
  //         ? initial_image_url
  //         : signature_image_url,
  //     };
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   initial_image_url,
  //   signature_image_url,
  //   isTheSelectedFieldSameAsThisField,
  // ]);

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
    x: field.x * field?.pagePosition?.width,
    y: field.y * field?.pagePosition?.height,
  });
  sampleRef?.current?.updateSize({
    width: field.w * field?.pagePosition?.width,
    height: field.h * field?.pagePosition?.height,
  });
  const fieldElement = useMemo(() => getReadableFieldIcon(field), [field]);

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
        x: field.x * field?.pagePosition?.width,
        y: field.y * field?.pagePosition?.height,
        width: field.w * field?.pagePosition?.width,
        height: field.h * field?.pagePosition?.height,
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
            // field.deleted = true;
            let temp = fields.filter((t) => !isTheseFieldsSame(t, field));
            // console.log("deleted!", field);
            setFields(temp);
            pushToStack(fields);
          }
        } else {
          // let temp = fields.filter((t) => {
          //   return {
          //     ...t,
          //     x: !isTheseFieldsSame(t, field)
          //       ? t.x
          //       : position.x / field.pagePosition.width,
          //     ...t,
          //     y: !isTheseFieldsSame(t, field)
          //       ? t.y
          //       : position.y / field.pagePosition.height,
          //     ...t,
          //     w: !isTheseFieldsSame(t, field)
          //       ? t.w
          //       : t.w + delta.width / field.pagePosition.width,
          //     ...t,
          //     h: !isTheseFieldsSame(t, field)
          //       ? t.h
          //       : t.h + delta.height / field.pagePosition.width,
          //   };
          // });
          field.x = position.x / field?.pagePosition?.width;
          field.y = position.y / field?.pagePosition?.height;
          field.w += delta.width / field?.pagePosition?.width;
          field.h += delta.height / field?.pagePosition?.height;
          console.log("resized!", field);
          setFields(fields);
          pushToStack(fields);
        }
      }}
      onDragStop={(e, component) => {
        let newX = component.x / field?.pagePosition?.width;
        let newY = component.y / field?.pagePosition?.height;
        if (
          Math.abs(newX - field.x) > EPSILON &&
          Math.abs(newY - field.y) > EPSILON
        ) {
          // let temp = fields.filter((t) => {
          //   return {
          //     ...t,
          //     x: !isTheseFieldsSame(t, field) ? t.x : newX,
          //     y: !isTheseFieldsSame(t, field) ? t.y : newY,
          //   };
          // });
          field.x = newX;
          field.y = newY;
          console.log("moved!", field);
          // setFields(temp);
          pushToStack(fields);
        }
        setIsEditing((a) => a);
      }}
      style={{ border: 0, zIndex: 888 }}
      className="draggable-item"
    >
      <span
        className="rnd-content"
        onClick={() => setCurrentField(field)}
        onDoubleClick={() => {
          if (auth?.email === field?.signer?.email) {
            if (
              ["signature", "initial"].includes(
                String(field?.type).toLowerCase()
              )
            ) {
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
                        value: !isTheSelectedFieldSameAsThisField(oneField)
                          ? oneField?.value
                          : String(field?.type).toLowerCase() === "initial"
                          ? initial_image_url
                          : signature_image_url,
                      };
                    });
                    setFields(ax);
                    setCurrentField((field) => {
                      return {
                        ...field,
                        value: !isTheSelectedFieldSameAsThisField(field)
                          ? field?.value
                          : String(field?.type).toLowerCase() === "initial"
                          ? initial_image_url
                          : signature_image_url,
                      };
                    });
                  },
                });
              } else {
                setIsEditing(true);
              }
            } else {
              setIsEditing((a) => !a);
            }
          }
          onClick();
        }}
        // onDoubleClick={() =>
        //   auth?.email === field?.signer?.email && setIsEditing((a) => !a)
        // }
        style={{
          backgroundColor: isEditing
            ? "transparent"
            : field?.signer?.backgroundColor,
          color: "white",
        }}
      >
        {!isEditing && (
          <span className="text-uppercase">
            {fieldElement} {field.type}
          </span>
        )}
        {isEditing &&
          !["initial", "signature"].includes(
            String(field?.type).toLowerCase()
          ) && (
            <div className="full-field-box">
              <input
                value={field?.value}
                disabled={String(field?.type).toLowerCase() === "date"}
                onClick={() => setCurrentField(field)}
                style={{
                  fontSize: field?.formatting?.size,
                  fontFamily: field?.formatting?.font,
                }}
                onChange={(e) => {
                  let temp = fields;
                  let ax = temp.map((oneField) => {
                    return {
                      ...oneField,
                      value: isTheSelectedFieldSameAsThisField(oneField)
                        ? e.target.value
                        : oneField?.value,
                    };
                  });
                  setFields(ax);
                  setCurrentField((field) => {
                    return { ...field, value: e.target.value };
                  });
                }}
              />
            </div>
          )}
        {isEditing && String(field?.type).toLowerCase() === "signature" && (
          <span className="img-fit-all">
            <img src={signature_image_url} alt="" />
          </span>
        )}
        {isEditing && String(field?.type).toLowerCase() === "initial" && (
          <span className="img-fit-all">
            <img src={initial_image_url} alt="" />
          </span>
        )}
      </span>
    </Rnd>
  );
};

export const QRCodeBox = ({ qrCodeImg, qrPosition, pageNum }) => {
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

  return (
    <img
      src={
        qrCodeImg ??
        "https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
      }
      alt="qrcode"
      style={{
        width: isNaN(size) ? INIT_FIELD_WIDTH : size,
        height: isNaN(size) ? INIT_FIELD_WIDTH : size,
        position: "absolute",
        left: isNaN(offsetLeftPercentage * divPosition?.width)
          ? 0
          : offsetLeftPercentage * divPosition?.width,
        top: isNaN(offsetTop) ? 0 : offsetTop,
      }}
    />
  );
};

export default FieldBox;
