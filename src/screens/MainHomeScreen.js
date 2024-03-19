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
import SmartphoneDeals from "../componant/MainHomScreen.js/MoreProduct/LoadItems";
import "../scss/MainHomeScreen.scss";
import FlashSale from "../componant/MainHomScreen.js/Sale/FlashSale";
import MainScreenFooter from "../componant/MainHomScreen.js/Footer/MainScreenFooter";
import { addCartHandlerService } from "../service/product";

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
      // const token = localStorage.getItem("token");
      const data = {
        userId: userInfo._id,
          productId,
          quantity: 1,
      }
      const response = addCartHandlerService(data)
       
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
    <Container fluid>
      <div className="bg-white mb-5">
        <Row>
          <Col>
            <img src={item} style={{ width: "64px", height: "64px" }}></img>
            <div>
              <select className="border-0">
                <option>All Products:</option>
                <option>camera</option>
                <option>airpods</option>
                <option>smartphone</option>
              </select>
            </div>
          </Col>
          <Col>
            <div>
              <img
                src="https://in.canon/media/image/2023/05/19/b89bed4e21e540f985dedebe80166def_EOS+R100+RF-S18-45mm+Front+Slant.png"
                className="bg-transparent"
                style={{ height: "64px", width: "64px" }}
              ></img>
              <div>
                <a href="/camera" className="text-decoration-none">
                  Camera
                </a>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <img src="https://rukminim2.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100"></img>
              <div>
                <a href="/camera" className="text-decoration-none">
                  Electronics
                </a>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <img src="https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100"></img>
              <div>
                <a href="/camera" className="text-decoration-none">
                  SmartPhone
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="p-0">
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
                          <button type="button" className="mt-3 btn btn-dark">
                            Shop Now
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>

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
    </Container>
  );
}
