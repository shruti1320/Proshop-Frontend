import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { removeUser, loggedUserDetails } from "../Slices/userSlice";
import CustomOffcanvas from "../componant/OffCanvas";
import "../scss/Header.scss";
import { useNavigate } from "react-router-dom";
import { cartlist, existedCartItem } from "../Slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const cartItems = useSelector((state) => state.cart.cartList.cartItems);
  const cartItemsCount = cartItems.length;
  const [show, setShow] = useState(false);
  // console.log(userInfo.role, " user info role -----------------");

  useEffect(() => {
    dispatch(loggedUserDetails());
  }, [dispatch]);

  // Effect for dispatching cartlist() when userInfo changes
  useEffect(() => {
    console.log("userInfo", userInfo);
    if (userInfo && Object.keys(userInfo).length > 0) {
      dispatch(cartlist());
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("products");
  
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="col-md-2" href="/">
            Proshop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="col-md-10 justify-content-end"
          >
            <Nav className="ms-auto">
              <Nav.Link href="/mainscreen">Home</Nav.Link>
              <NavDropdown
                style={{ marginRight: "0rem" }}
                title="Account"
                id="account"
                className="dropdown-button"
              >
                <div>
                  {userInfo?.role === "admin" && (
                    <NavDropdown.Item href="/all-products">
                      All Products
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item href="/favouriteScreen">
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/contact">
                    Contact Us
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
              {userInfo && Object.keys(userInfo).length > 0 ? (
                <Nav>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {userInfo?.role === "admin" ? (
                    <Nav.Link href="/admin">Admin</Nav.Link>
                  ) : userInfo?.role === "merchant" ? (
                    <>
                    
                    <Nav.Link href="/merchant">Merchant</Nav.Link>
                    <Nav.Link href="all-products">All Products</Nav.Link>
                    </>
                  ) : (
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
                  )}
                </Nav>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomOffcanvas show={show} handleClose={() => setShow(false)} />
    </header>
  );
};

export default Header;
