import React, { useCallback, useState, useEffect, useMemo } from "react";

import "./document.scss";

import PDFSigner, { LeftArea } from "./PDFSigner";

import { useSnackbar } from "contexts/SnackbarContext";
import { getDocImages, getAllFields } from "api/docs";
import SignNav from "./SignNav";
import SignFoot from "./SignNav/Foot";
import { useHashString, useProgressBar } from "helpers/hooks";
import { useHistory } from "react-router";
import { FRONTEND_URL } from "helpers/constant";
import SignAuditTrail from "./SignAuditTrail";
import { addToDevFields, getFrontendDateFormat } from "helpers/transformer";
import SignToolbar from "./SignToolbar";
import { useAuth } from "contexts/AuthContext";

const Document = () => {
  const fileUId = useHashString("", "string");
  // const atr = useQuery("type");
  const { push } = useHistory();

  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([]);
  const [placeFieldImages, setPlaceFieldImages] = useState([]);
  const [fileData, setFileData] = useState(false);

  const { auth: currentSigner } = useAuth();

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
        setFields(temp);
        fieldProgress.set(100);
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

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const initial_image_url = useMemo(
    () => currentSigner?.initial_finished_url ?? "",
    [currentSigner]
  );
  const signature_image_url = useMemo(
    () => currentSigner?.signature_finished_url ?? "",
    [currentSigner]
  );

  const getValue = (type) => {
    if (type === "name") return currentSigner?.fullname;
    if (type === "date") return getFrontendDateFormat();
    if (type === "initial") return initial_image_url;
    if (type === "signature") return signature_image_url;
    return currentSigner?.[type];
  };

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

  const scrollToPage = useCallback((pageNum = 1, align = "center") => {
    let currentPage = document.getElementById(`one-sign-image-area-${pageNum}`);
    currentPage?.scrollIntoView({
      behavior: "smooth",
      block: align,
      inline: align,
    });
  }, []);

  return (
    <>
      <SignNav />
      <div className={"sign-place-field-area"}>
        <SignToolbar />

        <LeftArea
          setFields={setFields}
          fields={fields}
          isTheseFieldsSame={isTheseFieldsSame}
          currentSigner={currentSigner}
          getValue={getValue}
        />

        <PDFSigner
          getValue={getValue}
          setFields={setFields}
          fileData={fileData}
          fetchAllFields={fetchAllFields}
          fields={fields}
          placeFieldImages={placeFieldImages}
          isTheseFieldsSame={isTheseFieldsSame}
        />
        <SignAuditTrail
          fileData={fileData}
          placeFieldImages={placeFieldImages}
          scrollToPage={scrollToPage}
        />
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
