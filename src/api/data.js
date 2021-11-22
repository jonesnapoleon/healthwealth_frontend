import axios from "axios";
import { getBackendDateFormat } from "utils/transformer";

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

export const uploadFile = async (
  file,
  title,
  description,
  issuerName,
  issuedDate,
  category
) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("title", title ?? " ");
    data.append("description", description ?? " ");
    data.append("issuername", issuerName ?? " ");
    data.append("issueddate", getBackendDateFormat(issuedDate));
    data.append("category", category);
    const response = await axios.post(API_UPLOAD, data);
    return response.data;
  } catch (e) {
    throw e?.response?.data?.detail ?? "Fail to upload document. Try again!";
  }
};
