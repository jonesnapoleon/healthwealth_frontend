import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;

const Page = ({ data, pageNum, setFields, signer }) => {
  const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

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

  const addFieldToWorkspace = (type, fieldPosition, pageNum) => {
    let curPage = document.getElementById("main-workspace-" + pageNum);
    const pagePosition = curPage?.getBoundingClientRect();
    let x = (fieldPosition?.x - pagePosition.x) / pagePosition.width;
    let y = (fieldPosition?.y - pagePosition.y) / pagePosition.height;
    let w = INIT_FIELD_WIDTH / pagePosition.width;
    let h = INIT_FIELD_HEIGHT / pagePosition.height;
    let newField = {
      type,
      x,
      y,
      w: INIT_FIELD_WIDTH,
      h: INIT_FIELD_HEIGHT,
      pageNum,
      signer: signer.value,
      color: signer.color,
      droppedPosition: {
        x: pagePosition.x + x * pagePosition.width,
        y: pagePosition.y + y * pagePosition.height,
      },
      pagePosition,
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

const FieldHandle = ({ color, stroke }) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" stroke={stroke} stroke-width="2" fill={color} />
    </svg>
  )
}

const PDFViewer = ({ fields, setFields, signer, setCurrentField }) => {
  const num = [0, 0, 0].map((_) => image);

  // 0, 0, 0, 0, 0, 0, 0
  return (
    <div id="main-workspace">
      {num?.map((data, i) => (
        <Page
          data={data}
          pageNum={i + 1}
          setFields={setFields}
          signer={signer}
          key={i}
        />
      ))}
      {fields.map((field, i) => {
        const handle = <FieldHandle color={field.color} stroke={field.color} />;
        return (
          <Rnd
            bounds="parent"
            default={{
              x: field.droppedPosition.x,
              y: field.droppedPosition.y,
              width: field.w,
              height: field.h,
            }}
            resizeHandleComponent={{
              topLeft: handle,
              topRight: handle,
              bottomLeft: handle,
              bottomRight: handle,
            }}
            className="draggable-item"
            onClick={() => setCurrentField(field)}
          >
            <textarea
              className="draggable-textarea"
              placeholder={field.type}
            />
          </Rnd>
        );
      }
      )}
    </div>
  );
};

export default PDFViewer;
