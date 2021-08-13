import React from "react";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClone } from "@fortawesome/free-solid-svg-icons";
import { SCALE } from "helpers/constant";

const Toolbar = ({
  copyField,
  pasteField,
  undoField,
  redoField,
  setQrCodePosition,
  setScale,
  scale,
  canEdit,
}) => {
  return (
    <div className="tools-area">
      <div className="wrapper">
        <div>
          <table>
            <tbody>
              <tr>
                {[0, 1, 2, 3].map((arrow) => (
                  <td key={arrow}>
                    <button
                      disabled={!canEdit}
                      onClick={() => setQrCodePosition(arrow)}
                    >
                      A
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            disabled={!canEdit}
          >
            {SCALE.map((val, i) => (
              <option value={val} key={i}>
                {val}%
              </option>
            ))}
          </select>
        </div>

        <div className="need-pad">
          <UndoIcon onClick={pasteField} disabled={!canEdit} />
          <RedoIcon onClick={redoField} disabled={!canEdit} />
        </div>
        <div className="need-pad">
          <FontAwesomeIcon
            icon={faClone}
            onClick={copyField}
            disabled={!canEdit}
          />
          <FontAwesomeIcon
            icon={faClipboard}
            onClick={pasteField}
            disabled={!canEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
