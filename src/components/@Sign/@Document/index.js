import React, { useCallback, useState, useEffect } from "react";

import "./document.scss";

import PDFSigner, { LeftArea } from "./PDFSigner";
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
import { useHashString, useProgressBar } from "helpers/hooks";
import { useHistory } from "react-router";
import { FRONTEND_URL } from "helpers/constant";
import SignAuditTrail from "./SignAuditTrail";
import { addToDevFields } from "helpers/transformer";
import SignToolbar from "./SignToolbar";

const Document = () => {
  const fileUId = useHashString("", "string");
  // const atr = useQuery("type");
  const { push } = useHistory();

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([]);
  const [placeFieldImages, setPlaceFieldImages] = useState([]);
  const [fileData, setFileData] = useState(false);

  // const  } = useAuth();

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
        let finalField = res?.fields?.map((field) => {
          let curPage = document.getElementById(
            "one-sign-image-area-" + field?.pageNum
          );
          let pagePosition = curPage?.getBoundingClientRect();
          return { ...field, pagePosition, isEditing: false };
        });
        let temp = addToDevFields(finalField, res?.doc?.nextflow);
        console.log("t", temp);
        setFields(temp);
        fieldProgress.set(100);
        // setFields(res?.fields);
        setFileData(res?.doc);
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
      }
    } catch (e) {
      imgProgress.set(-1);
      addSnackbar(String(e));
      setLoading(false);
      // setTimeout(() => push(`${FRONTEND_URL.docs}`), 3000);
    }
  }, [addSnackbar, fileUId, placeFieldImages, push, imgProgress, loading]);

  useEffect(() => {
    fetchAllImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTheseFieldsSame = useCallback((oneField, twoField) => {
    return oneField?.uuid === twoField?.uuid;
  }, []);

  return (
    <>
      <SignNav />
      <div className={"sign-place-field-area"}>
        <SignToolbar />

        <LeftArea />

        <PDFSigner
          setFields={setFields}
          fileData={fileData}
          fetchAllFields={fetchAllFields}
          fields={fields}
          placeFieldImages={placeFieldImages}
          isTheseFieldsSame={isTheseFieldsSame}
        />
        <SignAuditTrail fileData={fileData} />
        {/* 
                <RightSnippetArea
                  currentField={currentField}
                  setCurrentField={setCurrentField}
                  fields={fields}
                /> */}

        <SignFoot />
      </div>
    </>
  );
};

export default Document;
