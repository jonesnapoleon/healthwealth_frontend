import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { getImageSize } from "../../../helpers/transformer";

import FieldBox from "./FieldBox";

const image =
  "https://storage.googleapis.com/legaltech-esign-develop/develop/ktp/_aov__dice_jpg1624846637827";

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 50;

const Page = ({ data, pageNum, setFields, currentSigner, pushToStack, stateStack, fields }) => {
  const [height, setHeight] = useState(INIT_FIELD_HEIGHT);
  const [coords, setCoords] = useState(null);

  // const pagePosition = useMemo(() => {}, [pageNum]);

  // useLayoutEffect(() => {
  //   return () => {};
  // }, [input]);

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (item, monitor) => addFieldToWorkspace(item.type, monitor.getClientOffset(), pageNum),
    // collect: (monitor) => ({
    //   position: monitor.getClientOffset(),
    // }),
  }), [currentSigner, fields, stateStack]);

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
      pagePosition,
      deleted: false,
      uid: "a5bf6a9f-3656-40c8-b159-1fcb2f9d3a44", // TODO get from BE
    };

    setFields(fields => [...fields, newField]);
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
      </div>
    </div>
  );
};

const PDFViewer = ({ fields, setFields, currentSigner, setCurrentField, pushToStack, stateStack }) => {
  const num = [0, 0, 0].map((_) => image);

  // 0, 0, 0, 0, 0, 0, 0
  return (
    <div id="main-workspace">
      {num?.map((data, i) => (
        <Page
          data={data}
          pageNum={i + 1}
          fields={fields}
          setFields={setFields}
          currentSigner={currentSigner}
          key={i}
          pushToStack={pushToStack}
          stateStack={stateStack}
        />
      ))}
      {fields.map((field, i) => {
        return field.deleted ? null : (
          <FieldBox
            field={field}
            onClick={() => setCurrentField(field)}
            key={i}
            id={`field-${i + 1}`}
            pushToStack={pushToStack}
            fields={fields}
            setFields={setFields}
          />
        )
      }
      )}
    </div>
  );
};

export default PDFViewer;
