import { formatDistance } from "date-fns";

export const getReadableWord = (string) => {
  const char = String(string).replace(" ", "-");
  return char;
};

export const getMoment = (date) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
};
