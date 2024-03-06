import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../Slices/userSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import ProfileForm from "../componant/ProfileForm";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, userInfo, error } = userDetails;

  useEffect(() => {
    dispatch(loggedUserDetails());
  }, [dispatch]);

  return (
    <Row>
      <Col md={6}>
        <h1>USER PROFILE</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {userInfo && <ProfileForm userInfo={userInfo} dispatch={dispatch} />}
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};
export default ProfileScreen;
