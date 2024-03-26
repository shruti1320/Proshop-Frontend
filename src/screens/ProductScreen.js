import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Rating from "../componant/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail, listProducts } from "../Slices/productSlice";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { addToCart, existedCartItem } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import Avatar1 from "../componant/avatar/avatar-1.jpg";
import { addCartHandlerService } from "../service/product";
import { loggedUserDetails } from "../Slices/userSlice";

const ProductScreen = ({ match }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.productDetail);
  const { loading, error, product } = productDetail;
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const location = useLocation();
  const match_Id = location.pathname.split("/");
  let [searchParams, setSearchParams] = useSearchParams();

  const addToRecentlyViewed = (productId) => {
    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!recentlyViewed.includes(productId)) {
      recentlyViewed.push(productId);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const [image, setMainImage] = useState(null);

  useEffect(() => {
    // dispatch(existedCartItem())
    const params = new URLSearchParams(location.pathname);
    const searchQuery = params.get("pathname");

    console.log("the url from screen thee   ", location);

    if (searchQuery) {
      setSearchParams(searchQuery);
    }

    localStorage.setItem("searchQuery", JSON.stringify(location.pathname));

    dispatch(listProductDetail(match_Id[2]));
    addToRecentlyViewed(match_Id[2]);
    if (Object.keys(product).length === 0) {
      console.log(" hi tpo primt ");
    }
  }, [match]);

  const addCartHandler = async (userId, productId, quantity, stock) => {
    try {
      if (stock >= quantity) {
        const data = {
          userId,
          productId,
          quantity,
        };
        const response = await addCartHandlerService(data);
        dispatch(addToCart(response?.data?.product));
        navigate("/cart");
      } else {
        toast("Product Out Of Stock ", {
          style: {
            color: "red",
            background: "#f69697",
            border: "1px solid red",
          },
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const navigation = () => {
    localStorage.setItem("qty", JSON.stringify(qty));
    navigate("/login");
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col lg={4} md={6}>
            <Image
              src={product.image}
              alt={product.image}
              fluid
              style={{ height: "390px", width: "390px" ,maxWidth:"100%"}}
              // style={{ height: "auto", maxWidth: "100%" }}
            />
          </Col>

          <Col lg={4} md={6} className="mt-md-0 mt-4">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              {product.countInStock < 10 ? (
                <ListGroup.Item>
                  Hurry up! Only {product.countInStock} left
                </ListGroup.Item>
              ) : (
                <></>
              )}
            </ListGroup>

            <Row>
              <Col lg={12} md={12} >
                <h3> Top Reviews </h3>
                <ListGroup variant="flush">
                  {product.reviews.map((review, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4} className="ps-5">
                          <img
                            src={Avatar1}
                            className="rounded-circle"
                            alt=""
                            style={{ width: "50px", height: "50px" }} // Adjust the width and height as needed
                          />
                        </Col>
                        <Col>
                          {review.name}
                          <Rating className="ps-5" value={review.rating} />
                          {review.comment}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Col>

          <Col lg={4} md={6} className="mt-md-0 mt-4">
            <Card style={{ height: "auto", maxWidth: "100%" }}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => {
                      userInfo && Object.keys(userInfo).length > 0
                        ? addCartHandler(
                            userInfo._id,
                            match_Id[2],
                            qty,
                            product.countInStock
                          )
                        : navigation();
                    }}
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* <Col md={6}>
              <h3> Top Reviews </h3>
              <ListGroup variant="flush">
                    {product.reviews.map((review, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2} className="ps-5">
                            <img
                              src={Avatar1}
                              className="rounded-circle"
                              alt=""
                              style={{ width: "50px", height: "50px" }} // Adjust the width and height as needed
                            />
                          </Col>
                          <Col>
                            {review.name}
                            <Rating className="ps-5" value={review.rating} />
                            {review.comment}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
              </Col> */}
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
