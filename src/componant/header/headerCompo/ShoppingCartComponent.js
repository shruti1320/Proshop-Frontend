// ShoppingCartComponent.js
import React from "react";
import { Nav, Badge } from "react-bootstrap";

const ShoppingCartComponent = ({ cartItemsCount, setShow }) => {
  return (
    <Nav.Link onClick={() => setShow(true)}>
      <i className="fa fa-shopping-cart pe-2 position-relative">
        {cartItemsCount === 0 ? (
          <></>
        ) : (
          <Badge
            pill
            bg="secondary"
            className="position-absolute top-2 start-100 translate-middle"
          >
            {cartItemsCount}
          </Badge>
        )}
      </i>
    </Nav.Link>
  );
};

export default ShoppingCartComponent;
