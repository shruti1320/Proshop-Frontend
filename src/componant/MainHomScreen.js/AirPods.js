import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirPodsScreen = () => {
  const [cameraProducts, setCameraProducts] = useState([]);

  useEffect(() => {
    const fetchCameraProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`);
        
        const cameraProductsData = response.data.filter(product => product.category === "Camera");
        setCameraProducts(cameraProductsData);
      } catch (error) {
        console.error('Error fetching camera products:', error);
      }
    };

    fetchCameraProducts();
  }, []);

  return (
    <div>
      <h1>Camera Products</h1>
      <div className="camera-list">
        {cameraProducts.map(product => (
          <div key={product._id} className="camera-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirPodsScreen;
