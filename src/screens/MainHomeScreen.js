import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import item from "../images/background.png";
import axios from "axios";
import { addToCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import HeartIcon from "../componant/HeartIcon";

export default function MainHomeScreen() {
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const [hovered, setHovered] = useState(false);
  const allproducts = useSelector((state) => state.product.productList);
  const { products } = allproducts;

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: userInfo._id,
          productId,
          quantity: 1,
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
      console.log("Error adding product to cart:", error);
    }
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_BASE_PATH}/api/products`
  //       );

  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      <Row>
        <Col md={6}>
          <p className="display-4 mt-5">
            Elecronic Products Upto <span className="text-warning">50%</span>off
          </p>
          <p>Buy our products.Our products are completely eco friendly.</p>
          <button type="button" className="mt-2 btn btn-dark">
            Shop Now
          </button>
        </Col>
        <Col md={6}>
          <img src={item} alt="try"></img>
        </Col>
      </Row>

      <div>
        <Container>
          <p
            className="mt-4 fw-bold text-center text-dark display-6 products-text"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,.25)" }}
          >
            PRODUCTS
          </p>
          <Row>
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <Card
                  className="my-3 p-3 rounded "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <div
                    className="product-image-container"
                    style={{ position: "relative", flex: "1 0 auto" }}
                  >
                    <Link to={`/product/${product._id}`}>
                      <Card.Img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        style={{ objectFit: "cover", height: "100%" }}
                      />
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
                          handleAddToCart(product._id);
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

                  <Card.Body style={{ flex: "0 0 auto" }}>
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
              </div>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
