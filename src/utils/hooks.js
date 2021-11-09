import { useState, useEffect } from "react";
import { BREAKPOINT_WIDTH } from "./constant";

export const useMultipleFormInput = (initialObject) => {
  const [data, setData] = useState(initialObject);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((val) => {
      return { ...val, [name]: value };
    });
  };

  useEffect(() => {
    if (
      initialObject !== null &&
      initialObject !== {} &&
      initialObject !== undefined
    )
      setData(initialObject);
  }, [initialObject]);

  return { data, handleChange };
};

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (newVal) => setValue(newVal);

  useEffect(() => {
    if (
      initialValue !== null &&
      initialValue !== "" &&
      initialValue !== undefined
    )
      setValue(initialValue);
  }, [initialValue]);

  return { value, onChange: handleChange };
};

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (
      initialValue !== null &&
      initialValue !== "" &&
      initialValue !== undefined
    )
      setValue(initialValue);
  }, [initialValue]);

  return { value, onChange: handleChange };
};

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  const isLargeScreen = width > BREAKPOINT_WIDTH;
  return { width, isLargeScreen };
};
