import React, { useRef, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
// import { useTranslation } from "react-i18next";
import { useAuth } from "contexts/AuthContext";
import { useModal } from "contexts/ModalContext";

import DateRangeIcon from "@material-ui/icons/DateRangeRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmailRounded";
import BusinessIcon from "@material-ui/icons/BusinessRounded";
import WorkOutlineIcon from "@material-ui/icons/WorkOutlineRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faSignature } from "@fortawesome/free-solid-svg-icons";

// export const getReadableFieldName = (field, t) => {
//   const fieldName = t(String(field.type));
//   const fieldType = {
//     SIGNATURE: String(t("sign.placeFields.left.buttons.signature")),
//     INITIAL: String(t("sign.placeFields.left.buttons.initial")),
//     DATE: String(t("sign.placeFields.left.buttons.date")),
//     EMAIL: String(t("sign.placeFields.left.buttons.email")),
//     NAME: String(t("sign.placeFields.left.buttons.name")),
//     COMPANY: String(t("sign.placeFields.left.buttons.company")),
//     TITLE: String(t("sign.placeFields.left.buttons.title")),
//     TEXTBOX: String(t("sign.placeFields.left.buttons.textbox")),
//     CHECKBOX: String(t("sign.placeFields.left.buttons.checkbox")),
//   };
//   switch (fieldName) {
//     case fieldType.NAME:
//       return field.signer.label;
//     case fieldType.EMAIL:
//       return field.signer.value;
//     case fieldType.TEXTBOX:
//       return "TEXTBOX";
//     case fieldType.CHECKBOX:
//       return "CHECKBOX";
//     default:
//       return `${field?.signer?.label}'s ${t(String(field?.type))}`;
//   }
// };

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
        cx="3"
        cy="3"
        r="3"
        stroke={stroke}
        strokeWidth="0.1"
        fill={color}
      />
    </svg>
  );
};

const SignFieldBox = ({
  field,
  fields,
  onClick,
  isTheseFieldsSame,
  setFields,
}) => {
  const { auth } = useAuth();
  const { openSignatureModal, show } = useModal();
  const [isEditing, setIsEditing] = useState(false);

  const initial_image_url = useMemo(
    () => auth?.initial_finished_url ?? "",
    [auth]
  );
  const signature_image_url = useMemo(
    () => auth?.signature_finished_url ?? "",
    [auth]
  );

  const handle = (
    <FieldHandle
      color={field?.signer?.color ?? ""}
      stroke={field?.signer?.color ?? ""}
    />
  );

  const sampleRef = useRef(null);
  sampleRef?.current?.updatePosition({
    x: field.x * field.pagePosition.width,
    y: field.y * field.pagePosition.height,
  });
  sampleRef?.current?.updateSize({
    width: field.w * field.pagePosition.width,
    height: field.h * field.pagePosition.height,
  });

  const fieldElement = useMemo(() => getReadableFieldIcon(field), [field]);

  return (
    <Rnd
      ref={sampleRef}
      bounds="parent"
      resizeHandleComponent={{
        topLeft: handle,
        topRight: handle,
        bottomLeft: handle,
        bottomRight: handle,
      }}
      disableDragging={true}
      default={{
        x: field.x * field.pagePosition.width,
        y: field.y * field.pagePosition.height,
        width: field.w * field.pagePosition.width,
        height: field.h * field.pagePosition.height,
      }}
      enableResizing={{
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      }}
      onResizeStop={() => {
        return;
      }}
      onDragStop={() => {
        return;
      }}
      style={{ border: 0, zIndex: 888 }}
      className="draggable-item"
    >
      <span
        className="rnd-content"
        // className={`rnd-content ${
        //   auth?.email !== field?.signer?.email ? "people" : "my"
        // } ${
        //   ["signature", "initial"].includes(String(field?.type).toLowerCase())
        //     ? "img"
        //     : "txt"
        // } ${isEditing ? "editing" : "placeholder"}`}
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
              }
            } else {
              setIsEditing(true);
            }
          } else {
            setIsEditing(true);
            // setIsEditing((a) => !a);
          }
        }}
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
                disabled={["email", "date"].includes(
                  String(field?.type).toLowerCase()
                )}
                style={{
                  fontSize: field?.formatting?.size,
                  fontFamily: field?.formatting?.font,
                  border: 0,
                }}
                onChange={(e) => {
                  let temp = fields;
                  let ax = temp.map((oneField) => {
                    return {
                      ...oneField,
                      value: isTheseFieldsSame(oneField, field)
                        ? e.target.value
                        : oneField?.value,
                    };
                  });
                  setFields(ax);
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

const QR_CODE_RELATIVE_SIZE = 0.1;
const INIT_FIELD_WIDTH = 100;

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
      src={qrCodeImg}
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

export default SignFieldBox;
