import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/authSlice";
import AssignReducer from "../components/Assign/AssignSlice";
import SignDocumentReducer from "../components/SignDocument/SignDocumentSlice";
import ViewDocumentReducer from "../components/ViewDocument/ViewDocumentSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    assign: AssignReducer,
    signDoc: SignDocumentReducer,
    viewDoc: ViewDocumentReducer,
  },
});
