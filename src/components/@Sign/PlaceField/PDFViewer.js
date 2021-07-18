import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";
import { Rnd } from "react-rnd";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;

const Page = ({ data, pageNum, setFields, currentSigner, pushToStack, setStateStack }) => {
  const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (item, monitor) => {
      addFieldToWorkspace(item.type, monitor.getClientOffset(), pageNum);
      // TODO fix: di dalem sini gabisa dapet useState yang realtime, gatau cara solvenya
      setStateStack(stateStack => {
        setFields(fields => {
          pushToStack(stateStack, fields);
          return fields;
        })
        return stateStack;
      })
    },
    // collect: (monitor) => ({
    //   position: monitor.getClientOffset(),
    // }),
  }));

  const addFieldToWorkspace = (type, fieldPosition, pageNum) => {
    let curPage = document.getElementById("one-image-area-" + pageNum);
    const pagePosition = curPage?.getBoundingClientRect();

    let x = (fieldPosition?.x - pagePosition.x) / pagePosition.width;
    let y = (fieldPosition?.y - pagePosition.y) / pagePosition.height;
    let w = INIT_FIELD_WIDTH / pagePosition.width;
    let h = INIT_FIELD_HEIGHT / pagePosition.height;
    let newField = {
      type, x, y, w, h, pageNum,
      signer: currentSigner,
      droppedPosition: fieldPosition,
      pagePosition,
    };

    setFields(fields => [...fields, newField]);
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
      </div>
    </div>
  );
};

const FieldHandle = ({ color, stroke }) => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" stroke={stroke} strokeWidth="2" fill={color} />
    </svg>
  )
}

const PDFViewer = ({ fields, setFields, currentSigner, setCurrentField, pushToStack, setStateStack }) => {
  const num = [0, 0, 0].map((_) => image);

  // 0, 0, 0, 0, 0, 0, 0
  return (
    <div id="main-workspace">
      {num?.map((data, i) => (
        <Page
          data={data}
          pageNum={i + 1}
          setFields={setFields}
          currentSigner={currentSigner}
          key={i}
          pushToStack={pushToStack}
          setStateStack={setStateStack}
        />
      ))}
      {fields.map((field, i) => {
        const handle = <FieldHandle color={field.signer.color} stroke={field.signer.color} />;
        return (
          <Rnd
            bounds="parent"
            default={{
              x: field.droppedPosition.x,
              y: field.droppedPosition.y,
              width: field.w * field.pagePosition.width,
              height: field.h * field.pagePosition.height,
            }}
            resizeHandleComponent={{
              topLeft: handle,
              topRight: handle,
              bottomLeft: handle,
              bottomRight: handle,
            }}
            className="draggable-item"
            onClick={() => setCurrentField(field)}
            id={`field-${i + 1}`}
            key={i}
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
