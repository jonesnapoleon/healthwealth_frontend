import axios from "axios";

const API_ADD_DOC = "/api/doc/";
const API_GET_USER_DOCS = "/api/docs/";

// const API_ADD_USER_TO_DOC = "/api/docflow/";

// INDEX
export const getAllDocs = async () => {
  try {
    const response = await axios.get(`${API_GET_USER_DOCS}`);
    return response.data?.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.errorMessage ?? "No docs";
  }
};

export const getDocumentAuditTrail = async (documentId) => {
  try {
    const response = await axios.get(`${API_ADD_DOC}${documentId}/audittrails`);
    return response.data?.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

// SELECT DOCUMENT
export const addDoc = async (file, fileName, signType) => {
  const data = new FormData();
  data.append("document", file);

  try {
    const response = await axios.post(
      `${API_ADD_DOC}?fileName=${encodeURIComponent(
        fileName
      )}&signType=${encodeURIComponent(signType)}`,
      data
    );
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.errorMessage ?? "Fail to upload file";
  }
};

export const deleteDoc = async (fileId) => {
  try {
    const response = await axios.delete(`${API_ADD_DOC}${fileId}/`);
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.errorMessage ?? "Fail to delete file";
  }
};

export const addQRCode = async (fileName, fileId, signType, qrPosition) => {
  const data = new FormData();
  data.append("qrcode", qrPosition);
  try {
    const response = await axios.put(
      `${API_ADD_DOC}${fileId}?fileName=${encodeURIComponent(
        fileName
      )}&signType=${encodeURIComponent(signType)}`,
      data
    );
    return response.data?.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const replaceDoc = async (file, fileName, fileId, signType) => {
  const data = new FormData();
  data.append("document", file);
  // const data = {
  //   linkToPdf: url,
  //   filename,
  // };
  try {
    const response = await axios.put(
      `${API_ADD_DOC}${fileId}?fileName=${encodeURIComponent(
        fileName
      )}&signType=${encodeURIComponent(signType)}`,
      data
    );
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

// ADD SIGNER
export const addUserToDocument = async (data, fileId) => {
  const body = { flow: data };
  try {
    const response = await axios.put(`${API_ADD_DOC}${fileId}/signers/`, body);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    throw e?.response?.data?.errorMessage ?? "";
  }
};

// PLACE FIELDS
export const getDocImages = async (fileId) => {
  try {
    const response = await axios.get(`${API_ADD_DOC}${fileId}/`);
    return response.data?.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const getAllFields = async (fileId) => {
  try {
    const response = await axios.get(`${API_ADD_DOC}${fileId}/fields/`);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const addFields = async (fileId, fields) => {
  const body = { fields };
  try {
    const response = await axios.post(`${API_ADD_DOC}${fileId}/fields/`, body);
    return response.data?.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const updateFields = async (fileId, fields) => {
  const body = { fields };
  try {
    const response = await axios.put(`${API_ADD_DOC}${fileId}/fields/`, body);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    throw e?.response?.data?.errorMessage ?? "";
  }
};

// REVIEW SEND
export const sendDoc = async (fileId, data) => {
  const body = data;
  try {
    const response = await axios.post(`${API_ADD_DOC}${fileId}/send/`, body);
    return response.data?.data;
  } catch (e) {
    console.log(e?.response);
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const verifyOTPDoc = async (fileId, OTP, token, isSign = false) => {
  try {
    const response = await axios.post(
      `/api/doc/${fileId}/${
        isSign ? "sign" : "send"
      }/verify?otp=${OTP}&token=${token}`
    );
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const sendOTPDoc = async (fileId, phone, body) => {
  try {
    const response = await axios.post(
      `/api/doc/${fileId}/sign/phone?phone=${phone}`,
      body
    );
    return response.data?.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};
