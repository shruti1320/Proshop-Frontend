import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, Image, Modal, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { getOrderDetails } from "../Slices/OrderSlice";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const [feedbackIcons, setFeedbackIcons] = useState({
    bad: false,
    dissatisfied: false,
    satisfied: false,
    satisfiedAlt: false,
    verySatisfied: false,
  });

  useEffect(() => {
    dispatch(getOrderDetails(userInfo._id));
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  console.log(orders, " the order inside thing s ");
  // console.log(orders[0].createdAt, " date ")
  console.log(modalContent, " the content inside modal ");
  var orderDate = new Date(Date.parse(modalContent.orderedDate));

  function getWeekDay(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

  function getYearMonth(date) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }

  var day = getWeekDay(orderDate);
  var date = orderDate.getDate();
  var month = getYearMonth(orderDate);
  var year = orderDate.getFullYear();

  var updateDate = new Date(Date.parse(modalContent.updatedDatee));

  var updatedDay = getWeekDay(updateDate);
  var updatedDate = updateDate.getDate();
  var updatedMonth = getYearMonth(updateDate);
  var updatedYear = updateDate.getFullYear();

  const handleFeedbackClick = (icon) => {
    const resetIcons = {
      bad: false,
      dissatisfied: false,
      satisfied: false,
      satisfiedAlt: false,
      verySatisfied: false,
    };

    const updatedFeedbackIcons = { ...resetIcons, [icon]: true };
    setFeedbackIcons(updatedFeedbackIcons);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [delivery, setDelivered] = useState(false);

  if (modalContent?.delivery) {
    setDelivered(true);
  }

  useEffect(() => {
    if (orders && orders.length > 0) {
      const dispatchDate = new Date(modalContent.orderedDate);
      const deliveryStatus = modalContent?.delivery;
      const currentDate = new Date();

      if (currentDate > dispatchDate) {
        setActiveStep(1);
      }

      if (deliveryStatus) {
        setActiveStep(2);
      }
    }
  }, [orders]);

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

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
                {shippingAddress?.address},
                {shippingAddress?.city},
                {shippingAddress?.postalCode},
                {shippingAddress?.country},
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
                                          name: item?.product?.name,
                                          shippingAddress:
                                            item?.shippingAddress,
                                          orderId: item?._id,
                                          orderedDate: item?.createdAt,
                                          updatedDatee: item?.updatedAt,
                                          delivery: item?.isDelivered,                                                                                  })
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

            <div style={{ width: "0px" }}>
              <span className="vr" style={{ height: "700px" }}></span>
            </div>

            <Col md={7}>
              <Row clasName="p-4">
                <span className="bold pt-3" style={{ fontSize: "0.7rem" }}>
                  Tracking No. :
                </span>
                <span className="lead" style={{ fontSize: "1.1rem" }}>
                  #{modalContent?.orderId}
                </span>
              </Row>
              <hr></hr>
              <Row className="p-4">
                <Col md={7}>
                  <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
                    your order is
                  </span>
                  <br></br>
                  <span className="lead" style={{ fontSize: "2rem" }}>
                  {delivery?("Delivery"):("Dispatched")}
                  </span>
                  <br></br>
                  <span className="lead" style={{ fontSize: "0.8rem" }}>
                    as on {date} {month} {year}, {day}
                  </span>
                  <br></br>
                  <span className="lead py-2" style={{ fontSize: "0.9rem" }}>
                    Last Updated on {updatedDate} {updatedMonth} {updatedYear} ,{" "}
                    {updatedDay}
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
                        className="fa fa-cart-arrow-down pe-2"
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
              <Row className="px-3">
                <span style={{ fontSize: "0.7rem" }}>
                  How was your delivery experience?
                </span>
                <span>
                  <Row className="me-5 mt-2">
                    <Col md={1}>
                      <MoodBadIcon
                        fontSize="large"
                        style={{ fill: feedbackIcons.bad ? "black" : "grey" }}
                        onClick={() => handleFeedbackClick("bad")}
                      />
                      <span
                        className="lead ps-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Bad
                      </span>
                    </Col>

                    <Col md={1}>
                      <SentimentDissatisfiedIcon
                        fontSize="large"
                        style={{
                          fill: feedbackIcons.dissatisfied ? "black" : "grey",
                        }}
                        onClick={() => handleFeedbackClick("dissatisfied")}
                      />
                      <span
                        className="lead ps-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Ok
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentSatisfiedIcon
                        fontSize="large"
                        style={{
                          fill: feedbackIcons.satisfied ? "black" : "grey",
                        }}
                        onClick={() => handleFeedbackClick("satisfied")}
                      />
                      <span
                        className="lead ps-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Avg
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentSatisfiedAltIcon
                        fontSize="large"
                        style={{
                          fill: feedbackIcons.satisfiedAlt ? "black" : "grey",
                        }}
                        onClick={() => handleFeedbackClick("satisfiedAlt")}
                      />
                      <span
                        className="lead ps-1"
                        style={{ fontSize: "0.7rem" }}
                      >
                        Good
                      </span>
                    </Col>
                    <Col md={1}>
                      <SentimentVerySatisfiedIcon
                        fontSize="large"
                        style={{
                          fill: feedbackIcons.verySatisfied ? "black" : "grey",
                        }}
                        onClick={() => handleFeedbackClick("verySatisfied")}
                      />
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
              <Row className="px-3">
                <span className="lead" style={{ fontSize: "0.9rem" }}>
                  Tracking History
                </span>

                <Box sx={{ maxWidth: 400 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    <Step key={0}>
                      <StepLabel>Order Dispatch</StepLabel>
                      <StepContent>
                        <p>Your order has been dispatched.</p>
                      </StepContent>
                    </Step>
                    <Step key={1}>
                      <StepLabel>Order Delivered</StepLabel>
                      <StepContent>
                        <p>Your order has been delivered.</p>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderScreen;
