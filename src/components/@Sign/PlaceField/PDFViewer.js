import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const PDFViewer = ({
  fields,
  setFields,
  signer
}) => {
  const num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_) => image);
  const INIT_FIELD_WIDTH = 100;
  const INIT_FIELD_HEIGHT = 50;

  const [{ pageNum, position }, drop] = useDrop(() => ({
    accept: "field",
    drop: (type, monitor) => addFieldToWorkspace(type, monitor.getClientOffset(), key),
    collect: (monitor) => ({
      position: monitor.getClientOffset(),
      pageNum: monitor.getDropResult(),
    }),
  }));

  // field state:
  // float x,y,w,h or x1,y1,x2,y2
  // bool editable
  // string signer (email)
  // int pagenum
  // string type

  useEffect(() => {
    console.log(position);
  }, [position]);

  useEffect(() => {
    console.log(pageNum);
  }, [pageNum]);

  const addFieldToWorkspace = (type) => {
    // TODO get x,y, pagenum
    console.log(position, pageNum);
    setFields(fields => [...fields, {
      type,
      x: position?.x,
      y: position?.y,
      w: INIT_FIELD_WIDTH,
      h: INIT_FIELD_HEIGHT,
      pageNum,
      signer: signer.value,
    }]);

    // spawn new node as main
  };

  return (
    <div id="main-workspace">
      <div>{position?.x} {position?.y}</div>
      {num?.map((data, i) => (
        <div className="one-image-area" ref={drop} key={i}>
          <img src={data} alt="" />
        </div>
      ))}
    </div>
  );
};

export default PDFViewer;
