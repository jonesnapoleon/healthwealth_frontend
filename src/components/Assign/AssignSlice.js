import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [],
  },
  reducers: {
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
      console.log("resetSignee");
      state.signees = [];
    },
  },
});

export const { addSignee, resetSignee, removeSignee } = AssignSlice.actions;

export const selectAssignees = (state) => state.assign.signees;

export default AssignSlice.reducer;
