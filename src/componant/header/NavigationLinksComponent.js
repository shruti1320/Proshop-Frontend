// NavigationLinksComponent.js
import React from "react";
import { Nav } from "react-bootstrap";

const NavigationLinksComponent = () => {
  return (
    <Nav className="">
      <Nav.Link href="/mainscreen">Home</Nav.Link>
      <Nav.Link href="/all-products">All Products</Nav.Link>
    </Nav>
  );
};

export default NavigationLinksComponent;
