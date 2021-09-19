import React from "react";
import Select from "react-select";

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 0,
    content: '" "',
    display: "block",
    marginRight: ".8rem",
    height: ".8rem",
    width: ".8rem",
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isDisabled ? "#ccc" : "black",
      ...dot(data.color),
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  container: (styles) => ({ ...styles, width: "100%", paddingRight: "0" }),
};

const ColorizedSelect = (props) => {
  return <Select {...props} styles={colourStyles} />;
};

export default ColorizedSelect;
