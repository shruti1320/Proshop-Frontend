import React from "react";
import { Form } from "react-bootstrap";

const ProfilePasswordField = ({ formik }) => (
  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Enter Password"
      {...formik.getFieldProps("password")}
      style={{
        border: formik.touched.password && formik.errors.password ? "1px solid red" : "",
      }}
    />
    {formik.touched.password && formik.errors.password && (
      <div className="text-danger">{formik.errors.password}</div>
    )}
  </Form.Group>
);

export default ProfilePasswordField;
