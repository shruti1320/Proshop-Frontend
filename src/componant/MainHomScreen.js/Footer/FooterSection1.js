import React from "react";
import { Col } from "react-bootstrap";

export default function FooterSection1() {
  return (
    <div>
      <ul className=" fw-bold text-dark">PROSHOP</ul>
      <div className="contact-info d-flex align-items-center justify-content-center responsive ">
        <i className="fa-solid fa-headphones me-2 mb-3"></i>
        <div>
          <p className="text-light  mt-0">Have any questions?</p>
          <p className="text-light ">123-456-789</p>
        </div>
        {/* <button className="btn btn-primary ms-2 mt-3">Live Chat</button> */}
      </div>
    </div>
  );
}
