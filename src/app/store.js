import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import questionReducer from "./questionSlice";
import infoUserReducer from "./infoUserSlice";
export const store = configureStore({
  reducer: {
    infoUser: infoUserReducer,
    users: userReducer,
    question: questionReducer,
  },
});
