import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    allUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    addAnswer: (state, action) => ({
      ...state,
      [action.payload.authorId]: {
        ...state[action.payload.authorId],
        answers: {
          ...state[action.payload.authorId].answers,
          [action.payload.questionId]: action.payload.answer,
        },
      },
    }),
    addQuestionUser: (state, action) => ({
      ...state,
      [action.payload.author]: {
        ...state[action.payload.author],
        questions: state[action.payload.author].questions.concat(
          action.payload.id
        ),
      },
    }),
  },
});

export default usersSlice.reducer;
export const { allUser, addAnswer, addQuestionUser } = usersSlice.actions;
