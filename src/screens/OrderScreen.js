import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { getOrderDetails } from "../actions/orderAction";
import axios from "axios";
import toast from "react-hot-toast";

const OrderScreen = () => {
  // console.log( " orderId");

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

 

  // const getOrderDetails = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const data = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_PATH}/api/orders/${id}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(data, " the console from rita ");
  //     return data;
  //   } catch (error) {
  //     toast(" Error in showing orders");
  //     console.log(error, " error in order screen ");
  //   }
  // };
  // useEffect(() => {
  //   getOrderDetails(userInfo._id);
  // }, []);

  if (!loading) {
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // if (orders.orderItems !== 0) {
    //   orders.itemsPrice = addDecimal(
    //     orders.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    //   );
    // }
  }

  const address = null;
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order {orders._id}</h1>
      
    </div>
  );
};

export default OrderScreen;
