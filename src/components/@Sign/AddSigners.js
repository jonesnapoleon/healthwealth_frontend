import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useFile } from "../../helpers/hooks";
import FloatingButton from "./commons/FloatingButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAuth } from "../../contexts/AuthContext";
import "./main.css";
import PersonRow from "./commons/PersonRow";

const AddSigners = ({ activeItem, setActiveItem, availableLevel }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  // const data = useFile();
  const { auth } = useAuth();

  const handleUploadFile = () => {
    console.log("f");
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setData(items);
  };

  useEffect(() => {
    console.table(data);
  }, [data]);

  const addUser = () => {
    let items = Array.from(data);
    items.push({ name: "", email: "", id: String(items.length) });

    setData(items);
  };

  const handleValue = (type, value, index) => {
    console.log(index);
    let items = Array.from(data);
    items[index][type] = value;

    setData(items);
  };

  return (
    <div className="container sign-select-document-container">
      <h4 className="">{t("sign.addSigners.whoNeed")}</h4>
      <div className="mt-5 lead mb-2">{t("sign.addSigners.sender")}</div>
      <div className="lead">{auth?.fullname}</div>

      <div className="mt-5 lead mb-2">{t("sign.addSigners.text")}</div>

      <div className="add-signers-area">
        {data?.length > 0 && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="user-data">
              {(provided) => (
                <ul
                  className="user-data person-row-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.map((datum, index) => {
                    return (
                      <PersonRow
                        handleValue={handleValue}
                        data={datum}
                        index={index}
                        key={datum?.id}
                      />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <button className="btn btn-secondary" onClick={addUser}>
          {t("sign.addSigners.addSigner")}
        </button>
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

export default AddSigners;
