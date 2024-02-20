import { React, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componant/Product";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../componant/Loader";
import Message from "../componant/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // console.log("product list", productList);
  const { loading, error, products } = productList;
  // console.log("products ", products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {/* product && product.map() */}
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
