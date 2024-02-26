import { React, useEffect, useState } from "react";
import { Col, Row, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts } from "../Slices/productSlice";
import { listProductRemove } from "../actions/productOperationActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import ProductModal from "../componant/Modal";
import Loader from "../componant/Loader";
import FilterOffCanvas from "../componant/FilterOffCanvas";
import { existedCartItem } from "../Slices/cartSlice";

export default function AllProductsScreen() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList);
  const { loading, error, products } = item;

const updatedproducts=useSelector((state)=>state.product.productList);
console.log("updatedproducts",updatedproducts)


  useEffect(() => {
    dispatch(existedCartItem());
    dispatch(listProducts());
  }, [dispatch]);

  const removeFromProductList = (id) => {
    dispatch(listProductRemove(id, products));
  };


  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
            <ListGroup variant="flush">
              {products?.map((entity) => (
                <ListGroup.Item key={entity._id}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={entity.image}
                        alt={entity.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={7} className="p-3">
                      <Link to={`/product/${entity.product}`}>
                        {entity.name}
                      </Link>
                    </Col>
                    <Col md={2} className="p-3">
                      {entity.price}
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          handleShow();
                          setSelectedProduct(entity);
                        }}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromProductList(entity._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ProductModal
              show={showModal}
              handleClose={handleClose}
              product={selectedProduct}
            />
          </>
        )}
      </Col>
    </Row>
  );
}
