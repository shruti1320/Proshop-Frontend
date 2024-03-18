import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../componant/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../Slices/userSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import axios from "axios";
import LoginPageWithGoogle from "../componant/googleAuthLogin";
import { addToCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { listProductDetail } from "../Slices/productSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.userDetails);
  const { loading, error, userInfo } = userLogin;
  const productId = JSON.parse(localStorage.getItem("searchQuery"))?.split("/")[2];

  useEffect(() => {
    if (productId) dispatch(listProductDetail(productId));
  }, [dispatch, productId]);

  const navigation = async () => {
    if (productId) {
      try {
        const token = localStorage.getItem("token");
        const qty = localStorage.getItem("qty");
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
          { userId: userInfo._id, productId, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart(response?.data?.product));
      } catch (error) {
        console.log("Error:", error);
      }
      navigate("/cart");
    }
    else{
      navigate("/")
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/login`,
          { email, password }
        );
        const { token, ...other } = data;
        dispatch(addLoginUser({ ...other }));
        localStorage.setItem("userInfo", JSON.stringify(other));
        localStorage.setItem("token", token);
        navigation(other);
      } catch (error) {
        toast.error(
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
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        {!showPassword && (
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
        )}
        <Form.Group controlId="showPasswordCheckbox" className="mt-3">
          <Form.Check type="checkbox" label="Forgot Password" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {showPassword ? <span>Reset Password</span> : <span>Sign In</span>}
        </Button>
        <LoginPageWithGoogle textOfbutton="Login with Google" />
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
