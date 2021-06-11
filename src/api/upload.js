import axios from "axios";

const API_UPLOAD = "/api/doc/upload/";

export const uploadFile = async (file) => {
  const data = new FormData();
  data.append("document", file);

  try {
    const response = await axios.post(API_UPLOAD, data);
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.error?.message ?? "Fail to upload file";
  }
};

// TODO
export const deleteFile = async (file) => {
  const data = new FormData();
  data.append("document", file);

  try {
    const response = await axios.post(API_UPLOAD, data);
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.error?.message ?? "Fail to upload file";
  }
};
