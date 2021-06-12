import React from "react";
import "./toggle-button.css";

const ToggleButton = ({ text, disabled }) => {
  return (
    <div className="form-check form-switch">
      <input
        disabled={disabled}
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        <small>{text}</small>
      </label>
    </div>
  );
};

export default ToggleButton;
