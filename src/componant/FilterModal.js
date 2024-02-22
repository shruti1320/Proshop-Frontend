import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProductAdd } from "../actions/productOperationActions";
import "../scss/Modal.scss";
import axios from "axios";
const validate = (values) => {
  const errors = {};
  if (!values.productName) {
    errors.productName = "Required";
  }
  if (!values.productPrice) {
    errors.price = "Required";
  } else if (values.productPrice <= 0) {
    errors.price = "Price must be a positive number";
  }
  if (!values.productCategory) {
    errors.productCategory = "Required";
  }
  if (!values.userId) {
    errors.userId = "Required";
  }
  if (!values.productBrandName) {
    errors.productBrandName = "Required";
  }

  return errors;
};

const ProductModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [imgurl, setImgurl] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      image: "",
      productCategory: "",
      productdescription: "",
      userId: "",
      productBrandName: "",
      productCountInStock: "",
    },
    validate,

    onSubmit: async (values) => {
      const obj = {
        name: values.productName,
        price: values.productPrice,
        image: imgurl,
        category: values.productCategory,
        description: values.productdescription,
        _id: values.userId,
        brand: values.productBrandName,
        countInStock: values.productCountInStock,
      };

      dispatch(listProductAdd(obj));

      handleClose(); 
    },

    
  });


  useEffect(() => {
    if (show) {
      formik.resetForm();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>UPDATE PRODUCT DETAILS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productName")}
            />
            {formik.errors.productName && formik.touched.productName ? (
              <div className="text-danger">{formik.errors.productName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Price:</label>
            <input
              min="0"
              type="number"
              id="productPrice"
              name="productPrice"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productPrice")}
            />
            {formik.errors.price && formik.touched.price ? (
              <div className="text-danger">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="image">Add Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="p-3 border border-dark rounded form-control-file"
              onChange={(e) => {
                const image = e.target.files[0];
                formik.setFieldValue("image", image);
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                  setImgurl(reader.result); // This will set imgurl to a data URL
                };
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Category:</label>
            <select
              id="productCategory"
              name="productCategory"
              className="form-control border border-dark rounded p-2"
              style={{ padding: "inherit" }}
              {...formik.getFieldProps("productCategory")}
            >
              <option value="">Category</option>
              <option value="electronics">Camera</option>
              <option value="clothing">Laptops</option>
              <option value="home">Mobile Phone</option>
            </select>
            {formik.errors.productCategory && formik.touched.productCategory ? (
              <div className="text-danger">{formik.errors.productCategory}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productdescription">Description:</label>
            <textarea
              id="productdescription"
              name="productdescription"
              className="form-control border border-dark rounded"
              rows="4"
              {...formik.getFieldProps("productDescription")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("userId")}
            />
            {formik.errors.userId && formik.touched.userId ? (
              <div className="text-danger">{formik.errors.userId}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productBrandName">Brand Name:</label>
            <input
              type="text"
              id="productBrandName"
              name="productBrandName"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productBrandName")}
            />
            {formik.errors.productBrandName &&
            formik.touched.productBrandName ? (
              <div className="text-danger">
                {formik.errors.productBrandName}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productCountInStock">Count in Stock:</label>
            <input
              type="number"
              min="0"
              id="productCountInStock"
              name="productCountInStock"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productCountInStock")}
            />
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Product
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default ProductModal;
