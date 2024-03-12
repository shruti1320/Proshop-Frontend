import React, { useState } from "react";
import { Button, Row, Modal, Form } from "react-bootstrap";
import "./reviewModal.scss";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ReviewModal({ show, onHide, modalContent }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState("");

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const handleReviewSubmit = async () => {
    console.log("Submitting review:", review);
    // setShowReviewModal(true);

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/addReview/${modalContent.productId}`,
        {
          name: userInfo.name,
          comment: review,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onHide();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="reviewForm">
          <Form.Label>Enter your review:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
