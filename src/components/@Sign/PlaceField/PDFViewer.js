import React from "react";
import { useDrop } from "react-dnd";

const PDFViewer = ({
  addFieldToWorkspace
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "field",
    drop: (item) => addFieldToWorkspace(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop}>
      <p>
        This is PDF images
      </p>
    </div>
  )
}

export default PDFViewer;