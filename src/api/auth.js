import axios from "axios";

const API_LOGIN = "/api/login/";
const API_GET_USER = "/api/user/";

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
    throw e?.response?.data?.message ?? "Fail to login";
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_GET_USER}${userId}/`);
    return response.data;
  } catch (e) {
    // if (e?.response) {
    //   const errorCode = e.response?.data?.code;
    // }
    throw e?.response?.data?.message ?? "Fail to login";
  }
};
