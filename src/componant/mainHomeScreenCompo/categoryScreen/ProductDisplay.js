import React, { useState, useEffect, useCallback } from "react";

import { Button, Card, Container, Row } from "react-bootstrap";
import HeartIcon from "../../HeartIcon";
import { Link } from "react-router-dom";
import { addToCart } from "../../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Rating from "../../Rating";
import "./Product_Display.scss";
import Example from "../../HomeScreen/filter/Filter";
import { GetProducthandler, addCartHandlerService } from "../../../service/product";

const ProductDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const selectedBrand = useSelector((state) => state.product.selectedBrand);
  const selectedRating=useSelector((state)=>state.product.selectedRating);

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await  GetProducthandler()

      let filteredProducts = response.data.filter((product) => {
       
        return (
          product.category === category &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
        );
      });

      if ( selectedBrand!==null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === selectedBrand
          );
          console.log("selectedbrandddd",selectedBrand)
      }

      if(selectedRating!==null){
        filteredProducts=filteredProducts.filter(
          (product)=>product.rating===selectedRating
        );

      }
      setProducts(filteredProducts?.length > 0 ? filteredProducts : response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [category, priceRange, selectedBrand,selectedRating]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToCart = async (productId) => {
    try {
      const data = {
        userId: userInfo._id,
        productId,
        quantity: 1,
      }
     
      const response = await addCartHandlerService(data)
      
      dispatch(addToCart(response?.data?.product));
      toast.success("Product added to cart");
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  };

  const handleFilterButtonClick = useCallback((data) => {
    setPriceRange(data);
  }, []);

  return (
    <Container>
      <h1>{category} Products</h1>
      <Example handleFilter={handleFilterButtonClick} />
      <Row>
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <Card
              className="my-3 p-3 rounded "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <div
                className="product-image-container"
                style={{ position: "relative", flex: "1 0 auto" }}
              >
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Link>
                <HeartIcon product={product} />
                {hovered && (
                  <Button
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                    }}
                    onClick={() => {
                      handleAddToCart(product._id);
                    }}
                    variant="dark"
                    as={Link}
                    block
                    className="w-100 p-1 opacity-75"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
              <Card.Body style={{ flex: "0 0 auto" }}>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div className="my-3"></div>
                  {product.rating} from {product.numReviews} review
                </Card.Text>
                <Card.Text as="div">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDisplay;
