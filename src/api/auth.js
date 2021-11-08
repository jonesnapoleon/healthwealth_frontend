import axios from "axios";

const API_LOGIN = "/api/login/";
const API_REGISTER = "/api/register/";
const API_ACCOUNT = "/api/user/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_LOGIN, {
      email,
      password,
    });
    axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to login";
  }
};

export const register = async (fullName, email, password) => {
  try {
    const response = await axios.post(API_REGISTER, {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to login";
  }
};

export const editAccount = async (newBody) => {
  try {
    const response = await axios.patch(API_ACCOUNT, newBody);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail;
  }
};
