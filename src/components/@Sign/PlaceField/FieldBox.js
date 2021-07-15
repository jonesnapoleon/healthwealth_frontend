import React from "react";
import { useDrag } from "react-dnd";

const FieldBox = ({
  type
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }))

  // field state:
  // float x,y,w,h or x1,y1,x2,y2
  // bool editable
  // string signer (email)
  // int pagenum
  // string type

  return (
    <div ref={drag}>
      <p>
        Test field
      </p>
    </div>
  )
}

export default FieldBox;