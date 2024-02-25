import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProductAdd } from "../actions/productOperationActions";
import "../scss/Modal.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import updateUser from "../Slices/productSlice"

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

const ProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  const [imgurl, setImgurl] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: product?.name || "",
      productPrice: product?.price || "",
      image: "",
      productCategory: product ? product.category : "",
      productDescription: product ? product.description : "",
      userId: product ? product._id : "",
      productBrandName: product ? product.brand : "",
      productCountInStock: product ? product.countInStock : "",
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
    if (show && product) {
      formik.resetForm({
        values: {
          productName: product.name || "",
          productPrice: product.price || "",
          productCategory: product.category || "",
          productDescription: product.description || "",
          userId: product._id || "",
          productBrandName: product.brand || "",
          productCountInStock: product.countInStock || "",
        },
      });
      setImgurl(product.image || "");
    }
  }, [show, product]);

  const params = useParams();
  const updatedproducts=useSelector((state)=>state.product.productList);
  const existingUser = updatedproducts.filter(product => product.id === params.id);
  const{productName,productPrice,productCategory,productdescription,userId,productBrandName,productCountInStock}=existingUser[0];
  const [values, setValues] = useState({
   productName,productPrice,productCategory,productdescription,userId,productBrandName,productCountInStock
  });



  const handleEdit = () => {
    setValues({productName:"",productPrice:"",productCategory:"",productdescription:"",userId:"",productBrandName:"",productCountInStock:""});
    dispatch(updateUser({
      userId: params.id,
      productName:productName,
       productPrice:productPrice,
       productCategory:productCategory,
       productdescription:productdescription,
       productBrandName:productBrandName,
       productCountInStock:productCountInStock,
    }));
  }




  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        formik.resetForm();
      }}
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>ADD PRODUCT DETAILS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formik.values.productName}
              onChange={(e) => setValues({ ...values, productName: e.target.value })}
              initialValues={formik.values.productName}
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
              value={formik.values.productPrice}
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
              name="productImage"
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
          <Button type="submit" variant="primary" onClick={handleEdit}>
            Add Product
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default ProductModal;
