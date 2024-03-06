import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "./FAQ.scss";
import toast from "react-hot-toast";
import { removeUser } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FAQS() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { userInfo } = userDetails;

  const handleClose = () => setShowModal(false);

  const faqs = [
    {
      question:
        "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).",
    },
    {
      question:
        "When will my Proshop account be updated with the new email address (or mobile number)?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
    },
    {
      question:
        "What happens to my existing Proshop account when I update my email address (or mobile number)?",
      answer:
        "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.",
    },
    {
      question:
        "Does my Seller account get affected when I update my email address?",
      answer:
        "Proshop has a 'single sign-on' policy. Any changes will reflect in your Seller account also.",
    },
  ];

  // Function to handle opening the modal
  const handleDeactivateClick = () => {
    setShowModal(true);
  };

  // Function to handle delete the sign-in user
  const handleDelete = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/${userInfo._id}`,
        { userId: userInfo._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");

      dispatch(removeUser());
      navigate("/");
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("failed deleting user");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ fontFamily: "Public, sans-serif" }}
    >
      <h4 className="text-center mb-4 fw-bold">Frequently Asked Questions</h4>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <p className="fw-bold fs-6">{faq.question}</p>
          <p className="fs-6">{faq.answer}</p>
        </div>
      ))}

      <div className="text-left mb-4">
        <a onClick={handleDeactivateClick} style={{ color: "blue" }}>
          Deactivate Account
        </a>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to deactivate your account?</p>
          <Row className="mt-4">
            <Col>
              <Button
                onClick={handleDelete}
                style={{
                  borderRadius: "8px",
                  padding: "8px 20px",
                  fontWeight: "bold",
                }}
                variant="primary"
              >
                Yes, Deactivate
              </Button>
            </Col>
            <Col className="me-5">
              <Button
                onClick={handleClose}
                style={{
                  borderRadius: "8px",
                  padding: "8px 20px",
                  fontWeight: "bold",
                }}
                variant="primary"
              >
                LET ME STAY!
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
