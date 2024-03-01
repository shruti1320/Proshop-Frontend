import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast from "react-hot-toast";
import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import axios from "axios";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [hoveredheart, setHoveredHeart] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseEnterHeart = () => {
    setHoveredHeart(true);
  };
  const handleMouseLeaveHeart = () => {
    setHoveredHeart(false);
  };

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const addToFavourite = async (productId,userId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/users/addTofavourite`,
      {
        productId,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      );
      toast.success("Product added to favourite")
    } catch (error) {
      console.log("::::::::: error ", error);
    }
  };

  const handleAddToCart = async (userId, productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId,
          productId,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToCart(response?.data?.product));
      toast.success("Product added to cart");
    } catch (error) {
      console.log("::::::::: error ", error);
    }
  };

  return (
    <Card
      className="my-3 p-3 rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product._id}`} className="product-image">
        <div className="image-container" style={{ position: "relative" }}>
          <Card.Img src={product.image} alt={product.name} />
          <HeartIcon
            hoveredheart={hoveredheart}
            handleMouseEnterHeart={handleMouseEnterHeart}
            handleMouseLeaveHeart={handleMouseLeaveHeart}
            //onClick={addToFavourite(product._id,userInfo._id)}
          />

          {hovered && !hoveredheart && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
            >
              <Button
                onClick={() => {
                  handleAddToCart(userInfo._id, product._id, 1);
                }}
                variant="dark"
                as={Link}
                block
                className="w-100 p-1 opacity-75"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3"></div>
          {product.rating} from {product.numReviews} review
        </Card.Text>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Product;
