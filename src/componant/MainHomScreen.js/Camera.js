import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../scss/Product_Display.scss"
const CameraScreen = () => {
  const [cameraProducts, setCameraProducts] = useState([]);

  useEffect(() => {
    const fetchCameraProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_PATH}/api/products`
        );

        const cameraProductsData = response.data.filter(
          (product) => product.category === "Camera"
        );
        setCameraProducts(cameraProductsData);
      } catch (error) {
        console.error("Error fetching camera products:", error);
      }
    };

    fetchCameraProducts();
  }, []);

  return (
    <div className="container">
      <h1>Camera Products</h1>
      <div className="row">
        {cameraProducts.map((product) => (
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

export default CameraScreen;
