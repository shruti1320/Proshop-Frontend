import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import axios from "axios";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToCart = async (productId, stock) => {
    try {
      const token = localStorage.getItem("token");

      if(stock >= 1) {

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
          {
            userId: userInfo._id,
            productId,
            quantity:1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response?.data, " to know the plm ")
        dispatch(addToCart(response?.data?.product));
        toast.success("Product added to cart");
        
      } else {
        toast("Product Out Of Stock ", {
          style: {
            color: "#ff2c2c",
            background: "#f69697",
            border: "1px solid #ff2c2c",
          },
        })
      }
    } catch (error) {
      toast(" Product out of stock ");
      console.log("::::::::: error ", error);
    }
  };

  return (
    <Card
      className="my-3 p-3 rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-image" style={{ position: "relative" }}>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} alt={product.name} />
        </Link>
        <HeartIcon product={product} />
        {hovered && (
          <Button
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
            onClick={() => {
              handleAddToCart(product._id, product.countInStock);
            }}
            variant="dark"
            as={Link}
            block
            className="w-100 p-1 opacity-75"
          >
            Add to Cart
          </Button>
        )}
      </div>

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
