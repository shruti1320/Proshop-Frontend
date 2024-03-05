import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../scss/LinkStyle.scss";

function AccountScreen() {
  return (
    <div>
      <p>Account Screen</p>

      <Navbar className="linkstyle">
        <Nav.Link href="/cart" className="border border-2">
        <i class="fa-solid fa-cart-shopping"></i>Cart
        </Nav.Link>
        <Nav.Link href="/profile" className="border border-2 ms-2">
        <i class="fa-solid fa-user"></i>Account
        </Nav.Link>
        <Nav.Link href="/order" className="border border-2 ms-2">
        <i class="fa-solid fa-cube"></i>My Order
        </Nav.Link>
      </Navbar>
    </div>
  );
}

export default AccountScreen;
