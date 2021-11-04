import axios from "axios";

const API_LOGIN = "/v1/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_LOGIN, {
      username,
      password,
    });
    axios.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.body.token}`;
    return response.data.body;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "Fail to login";
  }
};
