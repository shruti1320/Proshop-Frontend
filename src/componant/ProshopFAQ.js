import React from "react";
import "../scss/ProhopFAQ.scss";
import { Container } from "react-bootstrap";
import accordionItems from "./ProshopFAQ.json";

export default function ProshopFAQ() {
  return (
    <div className="wrapper">
      <div className="content">
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "60px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div className="section-text text-secondary">
          Have more questions? Email us at support@PROSHOP.com.
        </div>
        <Container style={{ margin: "43px auto" }}>
          {accordionItems.map((item, index) => (
            <div
              className="accordion-item border border-secondary rounded mb-4 p-2"
              key={index}
            >
              <div className="accordion-header p-3">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index + 1}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index + 1}`}
                >
                  {item.question}
                </button>
              </div>
              <div
                id={`collapse${index + 1}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
              >
                <div className="accordion-body p-3">{item.answer}</div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}
