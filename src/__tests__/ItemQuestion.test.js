import { fireEvent, render } from "@testing-library/react";
import ItemQuestion from "../pages/HomePage/ItemQuestion";
import { BrowserRouter } from "react-router-dom";

const data = {
  id: "1",
  author: "John Doe",
  timestamp: "2023-05-14T10:00:00Z",
};

describe("ItemQuestion", () => {
  it("should render author correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ItemQuestion data={data} />
      </BrowserRouter>
    );
    expect(getByText("John Doe")).toBeInTheDocument();
  });
  it("should render timestamp correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ItemQuestion data={data} />
      </BrowserRouter>
    );
    expect(getByText("14-May-2023 / 17:00")).toBeInTheDocument();
  });

  it("should navigate to question detail page when Details button is clicked", () => {
    const wrapper = render(
      <BrowserRouter>
        <ItemQuestion data={data} />
      </BrowserRouter>
    );
    const { getAllByTestId, getByTestId } = wrapper;
    const detailsButtons = getAllByTestId("navigate-detail-btn");
    expect(detailsButtons.length).toBeGreaterThan(0);
    const detailsButton = getByTestId("navigate-detail-btn");
    fireEvent.click(detailsButton);
    expect(wrapper).toMatchSnapshot();
  });
});
