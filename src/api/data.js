import axios from "axios";

const API_DOCUMENT = "/api/documents/";
const API_UPLOAD = "/api/upload/";
// const API_ORDER = "/v1/order";
// const API_PRODUCT_DETAIL = "/v1/product";

export const getDocumentList = async () => {
  try {
    const response = await axios.get(API_DOCUMENT);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to get documents. Try again!";
  }
};

export const uploadFile = async (file, description, issuerName, issuedDate) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("description", description ?? " ");
    data.append("issuerName", issuerName ?? " ");
    data.append("issuedDate", issuedDate);
    const response = await axios.post(API_UPLOAD, data);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to upload document. Try again!";
  }
};

// export const searchProduct = async (queryText) => {
//   try {
//     const response = await axios.get(`${API_SEARCH}/${queryText}`);
//     return response.data.body;
//   } catch (e) {
//     throw e?.response?.data?.errorMessage ?? "Product failed to fetch";
//   }
// };

// export const makeOrder = async (body) => {
//   try {
//     const response = await axios.post(`${API_ORDER}`, body);
//     return response.data.body;
//   } catch (e) {
//     throw e?.response?.data?.errorMessage ?? "Order can't be made";
//   }
// };

// export const getProductDetail = async (productId) => {
//   try {
//     const response = await axios.get(`${API_PRODUCT_DETAIL}/${productId}`);
//     return response.data.body;
//   } catch (e) {
//     throw (
//       e?.response?.data?.errorMessage ??
//       "Product details is currently unavailable. Try again!"
//     );
//   }
// };
