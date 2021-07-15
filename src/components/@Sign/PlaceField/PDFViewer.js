import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";
import Draggable from "react-draggable";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const Page = ({ data, pageNum, setFields, signer }) => {
  const INIT_FIELD_WIDTH = 100;
  const INIT_FIELD_HEIGHT = 50;
  const [height, setHeight] = useState(INIT_FIELD_HEIGHT);

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (item, monitor) =>
      addFieldToWorkspace(item.type, monitor.getClientOffset(), pageNum),
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
    let curPage = document.getElementById("main-workspace-" + pageNum);
    let pagePos = curPage?.getBoundingClientRect();
    let x = (position?.x - pagePos.x) / pagePos.width;
    let y = (position?.y - pagePos.y) / pagePos.height;
    let newField = {
      type,
      x: (position?.x - pagePos.x) / pagePos.width,
      y: (position?.y - pagePos.y) / pagePos.height,
      w: INIT_FIELD_WIDTH,
      h: INIT_FIELD_HEIGHT,
      pageNum,
      signer: signer.value,
    };
    setFields((fields) => [...fields, newField]);
    console.log(`dropped ${type} at (${x}, ${y}) on page ${pageNum}`);
  };

  // useEffect(() => {
  //   const x = getImageSize(data, (_, height) => console.log(height));
  //   console.log(x);
  // }, [data]);

  // useEffect(() => {
  //   console.log(height);
  // }, [height]);

  return (
    <div className="one-image-area" ref={drop} id={`main-workspace-${pageNum}`}>
      <div style={{ backgroundImage: `url(${data})` }} className="one-image">
        <img src={data} alt="" className="invisible" />
      </div>
    </div>
  );
};

const PDFViewer = ({ fields, setFields, signer }) => {
  const num = [0, 0, 0].map((_) => image);
  // 0, 0, 0, 0, 0, 0, 0
  return (
    <div id="main-workspace">
      {fields.map((field, i) => (
        <Draggable bounds="parent">
          <div className="draggable-item">
            <textarea className="uk-textarea" style={{ width: "100%" }}>
              {field.type}
            </textarea>
          </div>
        </Draggable>
      ))}
      {num?.map((data, i) => (
        <Page
          data={data}
          pageNum={i + 1}
          setFields={setFields}
          signer={signer}
          key={i}
        />
      ))}
    </div>
  );
};

export default PDFViewer;
