import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { loggedUserDetails } from "../Slices/userSlice";
import { existedCartItem } from "../Slices/cartSlice";
// import { updateUserProfile } from "../actions/userAction";
import {
  getUserDetails,
  updateUserProfile,
  updateUserDetails,
} from "../Slices/userSlice";
import axios from "axios";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, userInfo } = userDetails;

  console.log(userInfo, " user info ");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userUpdateProfile = useSelector((state) => state.user.userDetails);
  const { success, error } = userUpdateProfile;

  console.log(userInfo._id, " outsidde tye effect ");

  useEffect(() => {
    dispatch(existedCartItem());
    dispatch(loggedUserDetails());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push("/login");
  //   } else {
  //     if (userInfo && Object.keys(userInfo).length > 0) {
  //       console.log("user id inside the effect  : ", userInfo._id);
  //       dispatch(getUserDetails(userInfo._id));
  //       // setName(userInfo.name);
  //       // setEmail(userInfo.email);
  //     } else {
  //       setName(userInfo.name);
  //       setEmail(userInfo.email);
  //     }
  //   }
  // }, [history, userInfo, dispatch]);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    console.log(token, "  token from slice ");
    return token ? token : null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("password doesn't match");
    } else {
      setMessage(null);
      const authToken = getAuthToken();
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${userInfo._id}`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data, " from slice in application ");

      dispatch(
        updateUserProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          token:authToken,
        })
      );

      console.log(" userInfo after updation ", userInfo);
    }
  };
  const x = userDetails.success;
  console.log(x, " succes value coming from backendddd");

  return (
    <Row>
      <Col md={3}>
        <h1>USER PROFILE</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">PROFILE UPDATED</Message>}
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
