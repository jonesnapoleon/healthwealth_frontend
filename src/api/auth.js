import axios from "axios";

const API_LOGIN = "/api/login/";

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
