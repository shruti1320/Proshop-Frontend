import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./FlashSale.scss";

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Set the end time of the flash sale (for example, 24 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const interval = setInterval(() => {
      // Calculate the time remaining
      const now = new Date();
      const timeDiff = endTime - now;
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Format the time left
      const formattedTimeLeft = `${hours}h ${minutes}m ${seconds}s`;
      setTimeLeft(formattedTimeLeft);

      // If the end time is reached, clear the interval
      if (timeDiff < 0) {
        clearInterval(interval);
        setTimeLeft("Sale ended");
      }
    }, 1000);

    // Clean up on component unmount
    return () => clearInterval(interval);
  }, []);

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
