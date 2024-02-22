import React from "react";
import { Offcanvas } from "react-bootstrap";
const CustomOffcanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart Products</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>Hi There !!!!!</Offcanvas.Body>
    </Offcanvas>
  );
};
export default CustomOffcanvas;