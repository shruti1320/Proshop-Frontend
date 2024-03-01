import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartlist } from "../Slices/cartSlice";
import { Button, Col, Row } from "react-bootstrap";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import axios from "axios";

export default function FavouriteProductScreen() {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.product.productList);
  const { loading, error } = item;
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);


  const deleteFromFavourite = async (userId, productId) => {
    console.log(productId," the id frm screen ")
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/removeFav`,
        { userId, productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch(removeFromCart({ productId: productId }));
    } catch (error) {
      console.log("Error in deleteFromfavourite", error);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Row className="align-items-center ">
            <Col>
              <h1>All Favourite Products</h1>
            </Col>
          </Row>
          
          {loading ? (
            <Loader />
          ) : error === 0 ? (
            <Message>There is no favourite product.</Message>
          ) : (
            <div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
