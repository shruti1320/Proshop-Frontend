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
    <Container>
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
      </div>

      <Row>
        <Col md={6}>
          <p className="display-4 mt-5">
            Elecronic Products Upto <span className="text-warning">50%</span>off
          </p>
          <p>Buy our products.Our products are completely eco friendly.</p>
          <button type="button" className="mt-3 btn btn-dark">
            Shop Now
          </button>
        </Col>
        <Col md={6}>
          <img src={item} alt="try"></img>
        </Col>
      </Row>

      <p className="mt-5 fw-bold text-center text-dark display-6 products-text">
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

      <p className="fw-bold display-6 mt-5">Best Deals on SmartPhone</p>
      <div
        className="d-flex smartphone-deals-container"
        style={{ border: "2px solid white" }}
      >
        <div style={{ border: "2px solid white" }} className="smartphone-deals">
          <div className="smartphone-deal">
            <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/g/j/-original-imagt5uejuxw2ytm.jpeg?q=70" />
          </div>

          <div>moto g</div>
          <div>incl of offers</div>
        </div>

        <div style={{ border: "2px solid white" }} className="ms-5">
          <div>
            <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70" />
          </div>

          <div>Apple Iphone 15</div>
          <div>incl of offers</div>
        </div>

        <div style={{ border: "2px solid white" }} className="ms-5">
          <div>
            <img src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/y/8/-original-imagtt4mhqrzjs9r.jpeg?q=70" />
          </div>

          <div>vivo 12 pro</div>
          <div>incl of offers</div>
        </div>

        <div style={{ border: "2px solid white" }} className="ms-5">
          <div>
            <img src="	https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/l/x/c/-original-imagx6rdpmhuq5ba.jpeg?q=70" />
          </div>

          <div>realme 12 pro 5G</div>
          <div>incl of offers</div>
        </div>
      </div>
    </Container>
  );
}
