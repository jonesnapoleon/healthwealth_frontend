import { useState, useEffect } from "react";

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [errorClassName, setErrorClassName] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    setIsTouched(true);
  };
  useEffect(() => {
    if (isTouched && value === "") {
      setErrorClassName("form-error");
    } else {
      setErrorClassName("");
    }
  }, [isTouched, value]);
  return { value, setValue, onChange: handleChange, errorClassName };
};
