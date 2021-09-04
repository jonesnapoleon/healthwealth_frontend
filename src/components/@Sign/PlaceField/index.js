import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./placefield.scss";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Toolbar from "./Toolbar";
import FieldSidebar from "./FieldSidebar";
import PDFViewer from "./PDFViewer";
import RightSnippetArea from "./RightSnippetArea";
import SuperFloatingButton from "../commons/SuperFloatingButton";
// import { TransformWrapper } from "react-zoom-pan-pinch";

import useClippy from "use-clippy";
import Ajv from "ajv";

import { useSnackbar } from "contexts/SnackbarContext";
import { addFields, getDocImages, addQRCode } from "api/docs";
import { getAllSignatures } from "api/auth";

import { useHistory } from "react-router-dom";
import {
  addColorToArr,
  addToDevFields,
  transformFormInput,
} from "helpers/transformer";
import { DEFAULT, DOC, FRONTEND_URL } from "helpers/constant";
import { useAuth } from "contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useProgressBar } from "helpers/hooks";

const schema = {
  type: "object",
  properties: {
    type: { type: "string" },
    x: { type: "number" },
    y: { type: "number" },
    w: { type: "number" },
    h: { type: "number" },
    pageNum: { type: "integer" },
    signer: {
      type: "object",
      properties: {
        value: { type: "string" },
        color: { type: "string" },
        label: { type: "string" },
      },
    },
    pagePosition: {
      type: "object",
      properties: {
        x: { type: "number" },
        y: { type: "number" },
        width: { type: "number" },
        height: { type: "number" },
      },
    },
    deleted: { type: "boolean" },
    uid: { type: "string" },
  },
};

const MAX_STACK_SIZE = 30;
export const QR_CODE_RELATIVE_SIZE = 0.1;

