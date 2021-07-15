import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const OnePagePdf = ({ data }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    getImageSize(data, (_, height) => setHeight(height));
  }, [data]);

  return (
    <div className="one-image-area" style={{ backgroundImage: `url(${data})` }}>
      {height}
    </div>
  );
};

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
        <OnePagePdf data={data} key={i} />
      ))}
    </div>
  );
};

export default PDFViewer;
