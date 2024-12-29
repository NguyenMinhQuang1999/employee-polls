import React from "react";
import NewQuestion from "./NewQuestion";
import { render, fireEvent } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer, middleware);
describe("NewQuestion", () => {
    it("should render the component new question", () => {
      const component = render(
        <Provider store={store}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <NewQuestion />
          </BrowserRouter>
        </Provider>
      );
      expect(component).toBeDefined();
      expect(component).toMatchSnapshot();
    });
  it("the submit button is enabled when all fields are entered", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const submitBtn = component.getByTestId("submit-poll");
    expect(submitBtn).toBeDisabled();
    const optionOne = component.getByTestId("firstOption");
    const optionTwo = component.getByTestId("secondOption");
    fireEvent.change(optionOne, { target: { value: "Ok" } });
    fireEvent.change(optionTwo, { target: { value: "Not good" } });
    expect(optionOne.value).toEqual("Ok");
    expect(optionTwo.value).toEqual("Not good");
    expect(submitBtn).not.toBeDisabled();
  });
});
