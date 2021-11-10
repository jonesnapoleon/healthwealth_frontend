import { useState, useEffect, useRef } from "react";
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

export const useInput = (initialValue, changingValue = "") => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (newVal) => setValue(newVal);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (
      isFirstTime &&
      changingValue &&
      changingValue !== "" &&
      changingValue !== {} &&
      String(changingValue) !== "Invalid Date"
    ) {
      setValue(changingValue);
      setIsFirstTime(false);
    }
  }, [changingValue, isFirstTime]);

  return { value, onChange: handleChange };
};

export const useFile = () => {
  const [file, setFile] = useState(null);
  const filePicker = useRef(null);

  const handleUploadFile = (e) => {
    if (e?.target?.files?.[0]) setFile(e.target.files[0]);
  };

  useEffect(() => {
    filePicker.current.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) setFile(newFile);
    };
  }, [filePicker, setFile]);

  return {
    file,
    setFile,
    filePicker,
    onChange: handleUploadFile,
  };
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
