import React, { useRef } from "react";
import { Rnd } from "react-rnd";

const FieldHandle = ({ color, stroke }) => {
  return (
    <svg height="10pt" width="10pt" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" stroke={stroke} strokeWidth="0.1" fill={color} />
    </svg>
  )
}

const DeleteFieldHandle = () => {
  return (
    <svg height="10pt" width="10pt" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
        fill="red"
      />
      <path
        d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
        fill="white"
      />
    </svg>
  )
}

const FieldBox = ({
  field,
  pushToStack,
  fields,
  setFields,
}) => {
  const handle = <FieldHandle color={field.signer.color} stroke={field.signer.color} />;
  const deleteHandle = <DeleteFieldHandle />;
  const EPSILON = 0.0001;
  const sampleRef = useRef(null);
  sampleRef?.current?.updatePosition({
    x: field.x * field.pagePosition.width + field.pagePosition.x,
    y: field.y * field.pagePosition.height + field.pagePosition.y,
  });
  sampleRef?.current?.updateSize({
    width: field.w * field.pagePosition.width,
    height: field.h * field.pagePosition.height,
  })

  return (
    <Rnd
      ref={sampleRef}
      bounds="parent"
      resizeHandleComponent={{
        topLeft: handle,
        topRight: deleteHandle,
        bottomLeft: handle,
        bottomRight: handle,
      }}
      enableResizing={{
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
      }}
      onResizeStop={(e, handlePos, component, delta, position) => {
        if (delta.width === 0 && delta.height === 0) {
          if (handlePos === "topRight") {
            console.log("deleted!");
            field.deleted = true;
            setFields(fields);
            pushToStack(fields);
          }
        } else {
          console.log("resized!", field);
          field.x = (position.x - field.pagePosition.x) / field.pagePosition.width;
          field.y = (position.y - field.pagePosition.y) / field.pagePosition.height;
          field.w += delta.width / field.pagePosition.width;
          field.h += delta.height / field.pagePosition.height;
          setFields(fields);
          pushToStack(fields);
        }
      }}
      onDragStop={(e, component) => {
        let newX = (component.x - field.pagePosition.x) / field.pagePosition.width;
        let newY = (component.y - field.pagePosition.y) / field.pagePosition.height;
        if (Math.abs(newX - field.x) > EPSILON && Math.abs(newY - field.y) > EPSILON) {
          console.log("moved!", field);
          field.x = newX;
          field.y = newY;
          setFields(fields);
          pushToStack(fields);
        }
      }}
      className="draggable-item"
    >
      <textarea
        className="draggable-textarea"
        placeholder={field.type}
      />
    </Rnd>
  );
}

export default FieldBox;