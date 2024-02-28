import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { loggedUserDetails } from "../Slices/userSlice";
import { existedCartItem } from "../Slices/cartSlice";
import { updateUserProfile } from "../Slices/userSlice";
import { useFormik } from "formik";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
   
  if (!values.password) {
    errors.password = "Please enter password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};


const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, userInfo, success, error } = userDetails;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(existedCartItem());
    dispatch(loggedUserDetails());
  }, [dispatch]);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const formik = useFormik ({
    enableReinitialize: true,
    initialValues: {
      name: userInfo ? userInfo.name : "",
      email: userInfo ? userInfo.email : "",
      password: "",
      confirmPassword: "",
    },
    validate,

    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${userInfo._id}`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        localStorage.setItem("userInfo", JSON.stringify(data));

        dispatch(
          updateUserProfile({
            _id: userInfo._id,
            name: values.name,
            email: values.email,
            password: values.password,
            token: localStorage.getItem("token"),
          })
        );
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });


  return (
    <Row>
      <Col md={3}>
        <h1>USER PROFILE</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">PROFILE UPDATED</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={formik.submitHandler} novalidate>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              {...formik.getFieldProps("name")}
              className={formik.touched.name && formik.errors.name ? "input-error" : ""}
            ></Form.Control>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...formik.getFieldProps("email")}
              className={formik.touched.email && formik.errors.email ? "input-error" : ""}
            ></Form.Control>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
             required
              type="password"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
              style={{
                border: formik.touched.password && formik.errors.password ? "1px solid red" : ""
              }}
            ></Form.Control>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...formik.getFieldProps("confirmPassword")}
              style={{
                border: formik.touched.confirmPassword && formik.errors.confirmPassword ? "1px solid red" : ""
              }}
            ></Form.Control>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-danger">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            UPDATE
          </Button>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
