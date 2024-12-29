import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { setAuthedUser } from "../actions/authedUser";
import App from "./App";

const store = createStore(reducer, middleware);
describe("App", () => {
  it("should render the component", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

});
