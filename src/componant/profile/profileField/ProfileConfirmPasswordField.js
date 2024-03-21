import React from "react";
import { Form } from "react-bootstrap";

const ProfileConfirmPasswordField = ({ formik }) => (
  <Form.Group controlId="confirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Confirm Password"
      {...formik.getFieldProps("confirmPassword")}
      style={{
        border: formik.touched.confirmPassword && formik.errors.confirmPassword ? "1px solid red" : "",
      }}
    />
    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
      <div className="text-danger">{formik.errors.confirmPassword}</div>
    )}
  </Form.Group>
);

export default ProfileConfirmPasswordField;
