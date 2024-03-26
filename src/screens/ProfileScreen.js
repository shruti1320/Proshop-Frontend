import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../Slices/userSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../componant/ProfileForm";
import SideBar from "../componant/profile/sidebarAndFaqs/SideBar";


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
      <Col md={4}>
        <SideBar />
      </Col>

      <Col
        md={7}
        style={{ border: "2px solid white" }}
        className="bg-light ms-3"
      >
        <h1>USER PROFILE</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {userInfo && <ProfileForm userInfo={userInfo} dispatch={dispatch} />}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
