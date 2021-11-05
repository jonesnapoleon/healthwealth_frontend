import axios from "axios";

const API_LOGIN = "/api/login/";
const API_REGISTER = "/api/register/";

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

export const register = async (full_name, email, password) => {
  try {
    const response = await axios.post(API_REGISTER, {
      full_name,
      email,
      password,
    });
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to login";
  }
};
