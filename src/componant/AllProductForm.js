import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { listProductRemove } from "../actions/productOperationActions";
import ProductListItem from "../screens/ProductListItem";
import UpdateModal from "./UpdateModal";

const AllProductForm = () => {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.product.productList, shallowEqual);
  const { products } = item;

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const removeFromProductList = async (id) => {
    toast("Product removed from the list");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
    );
    dispatch(listProductRemove(id, products));
  };

  return (
    <div>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ProductListItem
            key={product._id}
            product={product}
            handleShow={handleShow}
            removeFromProductList={removeFromProductList}
          />

        ))}
      </ListGroup>
      <UpdateModal
        show={showModal}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </div>
  );
};

export default AllProductForm;
