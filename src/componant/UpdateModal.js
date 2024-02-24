import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProductAdd } from "../actions/productOperationActions";

const validate = (values) => {
  const errors = {};
  if (!values.productName) {
    errors.productName = "Required";
  }
  if (!values.productPrice) {
    errors.productPrice = "Required";
  } else if (values.productPrice <= 0) {
    errors.productPrice = "Price must be a positive number";
  }
  if (!values.productCategory) {
    errors.productCategory = "Required";
  }
  if (!values.productBrandName) {
    errors.productBrandName = "Required";
  }
  return errors;
};

const UpdateModal = ({ show, handleClose, entity }) => {
  const dispatch = useDispatch();
  const [imgurl, setImgurl] = useState("");
  const formik = useFormik({
    initialValues: {
      productName: entity ? entity.name : "",
      productPrice: entity ? entity.price : "",
      image: "",
      productCategory: entity ? entity.category : "",
      productDescription: entity ? entity.description : "",
      userId: entity ? entity._id : "",
      productBrandName: entity ? entity.brand : "",
      productCountInStock: entity ? entity.countInStock : "",
    },
    validate,
    onSubmit: async (values) => {
      const obj = {
        name: values.productName,
        price: values.productPrice,
        image: imgurl,
        category: values.productCategory,
        description: values.productDescription,
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
              value={formik.values.productName}
              name="productName"
              className="form-control border border-dark rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.productName && formik.touched.productName && (
              <div className="text-danger">{formik.errors.productName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Price:</label>
            <input
              min="0"
              type="number"
              id="productPrice"
              value={formik.values.productPrice}
              name="productPrice"
              className="form-control border border-dark rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.productPrice && formik.touched.productPrice && (
              <div className="text-danger">{formik.errors.productPrice}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Add Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="p-3 border border-dark rounded form-control-file"
              onChange={(e) => {
                formik.setFieldValue("image", e.currentTarget.files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(e.currentTarget.files[0]);
                reader.onload = () => {
                  setImgurl(reader.result);
                };
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Category:</label>
            <select
              id="productCategory"
              name="productCategory"
              value={formik.values.productCategory}
              className="form-control border border-dark rounded p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Category</option>
              <option value="electronics">Camera</option>
              <option value="clothing">Laptops</option>
              <option value="home">Mobile Phone</option>
            </select>
            {formik.errors.productCategory && formik.touched.productCategory && (
              <div className="text-danger">{formik.errors.productCategory}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formik.values.productDescription}
              className="form-control border border-dark rounded"
              rows="4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formik.values.userId}
              className="form-control border border-dark rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.userId && formik.touched.userId && (
              <div className="text-danger">{formik.errors.userId}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productBrandName">Brand Name:</label>
            <input
              type="text"
              id="productBrandName"
              name="productBrandName"
              value={formik.values.productBrandName}
              className="form-control border border-dark rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.productBrandName && formik.touched.productBrandName && (
              <div className="text-danger">{formik.errors.productBrandName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productCountInStock">Count in Stock:</label>
            <input
              type="number"
              min="0"
              id="productCountInStock"
              name="productCountInStock"
              value={formik.values.productCountInStock}
              className="form-control border border-dark rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

export default UpdateModal;
