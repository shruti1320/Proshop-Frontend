// UserDropdownComponent.js
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

const UserDropdownComponent = ({ userInfo, handleLogout }) => {
  return (
    <NavDropdown title={userInfo.name} id="username">
    <NavDropdown.Item onClick={handleLogout}>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
  );
};

export default UserDropdownComponent;
