import axios from "axios";

const API_ADD_DOC = "/api/doc/";
const API_ADD_USER_TO_DOC = "/api/docflow";

export const addDoc = async (url, filename) => {
  const data = {
    linkToPdf: url,
    filename,
  };
  try {
    const response = await axios.post(API_ADD_DOC, data);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.error?.message ?? "Add docs failed";
  }
};

export const addUserToDocument = async (data) => {
  try {
    const response = await axios.post(API_ADD_USER_TO_DOC, data);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.error?.message ?? "Add docs failed";
  }
};
