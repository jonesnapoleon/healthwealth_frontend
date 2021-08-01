import React from "react";
import Progressbar from "../Progressbar";
import DragDrop from "./DragDrop";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const DragDropWithProgressBar = ({ data, handleDeleteFile, progress }) => {
  return (
    <div className="drag-drop-with-progress-bar-container">
      <DragDrop
        data={data}
        progress={progress}
        // disabled={progress.value === 100}
      />
      {data?.file && (
        <>
          <div className="item-left mt-3">
            <DescriptionOutlinedIcon className="file-icon" />
            <div className="px-2">{data?.file?.name}</div>
            <div className="mx-2 cursor-pointer">
              <CancelOutlinedIcon
                className="delete-red"
                onClick={handleDeleteFile}
              />
            </div>
          </div>
          <div className="mt-3">
            <Progressbar progress={progress.value} />
          </div>
        </>
      )}
    </div>
  );
};

export default DragDropWithProgressBar;
