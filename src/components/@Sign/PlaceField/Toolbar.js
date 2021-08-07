import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClone } from "@fortawesome/free-solid-svg-icons";
import { Select } from "@material-ui/core";
import { SCALE } from "helpers/constant";

const Toolbar = ({
  copyField,
  pasteField,
  undoField,
  redoField,
  setQrCodePosition,
  setScale,
  scale,
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
        <select value={scale} onChange={(e) => setScale(e.target.value)}>
          {SCALE.map((val, i) => (
            <option value={val} key={i}>
              {val}%
            </option>
          ))}
        </select>

        <UndoIcon onClick={pasteField} />
        <RedoIcon onClick={redoField} />
        <FontAwesomeIcon icon={faClone} onClick={copyField} />
        <FontAwesomeIcon icon={faClipboard} onClick={pasteField} />
      </div>
    </div>
  );
};

export default Toolbar;
