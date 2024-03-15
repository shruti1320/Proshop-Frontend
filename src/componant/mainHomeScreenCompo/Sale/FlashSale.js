import React from "react";
import { Col, Row } from "react-bootstrap";
import "./FlashSale.scss";
import { useCountdownTimer } from "./FlashSaleMicro";

export default function FlashSale() {
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 24);

  const timeLeft = useCountdownTimer(endTime);

  return (
    <div>
      <Row>
        <div className="mt-4 p-4 d-flex justify-content-center background">
          <Col md={4} className="d-flex flex-column">
            <p className="text-white display-4">
              Flash
              <span className="text-warning ms-2">Sale</span>
            </p>
            <p className="text-white fs-1">Up To 80% off</p>
            <div
              className="text-white border border-white rounded-3 bg-dark bg-opacity-75 p-3 mb-3"
              style={{ width: "250px" }}
            >
              Sale ends in: {timeLeft}
            </div>
            <div>
              <a href="/" className="text-white">
                go to flash sale page{" "}
                <i className="fa-solid fa-arrow-right ms-4"></i>
              </a>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
}
