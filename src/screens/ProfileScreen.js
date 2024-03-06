import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../Slices/userSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { updateUserProfile } from "../Slices/userSlice";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { removeUser } from "../Slices/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FAQS from "../componant/ProfileScreenMicro/FAQ'S";
import SideBar from "../componant/ProfileScreenMicro/SideBar";
import ProfileForm from "../componant/ProfileForm";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};


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
