import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartlist, existedCartItem } from "../Slices/cartSlice";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import Loader from "../componant/Loader";
import Message from "../componant/Message";

import { favouritelist } from "../Slices/favouriteSlice";
import FavouriteProductRow from "../componant/FavouriteProductRow";

export default function FavouriteProductScreen() {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.favourite.favouriteProductList);
  console.log(item);

  const { loading, error, favouriteProduct } = item;
  console.log(favouriteProduct, " listing of favourite products -------------");

  useEffect(() => {
    // dispatch(existedCartItem());
    dispatch(favouritelist());
    dispatch(cartlist());
  }, [dispatch]);

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
                {favouriteProduct.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <FavouriteProductRow product={item?.product} />
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
