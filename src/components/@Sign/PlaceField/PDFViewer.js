import React from "react";
import { useDrop } from "react-dnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const PDFViewer = ({ addFieldToWorkspace }) => {
  const num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_) => image);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "field",
    drop: (item) => addFieldToWorkspace(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} id="main-workspace">
      {num?.map((data, i) => (
        <div className="one-image-area" key={i}>
          <img src={data} alt="" />
        </div>
      ))}
    </div>
  );
};

export default PDFViewer;
