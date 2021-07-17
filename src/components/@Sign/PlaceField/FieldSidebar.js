import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import ColorizedSelect from "../commons/ColorizedSelect";

const FieldBox = ({ type }) => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type },
    // collect: (monitor) => ({
    //   isDragging: !!monitor.isDragging(),
    // }),
  }));

  // field state:
  // float x,y,w,h or x1,y1,x2,y2
  // bool editable
  // string signer (email)
  // int pagenum
  // string type

  return (
    <div ref={drag}>
      <p>{type}</p>
    </div>
  );
};

const FieldSidebar = ({ listSigners, currentSigner, setCurrentSigner }) => {
  const { t } = useTranslation();

  const fieldType = {
    SIGNATURE: "signature",
    INITIAL: "initial",
    DATE: "date",
    CHECKBOX: "checkbox",
    TEXT: "text",
    EMAIL: "email",
    NAME: "name",
    COMPANY: "company",
    TITLE: "title",
  };

  useEffect(() => {
    console.log(currentSigner);
  }, [currentSigner]);

  return (
    <div className="left-sidebar position-fixed">
      <div className="container">
        <div className="row pt-2">
          <div className="lead">{t("sign.placeFields.left.signers")}</div>
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
            <FieldBox type={type} key={i} />
          ))}

          <div className="lead">{t("sign.placeFields.left.autofill")}</div>
          {[
            fieldType.DATE,
            fieldType.NAME,
            fieldType.EMAIL,
            fieldType.COMPANY,
            fieldType.TITLE,
          ]?.map((type, i) => (
            <FieldBox type={type} key={i} />
          ))}

          <div className="lead">{t("sign.placeFields.left.standard")}</div>
          {[fieldType.TEXT, fieldType.CHECKBOX]?.map((type, i) => (
            <FieldBox type={type} key={i} />
          ))}

          {[
            fieldType.DATE,
            fieldType.NAME,
            fieldType.EMAIL,
            fieldType.COMPANY,
            fieldType.TITLE,
          ]?.map((type, i) => (
            <FieldBox type={type} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldSidebar;
