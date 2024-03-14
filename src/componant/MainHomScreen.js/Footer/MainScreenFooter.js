import React from "react";
import { Col, Row } from "react-bootstrap";
import "../Footer/MainScreenFooter.scss";
import FooterSection1 from "./FooterSection1";
import FooterSection2 from "./FooterSection2";
import FooterSection3 from "./FooterSection3";
import FooterSection4 from "./FooterSection4";

export default function MainScreenFooter() {
  return (
    <div
      className="main-footer bg-dark bg-opacity-75 py-5"
      
    >
      <Row>
        <Col md={6} lg={3} className="footer-section">
          <FooterSection1 />
        </Col>

        <Col md={6} lg={3} className="footer-section">
          <FooterSection2 />
        </Col>

        <Col md={6} lg={3} className="footer-section">
          <FooterSection3 />
        </Col>

        <Col md={6} lg={3} className="footer-section">
          <FooterSection4 />
        </Col>
      </Row>
    </div>
  );
}
