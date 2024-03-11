// ModalComponent.js
import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const ModalComponent = ({
  showModal,
  setShowModal,
  modalContent,
  userInfo,
  handleFeedbackClick,
  feedbackIcons,
  activeStep,
  delivery,
  updatedDate,
  updatedDay,
  updatedMonth,
  updatedYear,
}) => {
  return (
    <Modal
      size="xl"
      fullscreen="md-down"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Body className="p-3">
        <Row>
          <Col md={4} className="my-4">
            <LeftContent modalContent={modalContent} userInfo={userInfo} />
          </Col>
          <div style={{ width: "0px" }}>
            <span className="vr" style={{ height: "700px" }}></span>
          </div>
          <Col md={7}>
            <RightContent
              modalContent={modalContent}
              handleFeedbackClick={handleFeedbackClick}
              feedbackIcons={feedbackIcons}
              activeStep={activeStep}
              delivery={delivery}
              updatedDate={updatedDate}
              updatedDay={updatedDay}
              updatedMonth={updatedMonth}
              updatedYear={updatedYear}
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
