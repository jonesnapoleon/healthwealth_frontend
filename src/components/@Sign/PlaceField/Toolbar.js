import React from "react";
import UndoIcon from "@material-ui/icons/UndoRounded";
import RedoIcon from "@material-ui/icons/RedoRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClone } from "@fortawesome/free-solid-svg-icons";
import { SCALE } from "helpers/constant";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";

const Toolbar = ({
  copyField,
  pasteField,
  undoField,
  redoField,
  setQrCodePosition,
  scale,
  setScale,
  // zoomOut,
  setIsShow,
  // zoomIn,
  canEdit,
}) => {
  const getDeg = (i, j) => {
    if (i === 0 && j === 0) return -90;
    if (i === 1 && j === 0) return 180;
    if (i === 1 && j === 1) return 90;
    return 0;
  };
  return (
    <div className="tools-area" onClick={() => setIsShow(true)}>
      <div className="wrapper">
        <div>
          <table>
            <tbody>
              {[
                [1, 2],
                [4, 3],
              ].map((arrow, i) => (
                <tr key={arrow}>
                  {arrow?.map((val, j) => (
                    <td key={val}>
                      <button
                        disabled={!canEdit}
                        onClick={() => setQrCodePosition(val)}
                      >
                        <RoundedCornerIcon
                          style={{
                            transform: `rotate(${getDeg(i, j)}deg)`,
                          }}
                        />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          {/* <button onClick={zoomIn}>+</button>
          <button onClick={zoomOut}>-</button> */}
          <select
            // value={scale}

            value={scale}
            onChange={(e) => setScale(e.target.value)}
            // disabled={!canEdit}
            disabled={true}
          >
            {/* <option value={visibility}>{visibility}</option> */}
            {SCALE.map((val, i) => (
              <option value={val} key={i}>
                {val}%
              </option>
            ))}
          </select>
        </div>

        <div className="need-pad">
          <UndoIcon
            onClick={undoField}
            disabled={!canEdit}
            className="cursor-pointer"
          />
          <RedoIcon
            onClick={redoField}
            disabled={!canEdit}
            className="cursor-pointer"
          />
        </div>
        <div className="need-pad">
          <FontAwesomeIcon
            icon={faClone}
            onClick={copyField}
            className="cursor-pointer"
            disabled={!canEdit}
          />
          <FontAwesomeIcon
            icon={faClipboard}
            className="cursor-pointer"
            onClick={pasteField}
            disabled={!canEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
