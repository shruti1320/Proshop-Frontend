import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { getOrderDetails } from "../Slices/OrderSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

  useEffect(() => {
    dispatch(getOrderDetails(userInfo._id));
  }, []);

  console.log(orderDetails, " the details of orders ");

  // if (!loading) {
  //   const addDecimal = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };
  // }

  // if (!loading) {
  //   const addDecimal = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };
  //   if (orders.orderItems !== 0) {
  //     orders.itemsPrice = addDecimal(
  //       orders.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //     );
  //   }
  // }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>

      <Row>
        <Col >
          <ListGroup variant="flush">
            <ListGroup.Item>
            <h1>Order</h1>
              <h2> Shopping Details</h2>
              <p>
                <strong>Address:</strong>
                {orders[0]?.shippingAddress?.address},{" "}
                {orders[0]?.shippingAddress?.city},{" "}
                {orders[0]?.shippingAddress?.postalCode},
                {orders[0]?.shippingAddress?.country}
              </p>
            </ListGroup.Item>
           
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orders?.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orders.map((item) => {
                    return (
                      <ListGroup.Item key={item?._id}>
                        <Row>
                          <Col md={8}>
                            {item.orderItems != undefined &&
                              item.orderItems.map((ele, ind) => (
                                <Row>
                                  <Col md={2}>
                                    <Image
                                      src={ele.image}
                                      alt={ele.name}
                                      fluid
                                      rounded
                                    />
                                  </Col>
                                  <Col md={10}>
                                    <Link to={`/product/${ele.product}`}>
                                      {ele.name}
                                    </Link>
                                  </Col>
                                </Row>
                              ))}
                          </Col>
                          <Col>{item.paymentMethod}</Col>
                          <Col>${item.totalPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
       
      </Row>
    </div>
  );
};

export default OrderScreen;
