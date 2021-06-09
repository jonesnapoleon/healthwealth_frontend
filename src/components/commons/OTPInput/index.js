import React, { memo, useState, useCallback } from "react";
import SingleInput from "./SingleInput";

const OTPInputComponent = ({ otp, isNumberInput = true, autoFocus = true }) => {
  const length = otp.value.length;

  const [activeInput, setActiveInput] = useState(0);

  const getRightValue = useCallback(
    (str) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : "";
    },
    [isNumberInput]
  );

  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otp.value];
      updatedOTPValues[activeInput] = str[0] || "";
      otp.set(updatedOTPValues);
    },
    [activeInput, otp]
  );

  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const handleOnChange = useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otp.value[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case " ": {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otp.value]
  );

  return (
    <div className="input-otp-container">
      {Array(length)
        .fill("")
        .map((_, index) => (
          <div key={index} className="single-input-otp-container">
            <SingleInput
              focus={activeInput === index}
              value={otp.value && otp.value[index]}
              autoFocus={autoFocus}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
            />
          </div>
        ))}
    </div>
  );
};

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
