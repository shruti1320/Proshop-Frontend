import { React, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { addToCart, existedCartItem } from "../Slices/cartSlice";
import { jwtDecode } from "jwt-decode";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  console.log("productList",productList);
  const { loading, error } = productList;
  const products = productList.products;
  useEffect(() => {
    dispatch(listProducts());
    dispatch(existedCartItem());
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  // const qtyOnChange=(product)=>{
  //   dispatch()
  // }
  const userData = jwtDecode(localStorage.getItem("proshopToken"));
      console.log(userData,'token user data from private');
  return (
    <>
      <h1>latest products</h1>
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
