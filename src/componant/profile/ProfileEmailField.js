import React from "react";
import { Form } from "react-bootstrap";

const ProfileEmailField = ({ formik }) => (
  <Form.Group controlId="email">
    <Form.Label>Email Address</Form.Label>
    <Form.Control
      type="email"
      placeholder="Enter Email"
      {...formik.getFieldProps("email")}
      style={{
        border: formik.touched.email && formik.errors.email ? "1px solid red" : "",
      }}
    />
    {formik.touched.email && formik.errors.email && (
      <div className="text-danger">{formik.errors.email}</div>
    )}
  </Form.Group>
);

export default ProfileEmailField;
