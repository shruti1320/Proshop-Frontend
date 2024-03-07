import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, Image, Modal, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { getOrderDetails } from "../Slices/OrderSlice";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Radio } from "@mui/material";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    dispatch(getOrderDetails(userInfo._id));
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  console.log(orders, " the order inside thing s     ");

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2> Order Details</h2>
              <p>
                <strong>Address:</strong>
                {orders[0]?.shippingAddress?.address},
                {orders[0]?.shippingAddress?.city},
                {orders[0]?.shippingAddress?.postalCode},
                {orders[0]?.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orders?.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orders.map((item) => {
                    return (
                      <ListGroup.Item key={item?._id}>
                        <Row>
                          <Col md={8}>
                            {item.orderItems !== undefined &&
                              item.orderItems.map((ele, ind) => (
                                <Row>
                                  <Col md={2}>
                                    <Image
                                      src={ele.image}
                                      alt={ele.name}
                                      fluid
                                      rounded
                                    />
                                  </Col>
                                  <Col md={10}>
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        openModal({
                                          name: item?.name,
                                          shippingAddress:
                                            item?.shippingAddress,
                                          orderId: item?._id,
                                        })
                                      }
                                    >
                                      {ele.name}
                                    </Link>
                                  </Col>
                                </Row>
                              ))}
                          </Col>
                          <Col>{item.paymentMethod}</Col>
                          <Col>${item.totalPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Modal
        size="xl"
        fullscreen="md-down"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Body className="p-3">
          <Row>
            <Col md={4} className="my-4">
              <Row className="px-4">
                <Button className="p-2">Proshop</Button>
              </Row>
              <hr></hr>
              <Row className="px-4">
                <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                  Customer Name :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  {userInfo.name}
                </span>
              </Row>
              <Row className="px-4 py-3">
                <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                  Customer Contact :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  +91 9099858360
                </span>
              </Row>
              <Row className="px-4 pb-3">
                <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                  Delivery Address :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  {modalContent.shippingAddress && (
                    <span className="text-center">
                      {modalContent.shippingAddress.address},
                      {modalContent.shippingAddress.city},
                      {modalContent.shippingAddress.postalCode},
                      {modalContent.shippingAddress.country}
                    </span>
                  )}
                </span>
              </Row>
              <hr></hr>
              <Row className="px-4">
                <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                  Seller Name :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  Shoppers Stop
                </span>
              </Row>
              <Row className="px-4 py-3">
                <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                  Seller Support :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  +91 9099858360
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  support@shoppers.com
                </span>
              </Row>
            </Col>
            <Col className="d-flex py-2 align-items-center">
              <div className="vr mx-auto" style={{ height: "700px" }}></div>
            </Col>
            <Col md={7}>
              <Row clasName="pe-4">
                <span className="bold pt-3" style={{ fontSize: "0.7rem" }}>
                  Tracking No. :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  #{modalContent?.orderId}
                </span>
              </Row>
              <hr></hr>
              <Row className="py-3 pe-3">
                <Col md={7}>
                  <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                    your order is
                  </span>
                  <br></br>
                  <span className="lead" style={{ fontSize: "2rem" }}>
                    Delivered
                  </span>
                  <br></br>
                  <span className="lead" style={{ fontSize: "0.8rem" }}>
                    as on 27 August 2024 , Friday
                  </span>
                  <br></br>
                  <span className="lead py-2" style={{ fontSize: "0.9rem" }}>
                    Last Updated on 29 August 2024
                  </span>
                </Col>
                <Col
                  md={5}
                  style={{ backgroundColor: "#F5F5F5" }}
                  className="p-3"
                >
                  <div>
                    <a href="/" style={{ fontSize: "0.8rem" }}>
                      <i
                        class="fa fa-cart-arrow-down pe-2"
                        aria-hidden="true"
                      ></i>{" "}
                      Return Order{" "}
                    </a>
                    <br></br>
                    <a href="/" style={{ fontSize: "0.8rem" }}>
                      <i className="fa fa-exchange pe-2" aria-hidden="true"></i>{" "}
                      Exchange Item{" "}
                    </a>
                    <hr></hr>
                    <span style={{ fontSize: "0.7rem" }}>
                      For Delivery Queries
                    </span>
                    <br></br>
                    <span style={{ fontSize: "0.7rem" }}>
                      <a href="/" className="link-primary">
                        Contact Us
                      </a>
                    </span>
                  </div>
                </Col>
              </Row>
              <hr></hr>
              <Row className="py-3 pe-3">
                <span style={{ fontSize: "0.7rem" }}>
                  How was your delivery experience?
                </span>
                <span>
                  <Row className="me-5 mt-2">
                    <Col md={1} style={{ textAlign: "center" }}>
                      <div>
                        <MoodBadIcon fontSize="large" />
                        <span
                          className="lead ps-1"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Bad
                        </span>
                      </div>
                    </Col>

                    <Col md={1}>
                      <SentimentDissatisfiedIcon fontSize="large"></SentimentDissatisfiedIcon>
                      <span
                        className="lead ps-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Ok
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentSatisfiedIcon fontSize="large"></SentimentSatisfiedIcon>
                      <span
                        className="lead ps-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Avg
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentSatisfiedAltIcon fontSize="large"></SentimentSatisfiedAltIcon>
                      <span
                        className="lead ps-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Good
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentVerySatisfiedIcon fontSize="large"></SentimentVerySatisfiedIcon>
                      <span
                        className="lead ps-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Best
                      </span>
                    </Col>
                  </Row>
                </span>
              </Row>
              <hr></hr>
              <Row className="pb-3 pe-3">
                <span className="lead py-2" style={{ fontSize: "0.9rem" }}>
                  Tracking History
                </span>
                <Row>
                  <Col md={5} className="ps-4">
                    <span>27 Aug 2024</span>
                  </Col>
                  <Col md={3}>
                    <Radio></Radio>
                  </Col>
                  <Col md={4}>
                    <span>Delivered</span>
                    <br></br>
                    <span style={{ fontSize: "0.7rem" }}>
                      at location, Surat
                    </span>
                  </Col>
                </Row>
                <Col className="d-flex">
                  <div className="vr mx-auto" style={{ height: "50px" }}></div>
                </Col>
                <Row>
                  <Col md={5} className="ps-4">
                    <span>25 Aug 2024</span>
                  </Col>
                  <Col md={3}>
                    <Radio></Radio>
                  </Col>
                  <Col md={3}>
                    <span>Order Dispatch</span>
                    <br></br>
                    <span style={{ fontSize: "0.7rem" }}>from Mumbai</span>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderScreen;
