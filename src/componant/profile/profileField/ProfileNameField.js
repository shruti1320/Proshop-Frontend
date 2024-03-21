import React from "react";
import { Form } from "react-bootstrap";

const ProfileNameField = ({ formik }) => (
  <Form.Group controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control
      type="name"
      placeholder="Enter Name"
      {...formik.getFieldProps("name")}
      style={{
        border: formik.touched.name && formik.errors.name ? "1px solid red" : "",
      }}
    />
    {formik.touched.name && formik.errors.name && (
      <div className="text-danger">{formik.errors.name}</div>
    )}
  </Form.Group>
);

export default ProfileNameField;
