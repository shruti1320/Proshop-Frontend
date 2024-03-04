import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartlist, existedCartItem } from "../Slices/cartSlice";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import axios from "axios";
import { favouritelist,removeFromFavourite } from "../Slices/favouriteSlice";
import FavouriteProductRow from "../componant/FavouriteProductRow";

export default function FavouriteProductScreen() {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.favourite.favouriteProductList);
  console.log(item);

  const { loading, error, favouriteProduct } = item;
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch(existedCartItem());
    dispatch(favouritelist());
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
      dispatch(removeFromFavourite({productId: productId}))
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
            <ListGroup variant="flush">
            {favouriteProduct.map((product) => (
              <ListGroup.Item key={product._id}>
                <FavouriteProductRow
                  product={product}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
