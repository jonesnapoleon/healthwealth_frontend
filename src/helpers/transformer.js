import { formatDistance } from "date-fns";
import { format } from "date-fns/esm";
import { FIXED_COLORS } from "./constant";

import { v4 as uuid } from "uuid";

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

export const getReadableTimestamp = (date = new Date()) =>
  format(new Date(date), "yyyy-MM-dd hh:mm:ss");

export const getFrontendDateFormat = (date = new Date()) =>
  format(new Date(date), "dd/MM/yyyy");

export const getOnlyThePath = (pathName) => {
  return pathName.toUpperCase().substring(1);
};

export const addColorToArr = (array) => {
  return array?.map((datum, i) => ({
    ...datum,
    color: FIXED_COLORS[i % FIXED_COLORS.length].color,
    backgroundColor: FIXED_COLORS[i % FIXED_COLORS.length].backgroundColor,
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
  const finalTemp = fieldArray?.map((datum, i) => {
    let temp = signers?.filter(
      (signer) =>
        signer?.email === datum?.assignedTo && signer?.flowtype === "SIGN"
    )?.[0] ?? { email: datum?.assignedTo, name: datum?.assignedTo };

    if (!(datum?.assignedTo in hashmap)) {
      one += 1;
      hashmap[datum?.assignedTo] = {
        val: {
          color: FIXED_COLORS[one]?.color,
          backgroundColor: FIXED_COLORS[one]?.backgroundColor,
        },
      };
    }
    return {
      ...datum,
      formatting: {
        font: temp?.fontFamily ?? "Arial",
        size: temp?.fontSize ?? 12,
      },
      signer: {
        ...temp,
        label: temp?.name,
        value: temp?.email,
        color: hashmap[datum?.assignedTo]?.val?.color,
        backgroundColor: hashmap[datum?.assignedTo]?.val?.backgroundColor,
      },
      isEditing: false,
      uuid: uuid(),
    };
  });
  return finalTemp;
};

export const downloadFile = (fileURL, fileName) => {
  if (!window.ActiveXObject) {
    let save = document.createElement("a");
    save.href = fileURL;
    save.target = "_blank";
    let filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
    save.download = fileName || filename;
    if (
      navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
      navigator.userAgent.search("Chrome") < 0
    ) {
      document.location = save.href;
    } else {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  } else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, "_blank");
    _window.document.close();
    _window.document.execCommand("SaveAs", true, fileName || fileURL);
    _window.close();
  }
};
