import React from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFavourite } from "../Slices/favouriteSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function FavouriteProductRow({ product }) {
  const dispatch = useDispatch();

  const deleteFromFavourite = async (userId, productId) => {
    console.log(productId, " the id from  favourite screen ");
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
      dispatch(removeFromFavourite({ productId: productId }));
      // dispatch(removeFromCart({ productId: productId }));
    } catch (error) {
      console.log("Error in deleteFromfavourite", error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={10}>{product?.product}</Col>
        <Col md={2}>
          <Button
            type="button"
            variant="light"
            onClick={() => deleteFromFavourite(product._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
