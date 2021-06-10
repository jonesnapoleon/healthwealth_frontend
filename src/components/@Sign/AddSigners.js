import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useFile } from "../../helpers/hooks";
import FloatingButton from "./commons/FloatingButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAuth } from "../../contexts/AuthContext";
import "./main.css";
import PersonRow from "./commons/PersonRow";

const SelectDocument = ({ activeItem, setActiveItem, availableLevel }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);

  // const data = useFile();
  const { auth } = useAuth();

  const handleUploadFile = () => {
    console.log("f");
  };

  const onDragUpdate = (e) => {
    console.log("gr");
    console.log(e);
  };

  const onDragStart = (e) => {
    console.log(e);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);
    if (destination) {
      setData([]);
    }
  };

  return (
    <div className="container sign-select-document-container">
      <h4 className="">{t("sign.addSigners.whoNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.addSigners.sender")}</div>
      <div className="lead">{auth?.fullname}</div>

      <div className="mt-5 lead mb-2">{t("sign.addSigners.text")}</div>

      <div className="">
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable>
            {data?.map((datum, id) => (
              <PersonRow data={datum} id={id} key={id} />
            ))}
          </Droppable>
        </DragDropContext>
        {isAddingUser ? (
          <div></div>
        ) : (
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => setIsAddingUser((a) => !a)}
            >
              {t("sign.addSigners.addSigner")}
            </button>
          </div>
        )}
      </div>
      {data?.length > 0 && (
        <FloatingButton
          activeItem={activeItem}
          availableLevel={availableLevel}
          onClickNext={handleUploadFile}
          t={t}
        />
      )}
    </div>
  );
};

export default SelectDocument;
