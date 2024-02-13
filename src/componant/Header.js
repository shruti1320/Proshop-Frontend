import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
const Header = () => {
  const logoutHandler = () => {
    console.log("Logout handler");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/cart">Cart</Nav.Link>
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* </Container>
      </Navbar> */}
    </header>
  );
};

export default Header;
