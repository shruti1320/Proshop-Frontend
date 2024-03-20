import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Rating } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const recentlyViewedIds =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Fetch product details based on IDs
    const fetchProducts = async () => {
      try {
        const productRequests = recentlyViewedIds.map((id) =>
          axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`)
        );
        const responses = await Promise.all(productRequests);
        const productsData = responses.map((response) => response.data);
        setRecentlyViewedProducts(productsData);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      }
    };

    fetchProducts();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <h2 className="mt-5">Recently Viewed Products</h2>
      <Carousel responsive={responsive}>
        {recentlyViewedProducts.map((product) => (
          <Col key={product._id}>
            <Card className="mb-3">
              <Link to={`/product/${product._id}`}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div className="my-3"></div>
                  {product.rating} from {product.numReviews} review
                </Card.Text>
                
                {product.countInStock > 0 ? (
                  <Card.Text as="h3">${product.price}</Card.Text>
                ) : (
                  <Card.Text as="h3">Out Of Stock </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Carousel>
    </div>
  );
};

export default RecentlyViewedProducts;
