import React from "react";
import { Col } from "react-bootstrap";

export default function MainScreenFooter() {
  return (
    <div className="bg-dark bg-gradient bg-opacity-75 ">
      <div className=" d-flex text-white">
        <Col md={3}>
          <p>Proshop</p>
          <ul>
            <li style={{ listStyle: "none" }}>
              <a href="#">Who We Are</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Join Our Team</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Terms&Conditions</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">We Respect Your Privacy</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Fees&Payments</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Returns&Refunds Policy</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Promotions Terms&Conditions</a>
            </li>
          </ul>
        </Col>

        <Col md={3}>
          <p>Help</p>
          <ul>
            <li style={{ listStyle: "none" }}>
              <a href="#">Track Your Order</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Frequently Asked Questions</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Returns</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Cancellations</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">Customer Care</a>
            </li>
            <li style={{ listStyle: "none" }}>
              <a href="#">How Do I Redeem My Coupon</a>
            </li>
          </ul>
        </Col>

        <Col md={3}>
          <p>Shop by</p>
          <li style={{ listStyle: "none" }}>
            <a href="#">Men</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Women</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Kids</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Indie</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Stores</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">New Arrivals</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Brand Directory</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Home</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Collections</a>
          </li>
        </Col>

        <Col md={3}>
          <p>Follow us</p>
          <li style={{ listStyle: "none" }}>
            <a href="#">Facebook</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Instagram</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Twitter</a>
          </li>
          <li style={{ listStyle: "none" }}>
            <a href="#">Pinterest</a>
          </li>
        </Col>
      </div>
      <hr></hr>
      <div className="text-white ">
        Payments Methods
        <div className="d-flex">
          <ul>
            <li aria-label="Net Banking"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
