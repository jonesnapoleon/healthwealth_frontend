import React, { useEffect, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./placefield.scss";

import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Toolbar from "./Toolbar";
import FieldSidebar from "./FieldSidebar";
import PDFViewer from "./PDFViewer";
import RightSnippetArea from "./RightSnippetArea";
import SuperFloatingButton from "../commons/SuperFloatingButton";

import useClippy from 'use-clippy';
import Ajv from "ajv"


const temp =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/doc/aisc_jones_napoleon_pdf1624197842048";

const PlaceField = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  const { handle_data_docs, getItemData } = useData();
  const fileData = getItemData(atr, "fileData");
  const signers = getItemData(atr, "signers");

  // signers.push({
  //   email: "jonathanyudigun@gmail.com",
  //   name: "Jojo",
  //   flowtype: "SIGN",
  // });
  // const signersValues = signers.map((user) => ({
  //   value: user.email,
  //   label: user.name,
  // }));

  // let initialSigner =
  //   signersValues.length > 0 ? signersValues[0] : { value: "", label: "" };

  let listSigners = [
    {
      value: "jonathanyudigun@gmail.com",
      label: "Jojo",
      color: "red",
    },
    {
      value: "jones@gmail.com",
      label: "Jones",
      color: "yellow",
    },
  ];

  const [signer, setSigner] = useState(listSigners[0]);
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // const { t } = useTranslation();

  const handleNext = () => {
    try {
      setLoading(0);
      console.log("ef");
      // const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
      // const res = await addUserToDocument(newData, fileData?.id);
      // if (res) {
      //   console.log(res);
      //   handle_data_docs(true, atr, "signers", data);
      //   setActiveItem((a) => a + 1);
      //   setAvailableLevel((a) => a + 1);
      //   // setFileUrl(newRes?.linkToPdf);
      //   // setAvailableItem((a) => a + 1);
      //   // progress.set(100);
      //   setLoading(1);
      //   setSuccess(t("sign.addSigners.addSignersSuccess"));
      //   setTimeout(() => setSuccess(false), 3000);
      // }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  };

  useEffect(() => {
    console.log(fileData);
    const mainWorkspace = document.getElementById("main-workspace");
    if (typeof fileData?.linkToPdf === "string" || temp) {
      // TODO
      // load pdf using React-pdf
    }
  }, [fileData]);

  useEffect(() => {
    console.log("useeffect fields", fields);
  }, [fields]);

  useEffect(() => {
    console.log(signer);
  }, [signer]);

  const [clipboard, setClipboard] = useClippy();
  const copyPasteHandler = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      try {
        copyField()
        e.preventDefault();
      } catch (e) { }
    }
    if (e.key === "v" && e.ctrlKey) {
      try {
        pasteField()
        e.preventDefault();
      } catch (e) { }
    }
  }

  const copyField = () => {
    setClipboard(JSON.stringify(currentField));
    console.log("copied!", currentField);
  }

  const pasteField = () => {
    const schema = {
      type: "object",
      properties: {
        type: { type: "string" },
        x: { type: "number" },
        y: { type: "number" },
        w: { type: "number" },
        h: { type: "number" },
        pageNum: { type: "integer" },
        signer: { type: "string" },
        color: { type: "string" },
        droppedPosition: {
          type: "object",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
          }
        },
        pagePosition: {
          type: "object",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
            width: { type: "number" },
            height: { type: "number" },
          }
        },
      }
    }

    const ajv = new Ajv()
    const data = JSON.parse(clipboard)
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (valid) {
      data.droppedPosition.x = data.pagePosition.x + (data.x + 0.01) * data.pagePosition.width;
      data.droppedPosition.y = data.pagePosition.y + (data.y + 0.01) * data.pagePosition.height;
      setFields(fields => [...fields, data]);
      console.log("pasted!", data);
    }
  }

  return (
    <>
      <div className={"place-field-area"} onKeyDown={copyPasteHandler}>
        <Toolbar
          copyField={copyField}
          pasteField={pasteField}
        />

        <DndProvider backend={HTML5Backend}>
          <FieldSidebar
            listSigners={listSigners}
            currentSigner={signer}
            setCurrentSigner={setSigner}
          />

          <PDFViewer
            fields={fields}
            setFields={setFields}
            signer={signer}
            setCurrentField={setCurrentField}
          />

          <RightSnippetArea />
        </DndProvider>
      </div>
      <SuperFloatingButton activeItem={activeItem} onClickNext={handleNext} />
    </>
  );
};

export default PlaceField;
