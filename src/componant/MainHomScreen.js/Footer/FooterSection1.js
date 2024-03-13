import React from "react";
import { Col } from "react-bootstrap";

export default function FooterSection1() {
  return (
    <div>
      <div className="fw-bold display-6 text-center mb-2 text-dark">
        PROSHOP
      </div>
      <div className="contact-info d-flex align-items-center justify-content-center ms-3">
        <i className="fa-solid fa-headphones me-2"></i>
        <div className="mt-3">
          <div className="text-light ms-2">Have any questions?</div>
          <span className="text-light ms-2">123-456-789</span>
        </div>
        <button className="btn btn-primary ms-2 mt-3">Live Chat</button>
      </div>
    </div>
  );
}
