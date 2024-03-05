import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../scss/LinkStyle.scss";

function AccountScreen() {
  return (
    <div>
      <p>Account Screen</p>
      
      <Navbar className="linkstyle">
        <Nav.Link href="/cart" className="border border-2" >Cart</Nav.Link>
        <Nav.Link href="/profile" className="border border-2">Account</Nav.Link>
        <Nav.Link href="/order" className="border border-2">My Order</Nav.Link>
      </Navbar>
    </div>
  );
}

export default AccountScreen;
