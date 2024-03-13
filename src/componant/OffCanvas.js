import React, { useEffect } from "react";

import { Button, Offcanvas, Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartlist, removeFromCart } from "../Slices/cartSlice";
import Message from "../componant/Message";
import IncrementDecrementBtn from "./IncrementDecrementBtn";
import axios from "axios";
import toast from "react-hot-toast";

const CustomOffcanvas = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart.cartList;

  const userInfo = useSelector((state) => state.user.userDetails.userInfo);
  const navigate = useNavigate();

  const deleteFromCart = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/removecart`,
        { userId: userInfo._id, productId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Product deleted from cart");
      dispatch(removeFromCart({ productId: id }));
    } catch (error) {
      console.log("Error coming from Offcanvas :", error);
    }
  };


  const handleViewCart = () => {
    handleClose();
    navigate("/cart");
  };

  const handleCheckout = () => {
    handleClose();
    navigate("/shipping");
  };

  //console.log("cartItems", cartItems);
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="position-fixed w-25"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart Products</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          <h3>Products in cart</h3>
          {cartItems?.length === 0 ? (
            <Message variant="info">Cart is Empty!!!</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems?.map((item) => (
                <ListGroup.Item key={item?.product?._id}>
                  <Row>
                    <Col
                      xs={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Image
                        src={item?.product?.image}
                        alt={item?.product?.name}
                        fluid
                        rounded
                      />
                    </Col>

                    <Col className="mt-0 pt-0">
                      <Row>
                        <Col>
                          <Link to={`/product/${item?.product?.product}`}>
                            {item?.product?.name}
                          </Link>
                        </Col>
                        <Col xs={1} className="text-end">
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            onClick={() => deleteFromCart(item?.product?._id)}
                          ></i>
                        </Col>
                      </Row>
                      <Row className="align-items-center">
                        <Col>
                          <IncrementDecrementBtn
                            minValue={1}
                            maxValue={item?.product?.countInStock}
                            counts={item?.quantity}
                            productId={item?.product?._id}
                          />
                        </Col>
                        <Col>
                          <span>${item?.product?.price * item?.quantity}</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
        <hr />
        <div className="d-flex flex-column">
          <div className="w-100 text-center">
            <Row className="w-100">
              <Col className="text-start ps-4">Subtotal:</Col>
              <Col className="text-end">
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item?.quantity * item?.product?.price,
                    0
                  )
                  .toFixed(2)}
              </Col>
            </Row>
          </div>
          <hr />
          <Button className="m-1 mb-2 w-auto" onClick={handleViewCart}>
            View Cart
          </Button>
          <Button className="m-1 w-auto" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomOffcanvas;
