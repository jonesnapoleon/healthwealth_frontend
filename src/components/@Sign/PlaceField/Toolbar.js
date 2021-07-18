import React from "react";


const Toolbar = ({
  copyField,
  pasteField,
  undoField,
  redoField,
}) => {
  return (
    <div className="tools-area">
      <button onClick={copyField}>Copy</button>
      <button onClick={pasteField}>Paste</button>
      <button onClick={undoField}>Undo</button>
      <button onClick={redoField}>Redo</button>
    </div>
  )
}

export default Toolbar;