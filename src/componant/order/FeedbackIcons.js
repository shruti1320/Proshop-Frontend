import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { ratingProductHandler } from "../../service/product";

const FeedbackIcons = ({ feedbackIcons, handleFeedbackClick, modalContent }) => {
  console.log(modalContent)
  const rating = async (number) => {
    try {
      toast("Product Rated");
      const token = localStorage.getItem("token");

      const response = await ratingProductHandler({id:modalContent.productId,rating:number});
      
    } catch (error) {
      toast("Product did not rated ");
      console.log(error, " error ");
    }



  const [rating, setRating] = useState(null);

  const handleRatingClick = (number) => {
    setRating(number);
    props.handleFeedbackClick(number)
  };

  return (
    <div>
      <Row className="me-5 mt-2">
        <Col md={1}>
          <MoodBadIcon
            fontSize="large"
            style={{ fill: rating === 1 ? "black" : "grey" }}
            onClick={() => handleRatingClick(1)}
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Bad
          </span>
        </Col>
        <Col md={1}>
          <SentimentDissatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 2 ? "black" : "grey" }}
            onClick={() => handleRatingClick(2)}
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Ok
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 3 ? "black" : "grey" }}
            onClick={() => handleRatingClick(3)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Avg
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedAltIcon
            fontSize="large"
            style={{ fill: rating === 4 ? "black" : "grey" }}
            onClick={() => handleRatingClick(4)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Good
          </span>
        </Col>
        <Col md={1}>
          <SentimentVerySatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 5 ? "black" : "grey" }}
            onClick={() => handleRatingClick(5)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Best
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default FeedbackIcons;