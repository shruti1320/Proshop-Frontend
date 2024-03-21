import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../componant/Header";
import { useSelector } from "react-redux"; // Import useSelector

// Mock useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Header Component", () => {
  const initialState = {
    user: {
      userDetails: { userInfo: { name: "John", role: "admin" } },
    },
    cart: {
      cartList: { cartItems: [{ id: 1, name: "Product 1", quantity: 1 }] },
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    useSelector.mockImplementation((selector) => selector(initialState));
  });

  test("renders brand name", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const brandName = screen.getByText("Proshop");
    expect(brandName).toBeInTheDocument();
  });




});
