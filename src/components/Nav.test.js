import React from "react";
import Nav from "./Nav";
import { render } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);
describe("Nav", () => {
  it("will have all expected link", async () => {
    await store.dispatch(setAuthedUser("sarahedo"));
    const { authedUser } = store.getState();
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Nav />
        </Router>
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(component.getByTestId("home").textContent).toBe("Home");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(component.getByTestId("new-poll").textContent).toBe("New Poll");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(component.getByTestId("leaderboard").textContent).toBe(
      "Leaderboard"
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(component.getByTestId("authedUser").textContent).toBe(
      "User: " + authedUser
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(component.getByTestId("logout").textContent).toBe("Logout");
  });
});
