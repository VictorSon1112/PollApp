import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  password: "",
  name: "",
  avatarURL: "",
  answers: {},
  questions: [],
};

export const authSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    login: (_state, action) => action.payload,
    logout: () => initialState,
    // addQuestionUserCreate: (state, action) => ({
    //   ...state,
    //   questions: [...state.questions, action.payload.id],
    // }),
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
