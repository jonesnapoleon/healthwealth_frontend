import React from "react";
import "./toggle-button.css";

const ToggleButton = ({ text, disabled }) => {
  return (
    <div class="form-check form-switch">
      <input
        disabled={disabled}
        class="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault">
        <small>{text}</small>
      </label>
    </div>
  );
};

export default ToggleButton;
