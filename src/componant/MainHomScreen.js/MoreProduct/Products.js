import React from "react";
import "./Products.scss";

export default function Products(props) {
  return (
    <div>
      <div className="product-card">
        <div className="card mt-4">
          <img
            src={props.url}
            alt=""
            className="card-image mt-3"
            style={{ width: "154px", height: "200px" }}
          />
          <div className="card-content text-center">
            <h4 className="product-name">{props.name}</h4>
            <p className="product-offer">{props.offer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
