import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../componant/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../Slices/userSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import axios from "axios";
import LoginPageWithGoogle from "../componant/googleAuthLogin";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const userLogin = useSelector((state) => state.user.userDetails);

  const { loading, error } = userLogin;

  // Get the previous location from local storage

 

  const redirect = JSON.parse(localStorage.getItem("searchQuery")) || "/";


  console.log(redirect, " to check  ");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/login`,
          { email, password }
        );
        const name = data.name;
        const _id = data._id;
        const role = data.role;

        dispatch(addLoginUser({ name, email, password, _id, role }));

        const { token, ...other } = data;

        localStorage.setItem("userInfo", JSON.stringify(other));
        localStorage.setItem("token", token);

        navigate(redirect);
      } catch (error) {
        setMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        <LoginPageWithGoogle textOfbutton="Login with Google" />
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
