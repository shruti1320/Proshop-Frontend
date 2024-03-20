// FeedbackIcons.js
import React from "react";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
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
  };

  return (
    <div>
      <Row className="me-5 mt-2">
        <Col md={1}>
          <MoodBadIcon
            fontSize="large"
            style={{ fill: feedbackIcons.bad ? "black" : "grey" }}
            onClick={() => {
              handleFeedbackClick("bad");
              rating(1);
            }}
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Bad
          </span>
        </Col>

        <Col md={1}>
          <SentimentDissatisfiedIcon
            fontSize="large"
            style={{
              fill: feedbackIcons.dissatisfied ? "black" : "grey",
            }}
            onClick={() =>{
              handleFeedbackClick("dissatisfied")
              rating(2);
            } 
          }
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Ok
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedIcon
            fontSize="large"
            style={{
              fill: feedbackIcons.satisfied ? "black" : "grey",
            }}
            onClick={() => {
              handleFeedbackClick("satisfied")
              rating(3);
            }}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Avg
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedAltIcon
            fontSize="large"
            style={{
              fill: feedbackIcons.satisfiedAlt ? "black" : "grey",
            }}
            onClick={() =>{
              handleFeedbackClick("satisfiedAlt")
              rating(4);
            }}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Good
          </span>
        </Col>
        <Col md={1}>
          <SentimentVerySatisfiedIcon
            fontSize="large"
            style={{
              fill: feedbackIcons.verySatisfied ? "black" : "grey",
            }}
            onClick={() => {
              handleFeedbackClick("verySatisfied")
              rating(5);
            }}
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
