import React from "react";


const Toolbar = ({
  copyField,
  pasteField,
}) => {
  return (
    <div className="tools-area">
      <button onClick={copyField}>Copy</button>
      <button onClick={pasteField}>Paste</button>
    </div>
  )
}

export default Toolbar;