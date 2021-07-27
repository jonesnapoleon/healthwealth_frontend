import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useData } from "../../../contexts/DataContext";
import "./usersign.scss";
import PlaceField from "../PlaceField";
// import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";

// import Toolbar from "./Toolbar";
// import FieldSidebar from "./FieldSidebar";
import PDFSigner from "./PDFSigner";
// import RightSnippetArea from "./RightSnippetArea";
import SuperFloatingButton from "../commons/SuperFloatingButton";

// import useClippy from "use-clippy";
// import Ajv from "ajv";
import { addColorToArr } from "../../../helpers/transformer";
import { DOC, FRONTEND_URL } from "../../../helpers/constant";
import { ReactComponent as SelectIcon } from "../../../assets/bnw/Progress Bar - Step 1 Icon.svg";
import Stepper from "../commons/Stepper";

const temp =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/doc/aisc_jones_napoleon_pdf1624197842048";

const UserSign = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  const { getItemData } = useData();
  const { t } = useTranslation();
  const fileData = getItemData(atr, "fileData");
  // const signers = getItemData(atr, "signers");

  let listSigners = addColorToArr([
    {
      value: "jonathanyudigun@gmail.com",
      label: "Jojo",
    },
    {
      value: "jones@gmail.com",
      label: "Jones",
    },
  ]);

  const currentSigner = useMemo(() => listSigners[0], [listSigners]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // const { t } = useTranslation();
  const stepperData = useMemo(
    () => [
      {
        name: t("sign.selectDocument.text"),
        icon: <SelectIcon />,
        component: <PlaceField activeItem={activeItem} />,
        pathName: FRONTEND_URL.sign_place_fields,
      },
    ],
    [t, activeItem]
  );

  const handleNext = () => {
    try {
      setLoading(0);
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

  // const [clipboard, setClipboard] = useClippy();

  return (
    <div>
      <Stepper items={[]} isFixed={true} />
      <div className={"place-field-area"}>
        {/* <Toolbar
          copyField={copyField}
          pasteField={pasteField}
          undoField={undoField}
          redoField={redoField}
          setQrCodePosition={setQrCodePosition}
        /> */}

        <DndProvider backend={HTML5Backend}>
          {/* <FieldSidebar
            listSigners={listSigners}
            currentSigner={currentSigner}
            setCurrentSigner={setCurrentSigner}
          /> */}

          <PDFSigner
            fields={fields}
            setFields={setFields}
            currentSigner={currentSigner}
          />

          {/* <RightSnippetArea
            currentField={currentField}
            setCurrentField={setCurrentField}
            setFields={setFields}
            fields={fields}
            onDelete={() => {
              let temp = currentField;
              temp.deleted = true;
              pushToStack(temp);
            }}
          /> */}
        </DndProvider>
      </div>
      <SuperFloatingButton activeItem={activeItem} onClickNext={handleNext} />
    </div>
  );
};

export default UserSign;
