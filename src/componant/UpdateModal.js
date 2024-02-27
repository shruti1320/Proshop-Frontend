import React from "react";
import { Modal } from "react-bootstrap";
import "../scss/Modal.scss";
import UpdateForm from "./UpdateForm";


const UpdateModal = ({ show, handleClose, product }) => {
  
  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>UPDATE PRODUCT DETAILS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateForm handleClose={handleClose} product={product} />
      </Modal.Body>
    </Modal>
  );
};
export default UpdateModal;







