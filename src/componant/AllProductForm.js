import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import ProductRow from "../screens/ProductRow";
import UpdateModal from "./UpdateModal";
import { removeProductFromList } from "../Slices/productSlice";

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

  const handleDelete = async (id) => {
    toast("Product removed from the list");
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
    );
    dispatch(removeProductFromList(id, products));
  };

  return (
    <div>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product._id}>
            <ProductRow
              product={product}
              handleEdit={handleShow}
              handleDelete={handleDelete}
            />
          </ListGroup.Item>
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
