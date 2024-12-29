import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);
describe("Login", () => {
  
  it("should render the component login page", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should clear input after click button submit", async () => {
    await store.dispatch(handleInitialData());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const usernameInputElement = wrapper.getByTestId("username");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const passwordInputElement = wrapper.getByTestId("password");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButtonElement = wrapper.getByTestId("submit");
    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();

    fireEvent.change(usernameInputElement, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInputElement, {
      target: { value: "123456789" },
    });
    expect(usernameInputElement.value).toBe("sarahedo");
    expect(passwordInputElement.value).toBe("123456789");
    fireEvent.click(submitButtonElement);
    expect(usernameInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
  });
});
