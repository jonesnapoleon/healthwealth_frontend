import React from "react";
import { Droppable } from "react-beautiful-dnd";

const PersonRow = ({ data, id }) => {
  return (
    <div className="one-person-row-container">
      <Droppable droppableId={id}>
        {data?.name}
        {data?.name}
      </Droppable>
    </div>
  );
};

export default PersonRow;
