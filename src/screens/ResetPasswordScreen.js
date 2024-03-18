// ResetPasswordScreen.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../scss/ResetPasswordScreen.scss";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetRequested, setResetRequested] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Implement password reset functionality here
    // For this example, I'll just display a message
    setMessage(`Password reset requested for ${email}`);
    setResetRequested(true);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <h2>Reset Password</h2>
        {resetRequested ? (
          <p>{message}</p>
        ) : (
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="formBasicEmail" className="m-4">
             
              <Form.Text className="text-muted mt-4">
                We'll send a password reset link to this email.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="m-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className="m-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
