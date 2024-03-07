import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../scss/Product_Display.scss"
const SmartPhoneScreen = () => {
  const [mobileProducts, setmobileProducts] = useState([]);

  useEffect(() => {
    const fetchmobileProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_PATH}/api/products`
        );

        const mobileProductsData = response.data.filter(
          (product) => product.category === "Mobile Phone"
        );
        setmobileProducts(mobileProductsData);
      } catch (error) {
        console.error("Error fetching camera products:", error);
      }
    };

    fetchmobileProducts();
  }, []);

  return (
    <div className="container">
      <h1>Smart Phone Products</h1>
      <div className="row">
        {mobileProducts.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            {" "}
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${product.price}
                </p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartPhoneScreen;

