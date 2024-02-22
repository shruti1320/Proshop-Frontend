import React from "react";
import { Button, Offcanvas, Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../componant/Message";
import IncrementDecrementBtn from "./IncrementDecrementBtn";
import { removeFromCart } from "../actions/cartAction";

const CustomOffcanvas = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total price
  const totalPrice = cartItems?.reduce((total, item) => total + item.price, 0);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

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
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col
                      xs={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col className="mt-0 pt-0">
                      <Row>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={1} className="text-end">
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            onClick={() => removeFromCartHandler(item.product)}
                          ></i>
                        </Col>
                      </Row>
                      <Row className="align-items-center">
                        <Col>
                          <IncrementDecrementBtn minValue={0} maxValue={25} />
                        </Col>
                        <Col>
                          <span>${item.price}</span>
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
              <Col className="text-end">${totalPrice}</Col>
            </Row>
          </div>
          <hr />
          <Button className="m-1 mb-2 w-auto">View Cart</Button>
          <Button className="m-1 w-auto">Checkout</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomOffcanvas;
