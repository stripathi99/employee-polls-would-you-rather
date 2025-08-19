import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../components/App";
import * as sharedActions from "../actions/shared";

// Mock child components
jest.mock("../components/Login", () => () => (
  <div data-testid="login-component">Login</div>
));
jest.mock("../components/Dashboard", () => () => (
  <div data-testid="dashboard-component">Dashboard</div>
));
jest.mock("react-bootstrap/Spinner", () => (props) => (
  <div data-testid="spinner-component">Spinner</div>
));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("App Component", () => {
  let store;
  let handleInitialDataSpy;

  beforeEach(() => {
    handleInitialDataSpy = jest
      .spyOn(sharedActions, "handleInitialData")
      .mockReturnValue({ type: "INIT" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderWithStore(storeState) {
    store = mockStore(storeState);
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

  it("dispatches handleInitialData on mount", () => {
    renderWithStore({ authedUser: null, loadingBar: {} });
    expect(handleInitialDataSpy).toHaveBeenCalled();
  });

  it("shows Spinner when loadingBar.default is undefined", () => {
    renderWithStore({ authedUser: null, loadingBar: {} });
    expect(screen.getByTestId("spinner-component")).toBeInTheDocument();
  });

  it("shows Spinner when loadingBar.default is 1", () => {
    renderWithStore({ authedUser: null, loadingBar: { default: 1 } });
    expect(screen.getByTestId("spinner-component")).toBeInTheDocument();
  });

  it("shows Login when loadingBar.default is not 1/undefined and authedUser is falsy", () => {
    renderWithStore({ authedUser: null, loadingBar: { default: 0 } });
    expect(screen.getByTestId("login-component")).toBeInTheDocument();
  });

  it("shows Dashboard when loadingBar.default is not 1/undefined and authedUser is truthy", () => {
    renderWithStore({ authedUser: "johndoe", loadingBar: { default: 0 } });
    expect(screen.getByTestId("dashboard-component")).toBeInTheDocument();
  });
});
