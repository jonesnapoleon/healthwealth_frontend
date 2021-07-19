import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import ColorizedSelect from "../commons/ColorizedSelect";

const StaticFieldBox = ({ type }) => {
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
        <div>MM</div>
        <div>{type}</div>
      </div>
      <div className="optional-child">
        <div>MM</div>
      </div>
    </div>
  );
};

const FieldSidebar = ({ listSigners, currentSigner, setCurrentSigner }) => {
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

  useEffect(() => {
    console.log(currentSigner);
  }, [currentSigner]);

  return (
    <div className="left-sidebar position-fixed">
      <div className="container">
        <div className="row pt-2">
          <div>
            <strong>{t("sign.placeFields.left.signers")}</strong>
          </div>
          <ColorizedSelect
            options={listSigners}
            value={currentSigner}
            onChange={(e) => setCurrentSigner(e)}
          />

          {/* <select value={signer} onChange={(e) => setSigner(e.target.value)}>
            {signersValues &&
              signersValues?.map((assignee, i) => (
                <option key={i} value={assignee} data-before={"red"}>
                  {assignee.label}
                </option>
              ))}
          </select> */}

          <div className="lead">{t("sign.placeFields.left.signature")}</div>
          {[fieldType.SIGNATURE, fieldType.INITIAL]?.map((type, i) => (
            <StaticFieldBox type={type} key={i} />
          ))}

          <div className="lead">{t("sign.placeFields.left.autofill")}</div>
          {[
            fieldType.DATE,
            fieldType.NAME,
            fieldType.EMAIL,
            fieldType.COMPANY,
            fieldType.TITLE,
          ]?.map((type, i) => (
            <StaticFieldBox type={type} key={i} />
          ))}

          <div className="lead">{t("sign.placeFields.left.standard")}</div>
          {[fieldType.TEXTBOX, fieldType.CHECKBOX]?.map((type, i) => (
            <StaticFieldBox type={type} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldSidebar;
