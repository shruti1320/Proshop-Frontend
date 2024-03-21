import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import ProductRow from "./ProductRow";
const AllProductForm = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList, shallowEqual);
  const { products } = item;

  return (
    <div>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product._id}>
            <ProductRow product={product} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default React.memo(AllProductForm);
