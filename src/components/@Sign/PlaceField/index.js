import React, { useEffect, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./placefield.scss";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import FieldSidebar from "./FieldSidebar";
import PDFViewer from "./PDFViewer";
import RightSnippetArea from "./RightSnippetArea";

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

  const addFieldToWorkspace = (type) => {
    const field = {
      type,
    };
    setFields([...fields, field]);
  };

  console.log(fileData);

  useEffect(() => {
    const mainWorkspace = document.getElementById("main-workspace");
    if (typeof fileData?.linkToPdf === "string" || temp) {
      // TODO
      // load pdf using React-pdf
    }
  }, [fileData]);

  return (
    <div className={"place-field-area"}>
      <DndProvider backend={HTML5Backend}>
        <FieldSidebar
          signer={signer}
          setSigner={setSigner}
          signersValues={signersValues}
        />

        <PDFViewer addFieldToWorkspace={addFieldToWorkspace} />

        <RightSnippetArea />
      </DndProvider>
    </div>
  );
};

export default PlaceField;
