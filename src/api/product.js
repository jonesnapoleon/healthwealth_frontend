import axios from "axios";

const API_PRODUCT = "/v1/home";
const API_SEARCH = "/v1/search";
const API_ORDER = "/v1/order";
const API_PRODUCT_DETAIL = "/v1/product";

export const getProductList = async () => {
  try {
    const response = await axios.get(API_PRODUCT);
    return response.data.body;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "Fail to get products. Try again!";
  }
};

export const searchProduct = async (queryText) => {
  try {
    const response = await axios.get(`${API_SEARCH}/${queryText}`);
    return response.data.body;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "Product failed to fetch";
  }
};

export const makeOrder = async (body) => {
  try {
    const response = await axios.post(`${API_ORDER}`, body);
    return response.data.body;
  } catch (e) {
    throw e?.response?.data?.errorMessage ?? "Order can't be made";
  }
};

export const getProductDetail = async (productId) => {
  try {
    const response = await axios.get(`${API_PRODUCT_DETAIL}/${productId}`);
    return response.data.body;
  } catch (e) {
    throw (
      e?.response?.data?.errorMessage ??
      "Product details is currently unavailable. Try again!"
    );
  }
};
