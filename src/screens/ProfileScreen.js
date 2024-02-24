import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { updateUserProfile } from "../actions/userAction";
import { getUserDetails } from "../Slices/userSlice";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, userInfo } = userDetails;

  console.log( userInfo, " user info ")

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error } = userUpdateProfile;

  console.log(userInfo._id, " ouytsidde tye effect ")

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!(userInfo && Object.keys(userInfo).length > 0)) {
        console.log("user id inside the effect  : ", userInfo._id)
        dispatch(getUserDetails("profile"));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("password doesn't match");
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>USER PROFILE</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">PROFILE UPDATED</Message>}
        {console.log(error, "error in profilescreen")}
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
            UPDATE
          </Button>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
