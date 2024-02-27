import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../actions/userAction";
import CustomOffcanvas from "../componant/OffCanvas";
import "../scss/Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login')
  };
const cartItems = useSelector((state) => state.cart.cartList.cartItems);
  const cartItemsCount = cartItems.length;
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                style={{ marginRight: "0rem" }}
                title="Account "
                id="account"
                className="dropdown-button"
              >
                <div>
                  <NavDropdown.Item href="/cart"> Cart </NavDropdown.Item>
                  <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
                </div>
              </NavDropdown>
              <Nav.Link href="/all-products">All Products</Nav.Link>
              <Nav.Link onClick={handleShow}>
                <i className="fa fa-shopping-cart pe-2 position-relative">
                  <Badge
                    pill
                    bg="secondary"
                    className="position-absolute top-2 start-100 translate-middle"
                  >
                    {cartItemsCount}
                  </Badge>
                </i>
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
              <Nav.Link onClick={handleShow}>
                <i className="fa fa-shopping-cart">
                  <Badge pill bg="secondary">
                    {cartItemsCount}
                  </Badge>
                </i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomOffcanvas show={show} handleClose={handleClose} />
      <CustomOffcanvas show={show} handleClose={handleClose} />
    </header>
  );
};
export default Header;
