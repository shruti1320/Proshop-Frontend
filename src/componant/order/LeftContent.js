import React, { useState } from "react";
import { Button, Row, Modal, Form } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

const LeftContent = ({ modalContent, userInfo }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div>
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
      <hr></hr>
      <Row className="px-4">
        <Button className="p-2 mt-3" onClick={() => setShowReviewModal(true)}>Add Review</Button>
      </Row>

      <ReviewModal modalContent={modalContent} show={showReviewModal} onHide={() => setShowReviewModal(false)}>
      
      </ReviewModal>
      
    </div>
  );
};

export default LeftContent;
