import React, { useEffect, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./placefield.scss";

import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import FieldSidebar from "./FieldSidebar";
import PDFViewer from "./PDFViewer";
import RightSnippetArea from "./RightSnippetArea";

import SuperFloatingButton from "../commons/SuperFloatingButton";

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

  const ToolsArea = () => <div className="tools-area"></div>;

  return (
    <>
      <div className={"place-field-area"}>
        <ToolsArea />
        <DndProvider backend={HTML5Backend}>
          <FieldSidebar
            listSigners={listSigners}
            currentSigner={signer}
            setCurrentSigner={setSigner}
          />

          <PDFViewer fields={fields} setFields={setFields} signer={signer} />

          <RightSnippetArea />
        </DndProvider>
      </div>
      <SuperFloatingButton activeItem={activeItem} onClickNext={handleNext} />
    </>
  );
};

export default PlaceField;
