import React from "react";
import "./progressbar.css";

const Progressbar = ({ progress, text = "" }) => {
  const progressBar = (
    <div className="progressbar">
      <div className="bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <div className="text">{`${text} ${Math.round(progress)}%`}</div>
    </div>
  );
  if (progress !== 0) return progressBar;
  return <></>;
};
// progress > 0 && progress < 101 &&

export default Progressbar;
