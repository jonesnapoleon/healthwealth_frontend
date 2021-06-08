import axios from "axios";

const API_LOGIN = "/api/login/";

export const login = async (token) => {
  try {
    // const response = await axios.post(API_LOGIN, {
    //   token,
    // });
    const response = await axios.get("/api/user/1/");
    console.log(response);
    console.log(axios.defaults.headers);
    return response.data;
  } catch (e) {
    if (e?.response) {
      const errorCode = e.response?.data?.code;
      console.log(e);
    }
    throw e?.response?.data?.message ?? "Fail to login";
  }
};
