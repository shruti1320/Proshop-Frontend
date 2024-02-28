import React from "react";
import { Col, Row, Image, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductListItem = ({ product, handleShow, removeFromProductList }) => {
  return (
    <ListGroup.Item key={product._id}>    
    <Row>
    <Col md={1}>
    <Image src={product.image} alt={product.name} fluid rounded />
    </Col>
        <Col md={7} className="p-3">
          <Link to={`/product/${product.product}`}>{product.name}</Link>
        </Col>
        <Col md={2} className="p-3">
          {product.price}
        </Col>
        <Col md={1}>
          <Button
            type="button"
            variant="light"
            onClick={() => handleShow(product)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
        </Col>
        <Col md={1}>
          <Button
            type="button"
            variant="light"
            onClick={() => removeFromProductList(product._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ProductListItem;
