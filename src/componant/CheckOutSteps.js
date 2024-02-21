import React from "react";
import { Nav } from "react-bootstrap";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <>
            <Nav.Link href="/login">Sign In</Nav.Link>
          </>
        ) : (
          <Nav.Link to="/login">Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <>
            <Nav.Link href="/shipping">Shipping</Nav.Link>
          </>
        ) : (
          <Nav.Link to="/shipping">Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <>
            <Nav.Link href="/payment">Payment</Nav.Link>
          </>
        ) : (
          <Nav.Link to="/payment" disabled>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <>
            <Nav.Link href="/placeorder">Place Order</Nav.Link>
          </>
        ) : (
          <Nav.Link to="/placeorder" disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOutSteps;
