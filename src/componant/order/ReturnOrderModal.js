import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const ReturnOrderModal = ({ show, onHide, modalContent }) => {
  const [returnReason, setReturnReason] = useState("");
  const [returnDetails, setReturnDetails] = useState("");
  const [returnOptions, setReturnOptions] = useState("");

  const handleReturnSubmit = async(e) => {
    e.preventDefault();
    onHide();

    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_BASE_PATH}/api/order/return/${modalContent.orderId}`,
        {
          orderId:modalContent.orderId,
          reason:returnReason,
          

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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Return Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleReturnSubmit}>
          <Form.Group controlId="returnReason">
            <Form.Label>Reason for Return</Form.Label>
            <Form.Control
              className="p-0 ps-2"
              as="select"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              <option value="Received wrong item">Received wrong item</option>
              <option value="Item doesn't match description">Item doesn't match description</option>
              <option value="Damaged or defective item">Damaged or defective item</option>
              <option value="Changed mind">Changed mind</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          {returnReason === "Other" && (
            <Form.Group className="mt-4" controlId="returnDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={returnDetails}
                onChange={(e) => setReturnDetails(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group controlId="returnOptions" className="py-4">
            <Form.Label>Return Options</Form.Label>
            <Form.Check
              type="radio"
              id="returnExchange"
              label="Exchange for a different item"
              value="Exchange"
              checked={returnOptions === "Exchange"}
              onChange={(e) => setReturnOptions(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="returnRefund"
              label="Refund"
              value="Refund"
              checked={returnOptions === "Refund"}
              onChange={(e) => setReturnOptions(e.target.value)}
              
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Return
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnOrderModal;
