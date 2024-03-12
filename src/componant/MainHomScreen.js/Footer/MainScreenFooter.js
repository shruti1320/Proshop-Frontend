import React from "react";
import { Col, Row } from "react-bootstrap";
import "../Footer/MainScreenFooter.scss"

export default function MainScreenFooter() {
  return (
    <div className="main-footer bg-dark bg-opacity-50 py-5">
      <Row className="justify-content-around">
        <Col md={3} className="footer-section">
          <div className="fw-bold display-6 text-center mb-4">PROSHOP</div>
          <div className="text-light text-center mb-3">This is the ProShop app</div>
          <div className="contact-info d-flex align-items-center justify-content-center">
            <i className="fa-solid fa-headphones me-2"></i>
            <div>
              <div className="text-light">Have any questions?</div>
              <span className="text-light">123-456-789</span>
            </div>
            <button className="btn btn-primary ms-2">Live Chat</button>
          </div>
        </Col>
        <Col md={3} className="footer-section">
          <ul className="quick-links-list">
            <li><a href="#" className="text-light">About Us</a></li>
            <li><a href="#" className="text-light">Contact Us</a></li>
            <li><a href="#" className="text-light">Products</a></li>
            <li><a href="#" className="text-light">Login</a></li>
            <li><a href="#" className="text-light">Sign Up</a></li>
          </ul>
        </Col>
        <Col md={3} className="footer-section">
          <ul className="customer-area-list">
            <li><a href="#" className="text-light">My Account</a></li>
            <li><a href="#" className="text-light">Orders</a></li>
            <li><a href="#" className="text-light">Tracking List</a></li>
            <li><a href="#" className="text-light">Terms</a></li>
            <li><a href="#" className="text-light">Privacy Policy</a></li>
            <li><a href="#" className="text-light">My Cart</a></li>
          </ul>
        </Col>
        <Col md={3} className="footer-section d-flex flex-column justify-content-center align-items-center">
          <div className="follow-us mb-4">
            <span className="text-light">Follow Us</span>
            <div className="social-icons mt-2">
              <button><i className="fa-brands fa-youtube"></i></button> 
              <button><i className="fa-brands fa-linkedin"></i></button>
              <button><i className="fa-brands fa-twitter"></i></button>
              <button><i className="fa-brands fa-facebook"></i></button>
              <button><i className="fa-brands fa-instagram"></i></button> 
            </div>
          </div>
          <div className="download-app text-center">
            <span className="text-light mb-2">Download App</span>  
            <div className="d-flex">
              <button className="btn btn-outline-light me-2"><i className="fa-brands fa-apple"></i> App Store</button>
              <button className="btn btn-outline-light"><i className="fa-brands fa-google-play"></i> Google Play</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
