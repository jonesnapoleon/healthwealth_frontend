import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";
import { Rnd } from "react-rnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;

const Page = ({
  data,
  pageNum,
  setFields,
  currentSigner,
  pushToStack,
  stateStack,
  fields,
  playableFields,
}) => {
  const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

  const [, drop] = useDrop(
    () => ({
      accept: "field",
      drop: (item, monitor) => {
        console.log(monitor);
        return addFieldToWorkspace(
          item.type,
          monitor.getClientOffset(),
          pageNum
        );
      },
      // collect: (monitor) => ({
      //   position: monitor.getClientOffset(),
      // }),
    }),
    [currentSigner, fields, stateStack]
  );

  const addFieldToWorkspace = (type, fieldPosition, pageNum) => {
    let curPage = document.getElementById("one-image-area-" + pageNum);
    const pagePosition = curPage?.getBoundingClientRect();

    console.log(fieldPosition, pageNum, pagePosition);

    // let windowWidth = document.documentElement.clientWidth,
    //   windowHeight = document.documentElement.clientHeight;

    // let xWindowRatio = fieldPosition?.x / windowWidth,
    //   yWindowRatio = fieldPosition?.y / windowHeight;

    let x = (fieldPosition?.x - pagePosition.left) / pagePosition.width;
    let y = (fieldPosition?.y - pagePosition.top) / pagePosition.height;

    // let x = fieldPosition?.x;
    // let y = fieldPosition?.y;
    let width = INIT_FIELD_WIDTH / pagePosition.width;
    let height = INIT_FIELD_HEIGHT / pagePosition.height;
    let newField = {
      type,
      x,
      y,
      width,
      height,
      pageNum,
      signer: currentSigner,
      droppedPosition: fieldPosition,
      pagePosition,
    };

    setFields((fields) => [...fields, newField]);
    pushToStack([...fields, newField]);
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
    <div className="one-image-area" ref={drop} id={`one-image-area-${pageNum}`}>
      <div style={{ backgroundImage: `url(${data})` }} className="one-image">
        <img src={data} alt="" className="invisible" />
        {playableFields?.map((field) => field)}
      </div>
    </div>
  );
};

const FieldHandle = ({ color, stroke }) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="10"
        cy="10"
        r="4"
        stroke={stroke}
        strokeWidth="2"
        fill={color}
      />
    </svg>
  );
};

const PDFViewer = ({
  fields,
  setFields,
  currentSigner,
  setCurrentField,
  pushToStack,
  stateStack,
}) => {
  const num = [0, 0, 0].map((_) => image);

  return (
    <div id="main-workspace">
      {num?.map((data, i) => {
        const playableFields = fields
          .filter((field) => field.pageNum === i + 1)
          .map((field, j) => {
            const handle = (
              <FieldHandle
                color={field.signer.color}
                stroke={field.signer.color}
              />
            );
            return (
              <Rnd
                bounds="parent"
                default={{
                  x: field.pagePosition.x + field.x,
                  y: field.pagePosition.y + field.y,
                  width: field.width * field.pagePosition.width,
                  height: field.height * field.pagePosition.height,
                }}
                resizeHandleComponent={{
                  topLeft: handle,
                  topRight: handle,
                  bottomLeft: handle,
                  bottomRight: handle,
                }}
                style={{ border: 0, zIndex: 888 }}
                className="draggable-item"
                onClick={() => setCurrentField(field)}
                id={`field-${j + 1}`}
                key={j}
              >
                <span
                  className="rnd-content"
                  style={{
                    backgroundColor: field.signer.backgroundColor,
                    color: "white",
                  }}
                >
                  <span className="text-uppercase">
                    {field.type} - {field.pageNum}
                  </span>
                </span>
                {/* <textarea
                  className="draggable-textarea"
                  placeholder={field.type}
                /> */}
              </Rnd>
            );
          });
        return (
          <Page
            data={data}
            pageNum={i + 1}
            fields={fields}
            setFields={setFields}
            currentSigner={currentSigner}
            key={i}
            pushToStack={pushToStack}
            stateStack={stateStack}
            playableFields={playableFields}
          />
        );
      })}
    </div>
  );
};

export default PDFViewer;
