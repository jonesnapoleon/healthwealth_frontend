import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingButton from "../commons/FloatingButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAuth } from "../../../contexts/AuthContext";
import "./addSigners.css";
import PersonRow from "../commons/PersonRow";

import { addUserToDocument } from "../../../api/docs";

import { ReactComponent as LockIcon } from "../../../assets/bnw/Lock Tab Icon.svg";
import ToggleButton from "../../commons/ToggleButton";
import Snackbar from "../../commons/Snackbar";
import { isValidEmail } from "../../../helpers/validator";
import { useData } from "../../../contexts/DataContext";
import { ADDSIGNER } from "../../../helpers/constant";

const AddSigners = ({
  activeItem,
  setActiveItem,
  // availableLevel,
  setAvailableLevel,
  atr,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(0); // 0: disabled, 1: active
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { handle_data_docs, getItemData } = useData();
  const { auth } = useAuth();
  const fileData = getItemData(atr, "fileData");

  const handleSubmit = async () => {
    try {
      setLoading(0);
      const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
      const res = await addUserToDocument(newData, fileData?.id);
      if (res) {
        console.log(res);
        handle_data_docs(true, atr, "signers", data);
        setActiveItem((a) => a + 1);
        setAvailableLevel((a) => a + 1);
        // setFileUrl(newRes?.linkToPdf);
        // setAvailableItem((a) => a + 1);
        // progress.set(100);
        setLoading(1);
        setSuccess(t("sign.addSigners.addSignersSuccess"));
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(String(err));
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setData(items);
  };

  // useEffect(() => {
  //   console.table(data);
  // }, [data]);

  const addUser = () => {
    let items = Array.from(data);
    items.push({
      name: "",
      email: "",
      id: String(items.length),
      flowtype: ADDSIGNER.SIGN,
    });
    setData(items);
  };

  useEffect(() => {
    if (data?.length > 0) {
      console.log(data);
      for (let { name, email } of data) {
        if (name !== "" && email !== "" && isValidEmail(email)) continue;
        else {
          setLoading(0);
          return;
        }
      }
      setLoading(1);
      return;
    }
  }, [data]);

  const handleValue = (type, value, index) => {
    let items = Array.from(data);
    items[index][type] = value;
    setData(items);
  };

  return (
    <div className="container container-center sign-select-document-container">
      {error && <Snackbar text={error} />}
      {success && <Snackbar type="primary" text={success} />}
      <h4 className="">{t("sign.addSigners.whoNeed")}</h4>
      <div className="mt-3 mb-0">
        <strong>{t("sign.addSigners.sender")}</strong>
      </div>
      <div className="">
        <em>{auth?.fullname}</em>
      </div>

      <div className="mt-3 mb-2">
        <div className="item-between">
          <strong>{t("sign.addSigners.text")}</strong>
          <div className="item-between">
            <div className="pt-1 px-3">
              <ToggleButton
                text={t("sign.addSigners.sequenceSign")}
                disabled={true}
              />
            </div>

            <div className="disabled">
              <LockIcon />
              <small className="px-1">
                {t("sign.addSigners.importBulkList")}
              </small>
            </div>
          </div>
        </div>
      </div>

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

        <button className="add-signers-button" onClick={addUser}>
          <LockIcon />
          <span>{t("sign.addSigners.addSigner")}</span>
        </button>
      </div>
      <FloatingButton
        disabled={loading === 0}
        activeItem={activeItem}
        // availableLevel={availableLevel}
        onClickNext={handleSubmit}
      />
    </div>
  );
};

export default AddSigners;
