import axios from "axios";

const API_LOGIN = "/api/login/";
const API_GET_USER = "/api/profile/";
const API_UPDATE_USER = "/api/profile/";
const API_UPLOAD_KTP = "/api/user/ktp/";
const API_UPLOAD_SELFIE = "/api/user/selfie/";
const API_VERIFY_OTP = "/api/user/phone/verify?code=";
const API_SEND_PHONE_OTP = "/api/user/phone/send/";

export const login = async (token) => {
  try {
    const response = await axios.post(API_LOGIN, {
      token,
    });
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.errorMessage ?? "Fail to login";
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_GET_USER}${userId}/`);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const updateUser = async (data) => {
  try {
    // if (!userId) throw new Error("No User ID");
    const response = await axios.put(`${API_UPDATE_USER}`, data);
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const uploadKTP = async (file) => {
  const data = new FormData();
  data.append("photo", file);
  try {
    const response = await axios.post(API_UPLOAD_KTP, data);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};
export const deleteKTP = async () => {
  try {
    const response = await axios.delete(API_UPLOAD_KTP);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};
export const uploadSelfie = async (file) => {
  const data = new FormData();
  data.append("photo", file);
  try {
    const response = await axios.post(API_UPLOAD_SELFIE, data);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};
export const deleteSelfie = async () => {
  try {
    const response = await axios.delete(API_UPLOAD_SELFIE);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

// export const getAllSignatures = async () => {
//   try {
//     const response = await axios.get(`${API_GET_USER_SIGNATURES}`);
//     return response.data?.data;
//   } catch (e) {
//     throw e?.response?.data?.errorMessage ?? "";
//   }
// };

export const addSignature = async (file, isInitial = false) => {
  const data = new FormData();
  data.append("photo", file);
  try {
    const response = await axios.post(
      `/api/user/${!isInitial ? "signature" : "initial"}`,
      data
    );
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const verifyOTPPhone = async (OTP) => {
  try {
    const response = await axios.post(`${API_VERIFY_OTP}${OTP}`);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};

export const sendOTPPhone = async () => {
  try {
    const response = await axios.post(`${API_SEND_PHONE_OTP}`);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "";
  }
};
