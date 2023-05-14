import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    allQuestions: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    addQuestion: (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }),
    addQuestionUser: (state, action) => ({
      ...state,
      [action.payload.author]: {
        ...state[action.payload.author],
        questions: [
          ...state[action.payload.author].questions,
          action.payload.id,
        ],
      },
    }),
  },
});

export default questionsSlice.reducer;
export const { allQuestions, addQuestion, addQuestionUser } =
  questionsSlice.actions;
