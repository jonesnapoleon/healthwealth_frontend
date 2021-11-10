import { format, parseISO } from "date-fns";

export const convertCamelCase = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const getBackendDateFormat = (date) => {
  try {
    return format(date, "yyyy-MM-dd");
  } catch {
    return "2000-01-01";
  }
};

export const getFrontendDateFormat = (date) => {
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "yyyy-MM-dd hh:mm:ss");
  } catch {
    return "2000-01-01";
  }
};
