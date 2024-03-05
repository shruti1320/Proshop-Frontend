import React from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFavourite } from "../Slices/favouriteSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function FavouriteProductRow({ product }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const deleteFromFavourite = async (productId, userId) => {
    // console.log(productId, " the id from  favourite screen ");
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/removeFav`,
        { productId, userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeFromFavourite({ productId: productId }));
    } catch (error) {
      console.log("Error in deleteFromfavourite", error);
    }
  };

  return (
    <div>
      <Row>
        <Col md={1}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>

        <Col md={8}>{product?.name}</Col>
        <Col md={2}>
          <Button
            type="button"
            variant="light"
            onClick={() => deleteFromFavourite(product?._id, userInfo._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
