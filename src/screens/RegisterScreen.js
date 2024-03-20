import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../componant/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { addRegisterUser } from "../Slices/userSlice";
import axios from "axios";
import LoginPageWithGoogle from "../componant/googleAuthLogin";
import { registerUserHandler } from "../service/user";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.user.userDetails);

  // console.log(userRegister," the details to check ")
  const { loading, error, userInfo } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("plz fill up the below field");
    } else if (password !== confirmpassword) {
      setMessage("password doesn't match");
    } else {
      const obj = {
        name,email,password
      }
      
      const { data } = await registerUserHandler({name,email,password,role:'user'})

      const { token, ...other } = data;
      localStorage.setItem("userInfo", JSON.stringify(other));
      localStorage.setItem("token", token);

      dispatch(addRegisterUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
     navigate("/");
    }
  }, [userInfo]);

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        < LoginPageWithGoogle textOfbutton='Signup with Google'/>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={"/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
