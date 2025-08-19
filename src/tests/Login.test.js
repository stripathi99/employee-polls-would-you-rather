import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Login from "../components/Login";
import * as authedUserActions from "../actions/authedUser";

// Mock react-bootstrap components (optional, for simplicity)
// jest.mock("react-bootstrap/Card", () => ({ children }) => (
//   <div>{children}</div>
// ));
jest.mock("react-bootstrap/Card", () => {
  const Card = ({ children }) => <div data-testid="card">{children}</div>;
  Card.Header = ({ children }) => (
    <div data-testid="card-header">{children}</div>
  );
  Card.Body = ({ children }) => <div data-testid="card-body">{children}</div>;
  return Card;
});
jest.mock("react-bootstrap/Row", () => ({ children }) => <div>{children}</div>);
jest.mock("react-bootstrap/Col", () => ({ children }) => <div>{children}</div>);
jest.mock("react-bootstrap/Form", () => {
  const Form = ({ children, ...props }) => <form {...props}>{children}</form>;
  Form.Group = ({ children }) => <div>{children}</div>;
  Form.Label = ({ children }) => <label>{children}</label>;
  Form.Control = ({ children, ...props }) => (
    <select {...props}>{children}</select>
  );
  return Form;
});
jest.mock("react-bootstrap/Button", () => ({ children, ...props }) => (
  <button {...props}>{children}</button>
));

const mockStore = configureStore([]);

const userNames = [
  { value: "sarahedo", label: "Sarah Edo" },
  { value: "tylermcginnis", label: "Tyler McGinnis" },
];

describe("Login component", () => {
  let store;
  let dispatchMock;
  let setAuthedUserMock;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: { name: "Sarah Edo" },
        tylermcginnis: { name: "Tyler McGinnis" },
      },
    });
    dispatchMock = jest.fn();
    store.dispatch = dispatchMock;
    setAuthedUserMock = jest
      .spyOn(authedUserActions, "setAuthedUser")
      .mockImplementation((id) => ({ type: "SET_AUTHED_USER", id }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderLogin() {
    // Render the connected component with Provider and mock store
    return render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }

  it("shows error message if submitted with no user selected", () => {
    renderLogin();
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText("You must choose a username")).toBeInTheDocument();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("dispatches setAuthedUser and clears error when a user is selected and submitted", () => {
    renderLogin();
    // Select a user
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "sarahedo" },
    });
    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(setAuthedUserMock).toHaveBeenCalledWith("sarahedo");
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_AUTHED_USER",
      id: "sarahedo",
    });
    // Error message should not be present
    expect(
      screen.queryByText("You must choose a username")
    ).not.toBeInTheDocument();
  });
});
