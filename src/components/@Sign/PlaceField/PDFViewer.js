import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";


const Page = ({
  data,
  pageNum,
  setFields,
  signer,
}) => {
  const INIT_FIELD_WIDTH = 100;
  const INIT_FIELD_HEIGHT = 50;

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (type, monitor) => addFieldToWorkspace(type, monitor.getClientOffset(), pageNum),
    // collect: (monitor) => ({
    //   position: monitor.getClientOffset(),
    // }),
  }));

  // field state:
  // float x,y,w,h or x1,y1,x2,y2
  // bool editable
  // string signer (email)
  // int pagenum
  // string type

  const addFieldToWorkspace = (type, position, pageNum) => {
    console.log("dropped", type, "at", position, "on page", pageNum)
    setFields(fields => [...fields, {
      type,
      x: position?.x,
      y: position?.y,
      w: INIT_FIELD_WIDTH,
      h: INIT_FIELD_HEIGHT,
      pageNum,
      signer: signer.value,
    }]);

    // TODO spawn new node as main
  };

  return (
    <div className="one-image-area" ref={drop} key={pageNum}>
      <img src={data} alt="" />
    </div>
  );
}

const PDFViewer = ({
  setFields,
  signer
}) => {
  const num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_) => image);

  return (
    <div id="main-workspace">
      {num?.map((data, i) => (
        <Page
          data={data}
          pageNum={i + 1}
          setFields={setFields}
          signer={signer}
        />
      ))}
    </div>
  );
};

export default PDFViewer;
