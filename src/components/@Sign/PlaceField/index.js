import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../../../contexts/DataContext";
import "./placefield.css";

const temp =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/doc/aisc_jones_napoleon_pdf1624197842048";

const PlaceField = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  const { t } = useTranslation();

  const { handle_data_docs, getItemData } = useData();
  const fileData = getItemData(atr, "fileData");
  const signers = getItemData(atr, "signers");

  signers.push({
    email: "jonathanyudigun@gmail.com",
    name: "Jojo",
    flowtype: "SIGN",
  });
  const signersValues = signers.map((user) => ({
    value: user.email,
    label: user.name,
  }));
  let initialSigner =
    signersValues.length > 0 ? signersValues[0] : { value: "", label: "" };
  const [signer, setSigner] = useState(initialSigner);

  const [fields, setFields] = useState([]);
  // field state:
  // float x,y,w,h or x1,y1,x2,y2
  // bool editable
  // string signer (email)
  // int pagenum
  // string type
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
  }

  console.log(fileData);

  useEffect(() => {
    const mainWorkspace = document.getElementById("main-workspace")
    mainWorkspace.addEventListener("dragover", dragOver);
    mainWorkspace.addEventListener("drop", drop);
    if ((typeof fileData?.linkToPdf === "string") || temp) {
      // TODO
      // load pdf using React-pdf
    }
  }, [fileData]);

  const dragStart = (e, type) => {
    console.log(type, "dragged")
    e.target.style.opacity = 0.5;
    const copy = e.target.cloneNode(true);
    copy.id = "form-build-drag-image-copy";
    copy.style.width = "250px";
    document.body.appendChild(copy);
    e.dataTransfer.setDragImage(copy, 125, 25);
    e.dataTransfer.setData("Text", type);
  };

  const dragEnd = (e) => {
    e.preventDefault();
    e.target.style.opacity = 1;
    return false;
  }

  const dragOver = (e) => {
    e.preventDefault();
    return;
  }

  const drop = (e) => {
    e.preventDefault();
    var x = e.pageX;
    var y = e.pageY;
    var type = e.dataTransfer.getData("Text");
    console.log(type, "dropped on", x, y);


    // TODO x, y minus posisi div e.target
    addField(type, x, y);
    document.body.removeChild(
      document.getElementById("form-build-drag-image-copy")
    );
    return false;
  };

  const addField = (type, x = 0, y = 0, w = 0, h = 0, value = null) => {
    // TODO get pagenum
    var pageNum = 1;
    var editable = type === fieldType.SIGNATURE || value === undefined
    value = value ?? type + " field";
    setFields([
      ...fields,
      {
        type,
        pageNum, x, y, w, h,
        editable,
        assignedTo: signer.value
      },
    ])
  }

  const ConferArea = ({ type }) => (
    <div className="px-2 py-1">
      <div
        draggable
        onDragStart={(e) => dragStart(e, type)}
        onDragEnd={(e) => dragEnd(e)}
      >
        <button
          className="button-placefields"
          onClick={() => addField(type)}
        >
          {t("sign.placeFields.left.buttons." + type)}
        </button>
      </div>
    </div>
  );

  return (
    <div className={"place-field-area"}>
      <div className="row">
        <div className="col-lg-3 col-md-12 left-sidebar">
          <div className="container">
            <div className="row pt-2">
              <div className="lead">{t("sign.placeFields.left.signers")}</div>
              <select value={signer} onChange={(val) => setSigner(val)}>
                {signersValues &&
                  signersValues?.map((assignee, i) => (
                    <option key={i} value={assignee} data-before={"red"}>
                      {assignee.label}
                    </option>
                  ))}
              </select>

              <div className="lead">{t("sign.placeFields.left.signature")}</div>
              {[fieldType.SIGNATURE, fieldType.INITIAL]?.map(
                (type, i) => (
                  <ConferArea type={type} key={i} />
                )
              )}

              <div className="lead">{t("sign.placeFields.left.autofill")}</div>
              {[fieldType.DATE, fieldType.NAME, fieldType.EMAIL, fieldType.COMPANY, fieldType.TITLE]?.map(
                (type, i) => (
                  <ConferArea type={type} key={i} />
                )
              )}

              <div className="lead">{t("sign.placeFields.left.standard")}</div>
              {[fieldType.TEXT, fieldType.CHECKBOX]?.map(
                (type, i) => (
                  <ConferArea type={type} key={i} />
                )
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          {
            // TODO
          }
          <div className="pdfviewer" id="main-workspace">
            <div className="lead">This is sample text</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceField;
