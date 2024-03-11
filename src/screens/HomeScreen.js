import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { cartlist, existedCartItem } from "../Slices/cartSlice";
import ProshopFAQ from "../componant/ProshopFAQ";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  console.log("productList", productList);
  const { loading, error } = productList;
  const products = productList.products;

  useEffect(() => {
    // dispatch(existedCartItem());
    dispatch(listProducts());
    dispatch(cartlist());
  }, [dispatch]);
  console.log("products", products);

  // State to hold products with countInStock less than 5
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [show , setShow ]  =  useState(true);

  useEffect(() => {
    if (products) {
      const lowStock = products.filter((pd) => pd.countInStock < 5);
      setLowStockProducts(lowStock);
    }
  }, [products]);

  return (
    <>
      {/* Display message for low stock products */}
      {lowStockProducts.length > 0 && (
       <div>  
       {lowStockProducts.map((product) => (
         <Message variant="danger" key={product._id} onClose={() => setShow(false)}>
           {product.name} is less than 5 in stock.
         </Message>
       ))}
       </div>
       
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((pd) => (
            <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pd} />
            </Col>
          ))}
        </Row>
        
      )}
    </>
  );
};

export default HomeScreen;
