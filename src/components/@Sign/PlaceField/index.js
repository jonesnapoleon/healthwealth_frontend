import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./placefield.scss";
import { useEffectOnce } from "react-use";

// import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Toolbar from "./Toolbar";
import FieldSidebar from "./FieldSidebar";
import PDFViewer from "./PDFViewer";
import RightSnippetArea from "./RightSnippetArea";
import SuperFloatingButton from "../commons/SuperFloatingButton";

import useClippy from "use-clippy";
import Ajv from "ajv";

import { useSnackbar } from "contexts/SnackbarContext";
import { getDocImages, getAllFields } from "api/docs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addColorToArr, transformFormInput } from "helpers/transformer";

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
// const temp =
//   "https://storage.googleapis.com/legaltech-esign-develop/develop/doc/aisc_jones_napoleon_pdf1624197842048";
const MAX_STACK_SIZE = 30;

const PlaceField = ({ activeItemId, atr }) => {
  const { getItemData, handle_data_docs } = useData();
  const fileData = getItemData(atr, "fileData");

  const listSigners = useMemo(
    () => transformFormInput(addColorToArr(fileData?.nextflow)),
    [fileData]
  );

  const placeFieldItems = getItemData(atr, "placeFieldItems");
  // const signers = getItemData(atr, "signers");

  const [currentSigner, setCurrentSigner] = useState(listSigners?.[0] ?? {});

  const updatePlaceFields = useCallback(
    (newAtr) => handle_data_docs(true, atr, "placeFieldItems", newAtr),
    [atr, handle_data_docs]
  );

  const fields = useMemo(
    () => placeFieldItems?.fields ?? [],
    [placeFieldItems]
  );
  const setFields = useCallback(
    (val) => updatePlaceFields(val),
    [updatePlaceFields]
  );

  const [currentField, setCurrentField] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);
  const [scale, setScale] = useState(100);
  const [qrCodePosition, setQrCodePosition] = useState(1);
  const [stateStack, setStateStack] = useState([[]]);
  const [stackIdx, setStackIdx] = useState(0);

  const [visibility, setVisibility] = useState(1);
  const { addSnackbar } = useSnackbar();
  const { push } = useHistory();

  const fetchAllFields = useCallback(async () => {
    if (placeFieldItems && placeFieldItems?.images) return;
    if (typeof fileData?.linkToPdf === "string") {
      try {
        const res = await getAllFields(fileData?.id);
        if (res) {
          updatePlaceFields({ fields: res });
        }
      } catch (e) {
        addSnackbar(String(e));
      }
    }
  }, [fileData, addSnackbar, updatePlaceFields, placeFieldItems]);

  const fetchAllImages = useCallback(async () => {
    if (placeFieldItems && placeFieldItems?.images) return;
    if (typeof fileData?.linkToPdf === "string") {
      try {
        const res = await getDocImages(fileData?.id);
        if (res) {
          updatePlaceFields({ images: res });
        }
      } catch (e) {
        addSnackbar(String(e));
      }
    }
  }, [fileData, addSnackbar, updatePlaceFields, placeFieldItems]);

  useEffectOnce(() => {
    fetchAllImages();
    fetchAllFields();
  });

  const placeFieldImages = useMemo(() => {
    return placeFieldItems ? placeFieldItems?.images : [];
  }, [placeFieldItems]);

  const getCurrentPageCenter = useCallback(() => {
    let currentPage = document.getElementById(`one-image-area-${visibility}`);
    console.log(currentPage);
    const rect = currentPage?.getBoundingClientRect();
    let x = (rect.right - rect.left) / 2 + rect.left;
    let y = (rect.bottom - rect.top) / 2 + rect.top;
    return { x, y };
  }, [visibility]);

  const handleNext = () => {
    try {
      console.log(fields);
      for (let i = 0; i < fields.length; i++) {
        // const field = fields[i]
        let newFieldElement = document.getElementById(`field-${i}`);
        console.log(newFieldElement.value);
      }
      // const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
      // const res = await addUserToDocument(newData, fileData?.id);
      // if (res) {
      //   console.log(res);
      //   handle_data_docs(true, atr, "signers", data);
      //   setActiveItem((a) => a + 1);
      //   setAvailableLevel((a) => a + 1);
      //   // setFileUrl(newRes?.linkToPdf);
      //   // setAvailableLevel((a) => a + 1);
      //   // progress.set(100);
      //   setLoading(1);
      //   setSuccess(t("sign.addSigners.addSignersSuccess"));
      //   setTimeout(() => setSuccess(false), 3000);
      // }
    } catch (err) {
      addSnackbar(String(err));
    }
  };

  // useEffect(() => {
  //   console.log("useeffect fields", fields);
  // }, [fields]);

  // useEffect(() => {
  //   console.log("useeffect currentfield", currentField);
  // }, [currentField]);

  // useEffect(() => {
  //   console.log("useeffect statestack", stateStack, "idx", stackIdx);
  // }, [stateStack, stackIdx]);

  // useEffect(() => {
  //   console.log(currentSigner);
  // }, [currentSigner]);

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
    // console.log("copied!", currentField);
  }, [currentField, setClipboard]);

  const pushToStack = useCallback(
    (fields) => {
      // crop stack until stackIdx, push fields to stack
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
        // console.log("data", data);
        const { x, y } = getCurrentPageCenter();
        data.x = x;
        data.y = y;
        data.pageNum = visibility;
        pushToStack([...fields, data]);
        setFields((fields) => [...fields, data]);
        // console.log("pasted!", data);
      }
    } catch (e) {
      throw e;
    }
  }, [
    clipboard,
    fields,
    setFields,
    pushToStack,
    getCurrentPageCenter,
    visibility,
  ]);

  const undoField = useCallback(() => {
    // console.log("undo", stateStack, stackIdx);
    if (stateStack.length > 1 && stackIdx > 0) {
      setFields(JSON.parse(JSON.stringify(stateStack[stackIdx - 1])));
      setStackIdx((i) => i - 1);
    }
  }, [stateStack, stackIdx, setFields, setStackIdx]);

  const redoField = useCallback(() => {
    // console.log("redo", stackIdx, stateStack.length);
    if (stackIdx + 1 < stateStack.length) {
      setFields(JSON.parse(JSON.stringify(stateStack[stackIdx + 1])));
      setStackIdx((i) => i + 1);
    }
  }, [stateStack, stackIdx, setFields, setStackIdx]);

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
        <Toolbar
          copyField={copyField}
          pasteField={pasteField}
          undoField={undoField}
          redoField={redoField}
          setQrCodePosition={setQrCodePosition}
          scale={scale}
          canEdit={placeFieldImages && placeFieldImages?.length > 0}
          setScale={setScale}
        />

        <DndProvider backend={HTML5Backend}>
          <FieldSidebar
            listSigners={listSigners}
            currentSigner={currentSigner}
            setCurrentSigner={setCurrentSigner}
          />

          <PDFViewer
            fields={fields}
            scale={scale}
            setFields={setFields}
            setVisibility={setVisibility}
            currentSigner={currentSigner}
            stateStack={stateStack}
            setCurrentField={setCurrentField}
            placeFieldImages={placeFieldImages}
            pushToStack={pushToStack}
            qrCodePosition={qrCodePosition}
          />

          <RightSnippetArea
            currentField={currentField}
            setCurrentField={setCurrentField}
            setFields={setFields}
            fields={fields}
            onDelete={() => {
              let temp = currentField;
              temp.deleted = true;
              pushToStack(temp);
              setCurrentField(null);
            }}
          />
        </DndProvider>
      </div>
      <SuperFloatingButton
        onClickPrev={() => push(`${atr}#${activeItemId - 1}`)}
        onClickNext={handleNext}
      />
    </>
  );
};

export default PlaceField;
