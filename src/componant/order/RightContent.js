// RightContent.js
import React, { useState } from "react";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";

import FeedbackIcons from "./FeedbackIcons";
import TrackingHistory from "./TrackingHistory";
import ReturnOrderModal from "./ReturnOrderModal";

const RightContent = ({
  modalContent,
  handleFeedbackClick,
  feedbackIcons,
  activeStep,
  delivery,
  day,
  date,
  month,
  year,
  updatedDate,
  updatedDay,
  updatedMonth,
  updatedYear,
}) => {

  // State variable to manage modal visibility
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  // Function to toggle modal visibility
  const toggleReturnModal = () => {
    setShowReturnModal(!showReturnModal);
  };

  // Function to handle form submission
  const handleReturnSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle return submission here
    console.log("Return reason:", returnReason);
    // Close the modal after submission
    toggleReturnModal();
  };


  return (

    <div>
      <Row className="p-4">
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
            {delivery ? "Delivery" : "Dispatched"}
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
        <Col md={5} style={{ backgroundColor: "#F5F5F5" }} className="p-3">
          <div>
            <a href="#" onClick={toggleReturnModal}  style={{ fontSize: "0.8rem" }}>
              <i className="fa fa-cart-arrow-down pe-2" aria-hidden="true"></i>{" "}
              Return Order
            </a>
            <br></br>
            <a href="/" style={{ fontSize: "0.8rem" }}>
              <i className="fa fa-exchange pe-2" aria-hidden="true"></i>{" "}
              Exchange Item{" "}
            </a>
            <hr></hr>
            <span style={{ fontSize: "0.7rem" }}>For Delivery Queries</span>
            <br></br>
            <span style={{ fontSize: "0.7rem" }}>
              <a href="/contact" className="link-primary">
                Contact Us
              </a>
            </span>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="px-3">
        <span style={{ fontSize: "0.7rem" }}>
          How was your delivery experience?
        </span>
        <FeedbackIcons
          feedbackIcons={feedbackIcons}
          handleFeedbackClick={handleFeedbackClick}
          modalContent={modalContent}
        />
      </Row>
      <hr />
      <Row className="px-3">
        <span className="lead" style={{ fontSize: "0.9rem" }}>
          Tracking History
        </span>
        <TrackingHistory activeStep={activeStep} />
      </Row>

      <ReturnOrderModal
        show={showReturnModal}
        onHide={toggleReturnModal}
        modalContent={modalContent}
      />
    </div>
  );
};

export default RightContent;
