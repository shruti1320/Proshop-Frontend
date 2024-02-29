import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import CheckOutSteps from "../componant/CheckOutSteps";
import { cartlist, existedCartItem, removeFromCart } from "../Slices/cartSlice";
import { createOrder } from "../actions/orderAction";
import axios from "axios";
import { addOrder } from "../Slices/OrderSlice";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartList);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
  const orders = useSelector((state) => state.cart.cartList);
  const { cartItems } = orders;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimal(
    cartItems.reduce((acc, item) => acc + item.price * item.addedQtyInCart, 0)
  );

  console.log(itemsPrice);
  const shippingPrice = addDecimal(itemsPrice > 100 ? 100 : 0);

  const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

    const deleteFromCart = async (id) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,
          {
            addedInCart: false,
            addedQtyInCart: 0,
          }
        );
        dispatch(removeFromCart({ productId: id }));
      } catch (error) {
        console.log("Error coming from Offcanvas :", error);
      }
    };

  const placeOrderHandler = async () => {
    const payload = {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    const token = localStorage.getItem("token");
    const data = await axios.post(
      `${process.env.REACT_APP_API_BASE_PATH}/api/orders`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(token, " to,en ");

    console.log(data, " order ");

    dispatch(
      addOrder({ cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice })
    );

    // dispatch(
    //   createOrder({
    //     orderItems: cartItems,
    //     itemsPrice: itemsPrice,
    //     taxPrice: taxPrice,
    //     shippingPrice: shippingPrice,
    //     totalPrice: totalPrice,
    //   })
    // );
  };
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shopping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress && (
                  <div>
                    {shippingAddress.address}, {shippingAddress.city},
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </div>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong>
                {paymentMethod && paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col>
                            {item.addedQtyInCart} x {item.price} = $
                            {(item.addedQtyInCart * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <hr />
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