const PlaceField = ({ activeItemId, atr }) => {
  const { getItemData, handle_data_docs } = useData();
  const fileData = getItemData(atr, "fileData");

  const { auth } = useAuth();
  const { addSnackbar } = useSnackbar();
  const { push } = useHistory();

  const { fullname, email } = auth;
  const imgProgress = useProgressBar();
  // const fieldProgress = useProgressBar();

  const listSigners = useMemo(
    () =>
      transformFormInput(
        addColorToArr(
          atr !== DOC.me
            ? fileData?.nextflow?.filter((a) => a.flowtype === "SIGN")
            : [{ name: fullname, email }]
        )
      ),
    [fileData, fullname, email, atr]
  );
  const [currentSigner, setCurrentSigner] = useState({});
  useEffect(() => {
    setCurrentSigner(listSigners?.length > 0 ? listSigners[0] : {});
  }, [listSigners]);

  const placeFieldItems = getItemData(atr, "placeFieldItems");

  const updatePlaceFields = useCallback(
    (newAtr) =>
      handle_data_docs(true, atr, "placeFieldItems", {
        ...placeFieldItems,
        ...newAtr,
      }),
    [atr, handle_data_docs, placeFieldItems]
  );

  const fields = useMemo(
    () => placeFieldItems?.fields ?? [],
    [placeFieldItems]
  );
  const placeFieldImages = useMemo(
    () => placeFieldItems?.images ?? [],
    [placeFieldItems]
  );
  const setFields = useCallback(
    (val) => updatePlaceFields({ fields: val }),
    [updatePlaceFields]
  );

  const [currentField, setCurrentField] = useState(null);
  const [scale, setScale] = useState(100);
  const [qrCodePosition, setQrCodePosition] = useState(1);
  const [stateStack, setStateStack] = useState([[]]);
  const [stackIdx, setStackIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(1);

  // useEffect(() => {
  //   console.log(placeFieldItems);
  // }, [placeFieldItems]);

  useEffect(() => {
    if (fileData) {
      if (fileData?.uid === undefined) push(`${FRONTEND_URL.docs}`);
    } else push(`${FRONTEND_URL.docs}`);
  }, [fileData, push]);

  const fetchAllFields = useCallback(async () => {
    // if (fieldProgress.value !== 0) return;
    if (fields && fields.length > 0) return;

    // if (fileData?.fields && fileData.fields.length > 0) {
    updatePlaceFields({
      fields: addToDevFields(fileData?.fields, fileData?.nextflow),
    });
    // fieldProgress.set(100);
    setQrCodePosition(fileData?.qrcode);
    // } else {
    //   try {
    //     const res = await getAllFields(fileData?.uid);
    //     if (res) {
    //       fieldProgress.set(100);
    //       updatePlaceFields({ fields: res });
    //     }
    //   } catch (e) {
    //     fieldProgress.set(-1);
    //     addSnackbar(String(e));
    //   }
    // }
  }, [fileData, updatePlaceFields, fields]);

  const fetchAllImages = useCallback(async () => {
    if (imgProgress.value !== 0) return;
    if (placeFieldImages && placeFieldImages.length > 0) return;
    if (loading) return;

    try {
      imgProgress.set(1);
      setLoading(true);
      const res = await getDocImages(fileData?.uid);
      if (res) {
        imgProgress.set(100);
        updatePlaceFields({ images: res });
      }
    } catch (e) {
      imgProgress.set(-1);
      addSnackbar(String(e));
    } finally {
      setLoading(false);
    }
  }, [
    fileData,
    addSnackbar,
    updatePlaceFields,
    placeFieldImages,
    imgProgress,
    loading,
  ]);

  // useEffect(() => {
  //   console.log(placeFieldImages);
  // }, [placeFieldImages]);

  useEffect(() => {
    fetchAllImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToPage = useCallback(
    (pageNum = visibility, align = "center") => {
      let currentPage = document.getElementById(`one-image-area-${pageNum}`);
      currentPage?.scrollIntoView({
        behavior: "smooth",
        block: align,
        inline: align,
      });
    },
    [visibility]
  );

  const { t } = useTranslation();

  const handleNext = async () => {
    try {
      const finalFields = fields?.map((field) => {
        return {
          fieldname: field?.fieldname,
          x: field?.x,
          y: field?.y,
          w: field?.w,
          h: field?.h,
          pageNum: field?.pageNum,
          type: field?.type,
          assignedTo: field?.signer?.email,
          required: field?.required,
          value: field?.value,
        };
      });
      const res = await addFields(fileData?.uid, finalFields);
      if (res) {
        const newRes = await addQRCode(
          fileData?.filename,
          fileData?.uid,
          String(atr).toUpperCase(),
          qrCodePosition
        );
        if (newRes) {
          handle_data_docs(true, atr, "fileData", newRes);
          push(`${atr}#${activeItemId + 1}`);
          addSnackbar(t("sign.placeFields.placeFieldSuccess"), "success");
        }
      }
    } catch (err) {
      addSnackbar(String(err));
    }
  };

  const [clipboard, setClipboard] = useClippy();

  const copyPasteHandler = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      try {
        copyField();
        e.preventDefault();
      } catch (e) {}
    }
    if (e.key === "v" && e.ctrlKey) {
      try {
        pasteField();
        e.preventDefault();
      } catch (e) {}
    }
  };

  const copyField = useCallback(() => {
    setClipboard(JSON.stringify(currentField));
  }, [currentField, setClipboard]);

  const pushToStack = useCallback(
    (fields) => {
      let newStack = stateStack.slice(0, stackIdx + 1);
      if (newStack.length + 1 >= MAX_STACK_SIZE) newStack.shift();
      newStack = [...newStack, JSON.parse(JSON.stringify(fields))];

      setStackIdx(stackIdx + 1);
      setStateStack(newStack);
    },
    [stateStack, setStateStack, setStackIdx, stackIdx]
  );

  const pasteField = useCallback(() => {
    try {
      const ajv = new Ajv();
      let data = JSON.parse(clipboard);
      const validate = ajv.compile(schema);
      if (validate(data) && typeof data === "object") {
        data.x = 0.5 - 0.5 * data.w;
        data.y = 0.5 - 0.5 * data.w;
        data.pageNum = visibility;
        scrollToPage();
        pushToStack([...fields, data]);
        setFields([...fields, data]);
      }
    } catch (e) {
      throw e;
    }
  }, [clipboard, fields, setFields, pushToStack, scrollToPage, visibility]);

  const undoField = useCallback(() => {
    if (stateStack.length > 1 && stackIdx > 0) {
      setFields(JSON.parse(JSON.stringify(stateStack[stackIdx - 1])));
      setStackIdx((i) => i - 1);
      scrollToPage();
    }
  }, [stateStack, stackIdx, setFields, setStackIdx, scrollToPage]);

  const redoField = useCallback(() => {
    if (stackIdx + 1 < stateStack.length) {
      setFields(JSON.parse(JSON.stringify(stateStack[stackIdx + 1])));
      setStackIdx((i) => i + 1);
      scrollToPage();
    }
  }, [stateStack, stackIdx, setFields, setStackIdx, scrollToPage]);

  const undoRedoHandler = useCallback(
    (e) => {
      if (e.key === "z" && e.ctrlKey) {
        try {
          undoField();
          e.preventDefault();
        } catch (e) {}
      }
      if (e.key === "y" && e.ctrlKey) {
        try {
          redoField();
          e.preventDefault();
        } catch (e) {}
      }
    },
    [undoField, redoField]
  );
  useEffect(() => {
    const manipulation = (e) => {
      if (e.key === "z" && e.ctrlKey) {
        try {
          undoField();
          e.preventDefault();
        } catch (e) {}
      }
      if (e.key === "y" && e.ctrlKey) {
        try {
          redoField();
          e.preventDefault();
        } catch (e) {}
      }
      if (e.key === "c" && e.ctrlKey) {
        try {
          copyField();
          e.preventDefault();
        } catch (e) {}
      }
      if (e.key === "v" && e.ctrlKey) {
        try {
          pasteField();
          e.preventDefault();
        } catch (e) {}
      }
    };
    window.addEventListener("keydown", manipulation);
    return () => window.removeEventListener("keydown", manipulation);
  }, [undoField, redoField, copyField, pasteField]);

  return (
    <>
      <div
        className={"place-field-area"}
        onKeyDown={(e) => {
          copyPasteHandler(e);
          undoRedoHandler(e);
        }}
      >
        {/* <TransformWrapper initialScale={1} panning={{ disabled: !true }}>
          {({
            zoomIn,
            zoomOut,
            resetTransform,
            positionX,
            positionY,
            ...rest
          }) => ( */}
        <>
          <Toolbar
            copyField={copyField}
            pasteField={pasteField}
            undoField={undoField}
            redoField={redoField}
            setQrCodePosition={setQrCodePosition}
            canEdit={placeFieldImages && placeFieldImages?.length > 0}
            // scale={scale}
            visibility={visibility}
            // setScale={setScale}
            // zoomIn={zoomIn}
            // zoomOut={zoomOut}
          />

          <DndProvider backend={HTML5Backend}>
            <FieldSidebar
              atr={atr}
              listSigners={listSigners}
              currentSigner={currentSigner}
              setCurrentSigner={setCurrentSigner}
            />

            <PDFViewer
              fields={fields}
              scale={scale}
              setScale={setScale}
              setFields={setFields}
              setVisibility={setVisibility}
              currentSigner={currentSigner}
              stateStack={stateStack}
              currentField={currentField}
              setCurrentField={setCurrentField}
              placeFieldImages={placeFieldImages}
              pushToStack={pushToStack}
              fileName={fileData?.filename ?? DEFAULT.DOC_FILE_NAME}
              qrCodePosition={qrCodePosition}
              qrCodeImg={fileData?.qrcodeImg}
              auth={auth}
            />

            <RightSnippetArea
              currentField={currentField}
              setCurrentField={setCurrentField}
              setFields={setFields}
              fields={fields}
              placeFieldImages={placeFieldImages}
              fileName={fileData?.filename ?? DEFAULT.DOC_FILE_NAME}
              scrollToPage={scrollToPage}
              onDelete={() => {
                let temp = currentField;
                temp.deleted = true;
                pushToStack(temp);
                setCurrentField(null);
              }}
            />
          </DndProvider>
        </>
        {/* )}
        </TransformWrapper> */}
      </div>
      <SuperFloatingButton
        onClickPrev={() => push(`${atr}#${activeItemId - 1}`)}
        onClickNext={handleNext}
        disabled={fields?.length === 0}
      />
    </>
  );
};

export default PlaceField;
