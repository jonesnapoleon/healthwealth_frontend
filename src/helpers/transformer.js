import { formatDistance } from "date-fns";
import { format } from "date-fns/esm";
import { FIXED_COLORS } from "./constant";

export const getReadableWord = (string) => {
  const char = String(string).replace(" ", "-");
  return char;
};

export const getMoment = (date) => {
  let a = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
  return String(a);
};

export const getBackendDateFormat = (date) =>
  format(new Date(date), "yyyy-MM-dd");

export const getOnlyThePath = (pathName) => {
  return pathName.toUpperCase().substring(1);
};

export const addColorToArr = (array) => {
  return array?.map((datum, i) => ({
    ...datum,
    color: FIXED_COLORS[i].color,
    backgroundColor: FIXED_COLORS[i].backgroundColor,
  }));
};

export const transformFormInput = (array) =>
  array?.map((datum, i) => ({
    ...datum,
    label: datum?.name ?? `Name-${i}`,
    value: datum?.email ?? `Email-${i}`,
  }));

export const addToDevFields = (fieldArray, signers) => {
  let one = -1;
  let hashmap = {};
  const finalTemp = fieldArray.map((datum, i) => {
    let curPage = document.getElementById("one-image-area-" + datum?.pageNum);
    const pagePosition = curPage?.getBoundingClientRect();
    let temp = signers?.filter(
      (signer) =>
        signer?.email === datum?.assignedTo && signer?.flowtype === "SIGN"
    )?.[0] ?? { email: datum?.assignedTo, name: datum?.assignedTo };
    if (!(datum?.assignedTo in hashmap)) {
      one += 1;
      hashmap[datum?.assignedTo] = FIXED_COLORS[one]?.color;
    }
    return {
      ...datum,
      pagePosition,
      deleted: false,
      signer: {
        ...temp,
        label: temp?.name,
        value: temp?.email,
        color: hashmap[datum?.assignedTo],
        backgroundColor: hashmap[datum?.assignedTo],
      },
    };
  });
  return finalTemp;
};
