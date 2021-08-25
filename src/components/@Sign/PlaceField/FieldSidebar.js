import React from "react";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import ColorizedSelect from "../commons/ColorizedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faSignature } from "@fortawesome/free-solid-svg-icons";

import DateRangeIcon from "@material-ui/icons/DateRangeRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmailRounded";
import BusinessIcon from "@material-ui/icons/BusinessRounded";
import WorkOutlineIcon from "@material-ui/icons/WorkOutlineRounded";
import TextFieldsIcon from "@material-ui/icons/TextFieldsRounded";
import CheckBoxIcon from "@material-ui/icons/CheckBoxRounded";

import LockRoundedIcon from "@material-ui/icons/LockRounded";

import { DOC } from "helpers/constant";

const StaticFieldBox = ({ type, icon, isYes }) => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type },
    // collect: (monitor) => ({
    //   isDragging: !!monitor.isDragging(),
    // }),
  }));

  return (
    <div ref={drag} className="field-box">
      <div className="must-child">
        <div>{icon}</div>
        <div>{type}</div>
      </div>
      <div className="optional-child">
        {isYes && (
          <div>
            <LockRoundedIcon />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

const FieldSidebar = ({
  atr,
  listSigners,
  currentSigner,
  setCurrentSigner,
}) => {
  const { t } = useTranslation();

  // const fieldType = {
  //   SIGNATURE: "signature",
  //   INITIAL: "initial",
  //   DATE: "date",
  //   CHECKBOX: "checkbox",
  //   TEXT: "text",
  //   EMAIL: "email",
  //   NAME: "name",
  //   COMPANY: "company",
  //   TITLE: "title",
  // };

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

  return (
    <div className="left-sidebar position-fixed">
      <div className="container">
        <div className="row pt-2">
          {atr !== DOC.me && (
            <>
              <div>
                <strong>{t("sign.placeFields.left.signers")}</strong>
              </div>
              <ColorizedSelect
                options={listSigners}
                value={currentSigner}
                onChange={(e) => setCurrentSigner(e)}
              />
            </>
          )}

          {/* <select value={signer} onChange={(e) => setSigner(e.target.value)}>
            {signersValues &&
              signersValues?.map((assignee, i) => (
                <option key={i} value={assignee} data-before={"red"}>
                  {assignee.label}
                </option>
              ))}
          </select> */}

          <div className="lead">{t("sign.placeFields.left.signature")}</div>
          {[
            [fieldType.SIGNATURE, <FontAwesomeIcon icon={faSignature} />],
            [fieldType.INITIAL, <FontAwesomeIcon icon={faPenSquare} />],
          ]?.map((type, i) => (
            <StaticFieldBox type={type[0]} icon={type[1]} key={i} />
          ))}

          <div className="lead">{t("sign.placeFields.left.autofill")}</div>
          {[
            [fieldType.DATE, <DateRangeIcon />],
            [fieldType.NAME, <PersonIcon />],
            [fieldType.EMAIL, <AlternateEmailIcon />],
            [fieldType.COMPANY, <BusinessIcon />],
            [fieldType.TITLE, <WorkOutlineIcon />],
          ]?.map((type, i) => (
            <StaticFieldBox type={type[0]} icon={type[1]} key={i} />
          ))}

          <div className="lead">
            {t("sign.placeFields.left.standard")}
            <span className="px-2" style={{ verticalAlign: "middle" }}>
              <LockRoundedIcon />
            </span>
          </div>
          {[
            [fieldType.TEXTBOX, <TextFieldsIcon />],
            [fieldType.CHECKBOX, <CheckBoxIcon />],
          ]?.map((type, i) => (
            <StaticFieldBox type={type[0]} icon={type[1]} key={i} isYes />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldSidebar;
