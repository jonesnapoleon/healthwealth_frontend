import React, { useRef, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { navigate } from "@reach/router";
// import { selectDocToView } from "./ViewDocumentSlice";
// import { storage } from '../../firebase/firebase';
import WebViewer, { Annotations } from "@pdftron/webviewer";
import { useData } from "../../../contexts/DataContext";
import { useAuth } from "../../../contexts/AuthContext";
import "./placefield.css";

const temp =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/doc/aisc_jones_napoleon_pdf1624197842048";

const PlaceField = () => {
  const [instance, setInstance] = useState(null);
  const { auth } = useAuth();

  const { fileData } = useData();
  //   const doc = useSelector(selectDocToView);

  //   const { docRef } = doc;

  const viewer = useRef(null);

  console.log(fileData);

  useEffect(() => {
    if ((typeof fileData?.linkToPdf === "string" && auth?.id_token) || temp)
      WebViewer(
        {
          path: "webviewer",
          disabledElements: ["ribbons", "toggleNotesButton"],
        },
        viewer.current
      ).then(async (instance) => {
        instance.loadDocument(fileData?.linkToPdf ?? temp, {
          filename: fileData?.filename,
        });
        instance.setToolbarGroup("toolbarGroup-View");
        setInstance(instance);
      });
  }, [fileData, auth?.id_token]);

  // const download = () => {
  //   instance.downloadPdf(true);
  // };

  // const doneViewing = async () => {
  //   console.log("d");
  // };

  return (
    <div className={"prepareDocument"}>
      <div className="row">
        {/* <div className="col-2">
          <h1>View Document</h1>          
        </div> */}
        <div className="col-12">
          <div className="webviewer" ref={viewer}></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceField;
