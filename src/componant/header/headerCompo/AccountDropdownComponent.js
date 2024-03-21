// AccountDropdownComponent.js
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

const AccountDropdownComponent = ({ userInfo }) => {
  return (
    <NavDropdown
      style={{ marginRight: "0rem" }}
      title="Account"
      id="account"
      className="dropdown-button"
    >
      <div>
        
          <div>
            <NavDropdown.Item href="/favouriteScreen">Favourites</NavDropdown.Item>
            <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
          </div>
     
        <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
      </div>
    </NavDropdown>
  );
};

export default AccountDropdownComponent;
