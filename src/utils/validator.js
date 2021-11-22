import { format } from "date-fns";

/* eslint-disable no-useless-escape */
export const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidAccountNumber = (number) => {
  const text = String(number).trim();
  if (text.length !== 12) return false;
  const range = ["0".charCodeAt(0), "9".charCodeAt(0)];
  for (let i = 0; i < text.length; i++) {
    const dec = text.charCodeAt(i);
    if (dec < range[0] || dec > range[1]) {
      return false;
    }
  }
  return true;
};

export const isValidContactNumber = (number) => {
  const text = String(number).trim();
  // if (text.length !== 12) return false;
  const range = ["0".charCodeAt(0), "9".charCodeAt(0)];
  for (let i = 0; i < text.length; i++) {
    const dec = text.charCodeAt(i);
    if (dec < range[0] || dec > range[1]) {
      return false;
    }
  }
  return true;
};

export const isDateSame = (date1, date2) => {
  try {
    const oldDate = format(new Date(date1), "yyyy-MM-dd");
    const newDate = format(new Date(date2), "yyyy-MM-dd");
    return String(oldDate) === String(newDate);
  } catch {
    return false;
  }
};

export const isTimeInMsBeforeNow = (ms) => ms > Date.now();

export const isImage = (fileType) =>
  [".jpeg", ".jpg", ".png", ".pneg"].includes(fileType);
