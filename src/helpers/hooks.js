import { useState, useEffect, useRef } from "react";

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  // const [isTouched, setIsTouched] = useState(false);
  // const [errorClassName, setErrorClassName] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    // setIsTouched(true);
  };

  useEffect(() => {
    if (
      initialValue !== null &&
      initialValue !== "" &&
      initialValue !== undefined
    )
      setValue(initialValue);
  }, [initialValue]);
  // useEffect(() => {
  //   if (isTouched && value === "") {
  //     setErrorClassName("form-error");
  //   } else {
  //     setErrorClassName("");
  //   }
  // }, [isTouched, value]);
  return { value, onChange: handleChange };
};

export const useFile = () => {
  const [file, setFile] = useState(null);
  const filePicker = useRef(null);

  return { file, setFile, filePicker };
};
