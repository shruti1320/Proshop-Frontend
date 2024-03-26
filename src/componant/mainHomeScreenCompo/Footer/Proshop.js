
import React from "react";
import { Col } from "react-bootstrap";

export default function FooterSection1() {
  return (
    <div>
      <ul className="fw-bold text-dark">PROSHOP</ul>
      <div className="contact-info d-flex responsive">
        <i className="fa-solid fa-headphones me-3 mb-3"></i>
        <ul className="list-unstyled mx-0">
          {/* Remove left margin */}
          <li className="text-light mb-2 mt-0">Have any questions?</li>
          <li className="text-light mb-0">123-456-789</li>
        </ul>
        {/* <button className="btn btn-primary ms-2 mt-3">Live Chat</button> */}
      </div>
    </div>
  );
}
