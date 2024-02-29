import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartlist } from "../Slices/cartSlice";
import { Button, Col, Row } from "react-bootstrap";
import Loader from "../componant/Loader";
import Message from "../componant/Message";

export default function FavouriteProductScreen() {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.product.productList);
  const { loading, error } = item;

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col>
          <Row className="align-items-center ">
            <Col md={8}>
              <h1>All Favourite Products</h1>
            </Col>
            <Col md={4}>
              <Button
                type="button"
                variant="dark"
                className="m-2 border border-light float-right"
              >
                Add Product
              </Button>
            </Col>
          </Row>
          {loading ? (
            <Loader />
          ) : error === 0 ? (
            <Message>There is no product.</Message>
          ) : (
            <div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
