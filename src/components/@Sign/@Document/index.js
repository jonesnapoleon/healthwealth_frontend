import React, { useCallback, useMemo, useState, useEffect } from "react";
import { TransformWrapper } from "react-zoom-pan-pinch";
// import { useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./document.scss";

/* <i class="fas fa-signature"></i> */

import PDFSigner from "./PDFSigner";
// import Toolbar from "./Toolbar";
// import FieldSidebar from "./FieldSidebar";
// import RightSnippetArea from "./RightSnippetArea";

// import SuperFloatingButton from "../commons/SuperFloatingButton";

import { useSnackbar } from "contexts/SnackbarContext";
// import { useAuth } from "contexts/AuthContext";
import { getDocImages, getAllFields } from "api/docs";
// import { addColorToArr, transformFormInput } from "helpers/transformer";
// import { DOC } from "helpers/constant";
// import { Stepper } from "@material-ui/core";
import SignNav from "./SignNav";
import SignFoot from "./SignNav/Foot";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHashString, useProgressBar, useQuery } from "helpers/hooks";
import { useHistory } from "react-router";
import { FRONTEND_URL } from "helpers/constant";
import SignAuditTrail from "./SignAuditTrail";
import { useAuth } from "contexts/AuthContext";

const Document = () => {
  const fileUId = useHashString("", "string");
  const atr = useQuery("type");
  const { push } = useHistory();

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([]);
  const [placeFieldImages, setPlaceFieldImages] = useState([]);

  const { fullname, email } = useAuth();

  const { addSnackbar } = useSnackbar();
  const imgProgress = useProgressBar();
  const fieldProgress = useProgressBar();

  const fetchAllFields = useCallback(async () => {
    if (fieldProgress.value !== 0) return;
    if (!fileUId || fileUId === undefined) {
      push(`${FRONTEND_URL.docs}`);
      return;
    }
    if (fields && fields.length > 0) return;
    if (loading) return;

    try {
      fieldProgress.set(1);
      setLoading(true);
      const res = await getAllFields(fileUId);
      if (res) {
        fieldProgress.set(100);
        setFields(res);
      }
    } catch (e) {
      fieldProgress.set(-1);
      addSnackbar(String(e));
      setTimeout(() => push(`${FRONTEND_URL.docs}`), 3000);
    } finally {
      setLoading(false);
    }
  }, [fileUId, loading, addSnackbar, push, setFields, fields, fieldProgress]);

  const fetchAllImages = useCallback(async () => {
    if (imgProgress.value !== 0) return;
    if (!fileUId || fileUId === undefined) {
      push(`${FRONTEND_URL.docs}`);
      return;
    }
    if (placeFieldImages && placeFieldImages.length > 0) return;
    if (loading) return;

    try {
      imgProgress.set(1);
      setLoading(true);
      const res = await getDocImages(fileUId);
      if (res) {
        imgProgress.set(100);
        setPlaceFieldImages(res);
        setLoading(false);
        fetchAllFields();
      }
    } catch (e) {
      imgProgress.set(-1);
      addSnackbar(String(e));
      setLoading(false);
      // setTimeout(() => push(`${FRONTEND_URL.docs}`), 3000);
    }
  }, [
    addSnackbar,
    fileUId,
    placeFieldImages,
    push,
    imgProgress,
    loading,
    fetchAllFields,
  ]);

  useEffect(() => {
    fetchAllImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleNext = () => {
  //   try {
  //     console.log(fields);
  //     for (let i = 0; i < fields.length; i++) {
  //       // const field = fields[i]
  //       let newFieldElement = document.getElementById(`field-${i}`);
  //       console.log(newFieldElement.value);
  //     }
  //     // const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
  //     // const res = await addUserToDocument(newData, fileData?.uid);
  //     // if (res) {
  //     //   console.log(res);
  //     //   handle_data_docs(true, atr, "signers", data);
  //     //   setActiveItem((a) => a + 1);
  //     //   setAvailableLevel((a) => a + 1);
  //     //   // setFileUrl(newRes?.linkToPdf);
  //     //   // setAvailableLevel((a) => a + 1);
  //     //   // progress.set(100);
  //     //   setLoading(1);
  //     //   setSuccess(t("sign.addSigners.addSignersSuccess"));
  //     //   setTimeout(() => setSuccess(false), 3000);
  //     // }
  //   } catch (err) {
  //     addSnackbar(String(err));
  //   }
  // };

  return (
    <>
      <SignNav />
      <div className={"place-field-area"}>
        {/* <TransformWrapper initialScale={1} panning={{ disabled: true }}>
          {({
            zoomIn,
            zoomOut,
            resetTransform,
            positionX,
            positionY,
            ...rest
          }) => (
            <> */}
        {/* <Toolbar
                setQrCodePosition={setQrCodePosition}
                canEdit={placeFieldImages && placeFieldImages?.length > 0}
                // scale={scale}
                // setScale={setScale}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
              /> */}

        {/* <DndProvider backend={HTML5Backend}> */}
        {/* <FieldSidebar
                  atr={atr}
                  listSigners={listSigners}
                  currentSigner={currentSigner}
                  setCurrentSigner={setCurrentSigner}
                /> */}
        {/* 
                <PDFSigner
                  fields={fields}
                  scale={scale}
                  setScale={setScale}
                  setCurrentField={setCurrentField}
                  placeFieldImages={placeFieldImages}
                  qrCodePosition={qrCodePosition}
                /> */}
        {/* <SignAuditTrail /> */}
        {/* 
                <RightSnippetArea
                  currentField={currentField}
                  setCurrentField={setCurrentField}
                  fields={fields}
                /> */}
        {/* </DndProvider> */}
        {/* </>
          )}
        </TransformWrapper> */}
        <SignFoot />
      </div>
    </>
  );
};

export default Document;
