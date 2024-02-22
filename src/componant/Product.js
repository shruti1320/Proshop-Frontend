import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast  from "react-hot-toast";
import { BiHeart } from 'react-icons/bi';
const Product = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <Card
      className="my-3 p-3 rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product._id}`} className="product-image">
        <div className="image-container">
        <Card.Img src={product.image} alt={product.name} />
        <div  className="heart-icon-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
        <BiHeart className="heart-icon" />
        </div>
        </div>
        {hovered && (
          <div>
            <Button
              onClick={() => toast("Product added to cart")}
              variant="dark"
              as={Link}
              to={`/cart`}
              block
              className="w-100 p-1 opacity-75"
            >
              Add to Cart
            </Button>
          </div>
        )}
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
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