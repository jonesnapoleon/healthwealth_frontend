import React from "react";
import "./inputlabel.scss";

const BasicInputLabel = ({
  className,
  label,
  data,
  isShow = false,
  disabled = false,
  fontFamily = "unset",
}) => {
  return (
    <div className={className ?? "basic-input-label-container"}>
      <div className="label">{label}</div>
      <input
        style={{ fontFamily }}
        className={`input ${isShow ? "is-show" : ""}`}
        id={`${isShow ? "showed-font-input-tag" : ""}`}
        {...data}
        disabled={disabled || isShow}
      />
    </div>
  );
};

export default BasicInputLabel;

export const BasicSelect = ({ label, data, list, className }) => {
  return (
    <div className={className ?? "basic-input-label-container"}>
      <div className="label">{label}</div>
      <select {...data} defaultValue={list[0][0]} className="input">
        {list?.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]}
          </option>
        ))}
      </select>
    </div>
  );
};
