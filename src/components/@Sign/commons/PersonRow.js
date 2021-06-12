import React from "react";
import { Draggable } from "react-beautiful-dnd";

// const src =
//   "https://lh3.googleusercontent.com/a/AATXAJx1LiuKljmJO8H4h1gOlUI3V5VIF2Jo7NJQNcTz=s96-c";

const PersonRow = ({ data, index, handleValue }) => {
  return (
    <Draggable draggableId={data?.id} index={index}>
      {(provided) => (
        <li
          className="one-person-row-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="">
            <input
              value={data?.name}
              onChange={(e) => handleValue("name", e.target.value, index)}
            />
          </div>
          <div className="">
            <input
              value={data?.email}
              onChange={(e) => handleValue("email", e.target.value, index)}
            />
          </div>
          <div className="">
            <select
              value={data?.access}
              onChange={(e) => handleValue("access", e.target.value, index)}
            >
              {["sign", "review"]?.map((datum, i) => (
                <option key={i} value={datum}>
                  {datum}
                </option>
              ))}
            </select>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default PersonRow;
