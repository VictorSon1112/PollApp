import { render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../app/store";
import Header from "../components/Header";
import NotFoundPage from "../pages/NotFoundPage";

describe("NotFoundPage component", () => {
  it("should render container correctly", () => {
    const wrapper = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render timestamp correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(
      getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
  });
});
