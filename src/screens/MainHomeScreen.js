import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import item from "../images/background.png";
import axios from "axios";
import { addToCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import HeartIcon from "../componant/HeartIcon";
import SmartphoneDeals from "../componant/mainHomeScreenCompo/MoreProduct/LoadItems"
import "../scss/MainHomeScreen.scss";
import FlashSale from "../componant/mainHomeScreenCompo/Sale/FlashSale"
import MainScreenFooter from "../componant/mainHomeScreenCompo/Footer/MainScreenFooter"
import Option from "../componant/mainHomeScreenCompo/part1/AllCategory"
import Option2 from "../componant/mainHomeScreenCompo/part1/Category1";
import Option3 from "../componant/mainHomeScreenCompo/part1/Category2";
import Option4 from "../componant/mainHomeScreenCompo/part1/Category3";

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

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Option />
        </Col>

        <Col>
          <Option2 />
        </Col>

        <Col>
          <Option3 />
        </Col>

        <Col>
          <Option4 />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="p-0 mt-4">
          <Carousel className="carousel-fullscreen">
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <div className="carousel-item-container">
                  <Row>
                    <Col md={6}>
                      <img
                        className="d-block"
                        src={item}
                        alt={product.name}
                        style={{ height: "440px", width: "540px" }}
                      />
                    </Col>
                    <Col md={6}>
                      <div className="d-flex flex-column justify-content-center align-items-start h-100">
                        <p className="display-4 mt-5">
                          Elecronic Products Upto
                          <span className="text-warning">50%</span>off
                        </p>
                        <Link to="/">                   
                        <button type="button" className="mt-3 btn btn-dark">
                          Shop Now
                        </button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row>
        <p className="mt-5 fw-bold  text-dark display-6 products-text">
          Best Deals
        </p>
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

      <div>
        <FlashSale />
      </div>

      <div className="fw-bold display-6 mt-5">Popular Search</div>
      <SmartphoneDeals />
      <MainScreenFooter />
    </div>
  );
}
