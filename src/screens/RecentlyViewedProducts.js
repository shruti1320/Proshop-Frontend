import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { singleProductgetHandler } from "../service/product";
import { Padding } from "@mui/icons-material";

const RecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const recentlyViewedIds =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Fetch product details based on IDs
    const fetchProducts = async () => {
      try {
        const productRequests = recentlyViewedIds.map(async (id) =>
          await singleProductgetHandler(id)
        );
        const responses = await Promise.all(productRequests);
        const productsData = responses.map((response) => response.data);
        if (isMounted) {
          setRecentlyViewedProducts(productsData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false when unmounting
    };
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <h2 className="mt-5">Recently Viewed Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel responsive={responsive} infinite={true} draggable={false} >
          {recentlyViewedProducts.map((product) => (
            <div key={product._id}>
              <Card className="mb-3"style={{Padding:"0 20px"}}> 
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
                    <Card.Text as="h3">Out Of Stock</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
