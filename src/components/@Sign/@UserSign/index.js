import React, { useMemo, useState } from "react";
// import { useData } from "../../../contexts/DataContext";
import "./usersign.scss";
// import PlaceField from "../PlaceField";
// import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { useTranslation } from "react-i18next";

// import Toolbar from "./Toolbar";
// import FieldSidebar from "./FieldSidebar";
import PDFSigner from "./PDFSigner";
// import RightSnippetArea from "./RightSnippetArea";
import SuperFloatingButton from "../commons/SuperFloatingButton";

// import useClippy from "use-clippy";
// import Ajv from "ajv";
import { addColorToArr } from "../../../helpers/transformer";
import Stepper from "../commons/Stepper";
import { useSnackbar } from "contexts/SnackbarContext";

const UserSign = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  // const { getItemData } = useData();
  // const { t } = useTranslation();
  // const fileData = getItemData(atr, "fileData");
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
  const { addAlert } = useSnackbar();

  // const { t } = useTranslation();
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
      addAlert(String(err));
    }
  };

  // const [clipboard, setClipboard] = useClippy();

  return (
    <div className="user-sign">
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
