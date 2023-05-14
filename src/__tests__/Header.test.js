import { render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import store from "../app/store";
import Header from "../components/Header";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../app/userSlice";
import questionReducer from "../app/questionSlice";
import infoUserReducer from "../app/infoUserSlice";
import { BrowserRouter } from "react-router-dom";

const props = {
  user: {
    id: "sarahedo",
    password: "123123",
    name: "Sarah Edo",
    avatarURL:
      "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
};

describe("Header component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        infoUser: infoUserReducer,
        users: userReducer,
        question: questionReducer,
      },
      middleware: [...getDefaultMiddleware()],
    });
  });

  it("should render container correctly", () => {
    const wrapper = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header {...props} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
