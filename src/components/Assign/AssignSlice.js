import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [],
    activeStage: 0,
    uploadedFile: null,
    availableLevel: 1,
  },
  reducers: {
    setAvailableLevel: (state, action) => {
      state.availableLevel = action.payload;
    },
    setActiveStage: (state, action) => {
      state.activeStage = action.payload;
    },
    setUploadedFile: (state, action) => {
      state.uploadedFile = action.payload;
    },
    addSignee: (state, action) => {
      state.signees = [
        ...state.signees,
        { name: action.payload.name, email: action.payload.email },
      ];
    },
    removeSignee: (state, action) => {
      state.signees = state.signees.filter(
        (signee) =>
          signee.name !== action.payload.name &&
          signee.email !== action.payload.email
      );
    },
    resetSignee: (state, action) => {
      state.signees = [];
    },
  },
});

export const {
  addSignee,
  resetSignee,
  removeSignee,
  setActiveStage,
  setUploadedFile,
  setAvailableLevel,
} = AssignSlice.actions;

export const selectAssignees = (state) => state.assign.signees;
export const activeStage = (state) => state.assign.activeStage;
export const uploadedFile = (state) => state.assign.uploadedFile;
export const availableLevel = (state) => state.assign.availableLevel;

export default AssignSlice.reducer;
