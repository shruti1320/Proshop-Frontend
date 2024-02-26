import { React, useEffect, useState } from "react";
import { Col, Row, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts, removeProductFromList } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import ProductModal from "../componant/Modal";
import Loader from "../componant/Loader";
import axios from "axios";
import { existedCartItem } from "../Slices/cartSlice";
import toast from "react-hot-toast";

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
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Row>
      <Col>
        <Row className="align-items-center ">
          <Col>
            <h1>All Products</h1>
          </Col>
          <Col>
            <Button
              type="button"
              variant="dark"
              className="m-2 border border-light float-right"
              onClick={handleShow}
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
          <ListGroup variant="flush">
            {products?.map((entity) => (
              <ListGroup.Item key={entity._id}>
                <Row>
                  <Col md={1}>
                    <Image src={entity.image} alt={entity.name} fluid rounded />
                  </Col>
                  <Col md={8} className="p-3">
                    <Link to={`/product/${entity.product}`}>{entity.name}</Link>
                  </Col>
                  <Col md={2} className="p-3">
                    {entity.price}
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromProduct(entity._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <ProductModal show={showModal} handleClose={handleClose} />
      </Col>
    </Row>
  );
}
