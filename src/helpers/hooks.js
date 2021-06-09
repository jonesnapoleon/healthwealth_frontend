import { useState, useEffect, useRef } from "react";

export const useRefreshedData = (updatingValue) => {
  const [value, setValue] = useState(updatingValue);
  useEffect(() => {
    if (
      updatingValue !== null &&
      updatingValue !== "" &&
      updatingValue !== undefined
    )
      setValue(updatingValue);
  }, [updatingValue]);
  return { value, set: setValue };
};
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

  const handleUploadFile = (e) => {
    if (e?.target?.files) {
      if (e?.target?.files[0]) {
        setFile(e.target.files[0]);
      }
    }
  };

  return {
    file,
    setFile,
    filePicker,
    onChange: handleUploadFile,
  };
};
