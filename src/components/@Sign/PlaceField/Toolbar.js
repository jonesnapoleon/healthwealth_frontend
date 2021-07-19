import React, { useState } from "react";

const Toolbar = ({
  copyField,
  pasteField,
  undoField,
  redoField,
  setQrCodePosition,
}) => {
  return (
    <div className="tools-area">
      <div className="wrapper">
        <table>
          <tbody>
            <tr>
              <td>
                <button onClick={() => setQrCodePosition(0)}>A</button>
              </td>
              <td>
                <button onClick={() => setQrCodePosition(1)}>B</button>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={() => setQrCodePosition(3)}>C</button>
              </td>
              <td>
                <button onClick={() => setQrCodePosition(2)}>D</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={copyField}>Copy</button>
        <button onClick={pasteField}>Paste</button>
        <button onClick={undoField}>Undo</button>
        <button onClick={redoField}>Redo</button>
      </div>
    </div>
  );
};

export default Toolbar;
