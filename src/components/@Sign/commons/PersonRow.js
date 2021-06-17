import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { ADDSIGNER } from "../../../helpers/constant";

// const src =
//   "https://lh3.googleusercontent.com/a/AATXAJx1LiuKljmJO8H4h1gOlUI3V5VIF2Jo7NJQNcTz=s96-c";

const PersonRow = ({ data, index, handleValue }) => {
  const { t } = useTranslation();
  return (
    <Draggable draggableId={data?.id} index={index}>
      {(provided) => (
        <li
          className="one-person-row-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="order">{index + 1}</div>
          <div className="info">AA</div>
          <div className="item-center">
            <div className="input-name-area">
              <div>
                <label>{t("form.name")}</label>
              </div>
              <input
                value={data?.name}
                onChange={(e) => handleValue("name", e.target.value, index)}
              />
            </div>
            <div className="input-email-area">
              <div>
                <label>{t("form.emailAddress")}</label>
              </div>
              <input
                value={data?.email}
                onChange={(e) => handleValue("email", e.target.value, index)}
              />
            </div>
            <div className="input-flowtype-area">
              <select
                value={data?.flowtype}
                onChange={(e) => handleValue("flowtype", e.target.value, index)}
              >
                {[ADDSIGNER.SIGN, ADDSIGNER.REVIEW]?.map((datum, i) => (
                  <option key={i} value={datum}>
                    {datum}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default PersonRow;
