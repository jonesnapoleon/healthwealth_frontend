import React, { useCallback, useMemo, useState } from "react";
import { useEffectOnce } from "react-use";
import { TransformWrapper } from "react-zoom-pan-pinch";
// import { useHistory } from "react-router-dom";
import { useData } from "../../../contexts/DataContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./document.scss";

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
import { useHashString } from "helpers/hooks";

const field = [
  {
    id: 1,
    docid: 1,
    assignedTo: "13518084@std.stei.itb.ac.id",
    fieldname: "other",
    x1: 20,
    x2: 30,
    y1: 4,
    y2: 5,
    pageNum: 2,
    value: null,
    editable: true,
    createdAt: "2021-06-14T02:31:57.000Z",
    updatedAt: "2021-06-14T02:31:57.000Z",
  },
  {
    id: 2,
    docid: 1,
    assignedTo: "13518084@std.stei.itb.ac.id",
    fieldname: "other",
    x1: 20,
    x2: 30,
    y1: 4,
    y2: 5,
    pageNum: 2,
    value: null,
    editable: true,
    createdAt: "2021-06-14T02:31:57.000Z",
    updatedAt: "2021-06-14T02:31:57.000Z",
  },
];

const temp =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/822204_jpg1627207587207";

const Document = ({ atr }) => {
  const fileId = useHashString(-1, "number");
  const { getItemData, handle_data_docs } = useData();

  // const { fullname, email } = useAuth();

  const placeFieldItems = getItemData(atr, "placeFieldItems");

  const updatePlaceFields = useCallback(
    (newAtr) => {
      handle_data_docs(true, atr, "placeFieldItems", {
        ...placeFieldItems,
        ...newAtr,
      });
    },
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

  const qrCodePosition = useMemo(
    () => () => placeFieldItems?.qrCode ?? [],
    [placeFieldItems]
  );

  // useEffect(() => {
  //   updatePlaceFields({ images: [temp, temp, temp] });
  //   updatePlaceFields({ fields: field });
  // }, []);

  // useEffect(() => {
  //   console.log(placeFieldItems);
  // }, [placeFieldItems]);

  const [currentField, setCurrentField] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);
  const [scale, setScale] = useState(100);

  const { addSnackbar } = useSnackbar();
  // const { push } = useHistory();

  const fetchAllFields = useCallback(
    async (images) => {
      if (fields.length > 0) return;
      try {
        const res = await getAllFields(fileId);
        if (res) {
          updatePlaceFields({ fields: field, images });
        }
      } catch (e) {
        updatePlaceFields({ fields: field, images });
        addSnackbar(String(e));
      }
    },
    [fileId, addSnackbar, updatePlaceFields, fields]
  );

  const fetchAllImages = useCallback(async () => {
    if (placeFieldImages.length > 0) return;
    try {
      const res = await getDocImages(fileId);
      if (res) {
        updatePlaceFields({ images: res });
        fetchAllFields([temp, temp, temp]);
      }
    } catch (e) {
      addSnackbar(String(e));
    }
  }, [
    fileId,
    addSnackbar,
    fetchAllFields,
    updatePlaceFields,
    placeFieldImages,
  ]);

  useEffectOnce(() => {
    // fetchAllFields([temp, temp, temp]);
    fetchAllImages();
    // fetchAllFields();
  });

  useEffectOnce(() => {});

  // const handleNext = () => {
  //   try {
  //     console.log(fields);
  //     for (let i = 0; i < fields.length; i++) {
  //       // const field = fields[i]
  //       let newFieldElement = document.getElementById(`field-${i}`);
  //       console.log(newFieldElement.value);
  //     }
  //     // const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
  //     // const res = await addUserToDocument(newData, fileData?.id);
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
        <TransformWrapper initialScale={1} panning={{ disabled: true }}>
          {({
            zoomIn,
            zoomOut,
            resetTransform,
            positionX,
            positionY,
            ...rest
          }) => (
            <>
              {console.log(currentField)}
              {/* <Toolbar
                setQrCodePosition={setQrCodePosition}
                canEdit={placeFieldImages && placeFieldImages?.length > 0}
                // scale={scale}
                // setScale={setScale}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
              /> */}

              <DndProvider backend={HTML5Backend}>
                {/* <FieldSidebar
                  atr={atr}
                  listSigners={listSigners}
                  currentSigner={currentSigner}
                  setCurrentSigner={setCurrentSigner}
                /> */}

                <PDFSigner
                  fields={fields}
                  scale={scale}
                  setScale={setScale}
                  setCurrentField={setCurrentField}
                  placeFieldImages={placeFieldImages}
                  qrCodePosition={qrCodePosition}
                />
                {/* 
                <RightSnippetArea
                  currentField={currentField}
                  setCurrentField={setCurrentField}
                  fields={fields}
                /> */}
              </DndProvider>
            </>
          )}
        </TransformWrapper>
        <SignFoot />
      </div>
    </>
  );
};

export default Document;
