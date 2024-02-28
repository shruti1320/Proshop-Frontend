import { React, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { listProducts, removeProductFromList } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import FilterOffCanvas from "../componant/FilterOffCanvas";
import { existedCartItem } from "../Slices/cartSlice";
import AllProductForm from "../componant/AllProductForm";
import axios from "axios";

export default function AllProductsScreen() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList);
  const { loading, error, products } = item;

  const cartItems = useSelector((state) => state.cart.cartList.cartItems);
  console.log(cartItems, "=========== ct");

  const removeFromProduct = async (id) => {
    try {
      toast("Product removed  from the list")
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
      );

      dispatch(removeProductFromList(id));
    } catch (error) {
      console.log("error in removing products", error);
    }
  };

  useEffect(() => {
    dispatch(existedCartItem());
    dispatch(listProducts());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  
  return (
    <Row>
      <Col>
        <Row className="align-items-center ">
          <Col md={4}>
            <FilterOffCanvas />
          </Col>
          <Col md={4}>
            <h1>All Products</h1>
          </Col>
          <Col md={4}>
            <Button
              type="button"
              variant="dark"
              className="m-2 border border-light float-right"
              onClick={() => {
                handleShow();
                setSelectedProduct({});
              }}
            >
              Add Product
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error && products.length === 0 ? (
          <Message>There is no product.</Message>
        ) : (
          <>
            <AllProductForm />
          </>
        )}
      </Col>
    </Row>
  );
}
