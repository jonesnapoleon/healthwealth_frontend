import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FloatingButton from "../commons/FloatingButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAuth } from "../../../contexts/AuthContext";
import "./addSigners.scss";
import PersonRow from "../commons/PersonRow";

import { addUserToDocument } from "../../../api/docs";

import LockIcon from "@material-ui/icons/LockRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import ToggleButton from "../../commons/ToggleButton";
import { isValidEmail } from "../../../helpers/validator";
import { useData } from "../../../contexts/DataContext";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { ADDSIGNER } from "../../../helpers/constant";
import { useHistory } from "react-router-dom";
import Footer from "components/layout/Navbar/Footer";

const addDraggableId = (data) => {
  return data?.map((datum, id) => {
    return { ...datum, id: String(id) };
  });
};

const AddSigners = ({ atr, activeItemId }) => {
  const { t } = useTranslation();
  const { handle_data_docs, getItemData } = useData();

  const fileData = getItemData(atr, "fileData");
  const [data, setData] = useState([]);
  const { addSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(0); // 0: disabled, 1: active

  const { auth } = useAuth();
  const { push } = useHistory();

  const nextFlow = useMemo(() => fileData?.nextflow ?? [], [fileData]);
  useEffect(() => {
    if (nextFlow && nextFlow?.length > 0) {
      const temp = addDraggableId(nextFlow);
      setData(temp);
    }
  }, [nextFlow]);

  const isSameAsData = useMemo(() => {
    if (nextFlow && nextFlow?.length > 0) {
      if (nextFlow.length !== data?.length) return false;
      for (let i = 0; i < nextFlow.length; i++) {
        if (String(nextFlow[i].email).trim() !== String(data[i].email).trim())
          return false;
        if (String(nextFlow[i].name).trim() !== String(data[i].name).trim())
          return false;
        if (
          String(nextFlow[i].flowtype).trim() !==
          String(data[i].flowtype).trim()
        )
          return false;
      }
      return true;
    }
    return false;
  }, [nextFlow, data]);

  console.log(isSameAsData);

  const handleSubmit = async () => {
    if (isSameAsData) {
      push(`${atr}#${activeItemId + 1}`);
      addSnackbar(t("sign.addSigners.addSignersSuccess"), "success");
      return;
    }
    try {
      setLoading(0);
      const newData = data.map(({ id, ...keepAttrs }) => keepAttrs);
      const res = await addUserToDocument(newData, fileData?.uid);
      if (res) {
        handle_data_docs(true, atr, "fileData", res);
        push(`${atr}#${activeItemId + 1}`);
        // setFileUrl(newRes?.linkToPdf);
        // progress.set(100);
        setLoading(1);
        addSnackbar(t("sign.addSigners.addSignersSuccess"), "success");
      }
    } catch (err) {
      addSnackbar(String(err));
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

  const lastElementId = useMemo(
    () =>
      data?.reduce(
        (a, b) => {
          return { id: String(Math.max(parseInt(a.id), parseInt(b.id))) };
        },
        { id: "0" }
      ),
    [data]
  );

  const isUserSame = useMemo(() => {
    if (data?.length <= 1) return false;
    for (let i = 0; i < data.length - 1; i++) {
      if (String(data[i]?.email).trim() === String(data[i + 1]?.email).trim())
        return true;
    }
    return false;
  }, [data]);

  const addUser = () => {
    let items = Array.from(data);
    items.push({
      name: "",
      email: "",
      id: String(parseInt(lastElementId.id) + 1),
      flowtype: ADDSIGNER.SIGN,
    });
    setData(items);
  };

  const deleteUser = (id) => {
    const items = data?.filter((datum) => datum.id !== id);
    setData(items);
  };

  useEffect(() => {
    if (data?.length > 0) {
      for (let { name, email } of data) {
        if (name !== "" && email !== "" && isValidEmail(email) && !isUserSame)
          continue;
        else {
          setLoading(0);
          return;
        }
      }
      setLoading(1);
      return;
    }
  }, [data, isUserSame]);

  const handleValue = (type, value, index) => {
    let items = Array.from(data);
    items[index][type] = value;
    setData(items);
  };

  return (
    <>
      <div className="container container-center sign-select-document-container">
        <div>
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
                  {(provided, i) => (
                    <ul
                      key={i}
                      className="user-data person-row-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {data.map((datum, index) => {
                        return (
                          <>
                            <PersonRow
                              handleValue={handleValue}
                              data={datum}
                              index={index}
                              key={datum?.id}
                              deleteUser={deleteUser}
                            />
                          </>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}

            <button className="add-signers-button" onClick={addUser}>
              <div>
                <AddCircleOutlineRoundedIcon />
                <span>{t("sign.addSigners.addSigner")}</span>
              </div>
            </button>
          </div>
        </div>
        <FloatingButton
          disabled={loading === 0}
          onClickPrev={() => push(`${atr}#${activeItemId - 1}`)}
          activeItemId={activeItemId}
          onClickNext={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
};

export default AddSigners;
