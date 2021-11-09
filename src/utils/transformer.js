import { format } from "date-fns";

export const convertCamelCase = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const getBackendDateFormat = (date) => {
  return format(date, "yyyy-MM-dd");
};
