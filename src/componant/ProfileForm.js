import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileNameField from "./profile/ProfileNameField";
import ProfileEmailField from "./profile/ProfileEmailField";
import ProfilePasswordField from "./profile/ProfilePasswordField";
import ProfileConfirmPasswordField from "./profile/ProfileConfirmPasswordField";
import { updateUserProfile } from "../Slices/userSlice";
import FAQS from "./ProfileScreenMicro/FAQ'S";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }else if (!/^[a-zA-Z\s]+$/i.test(values.name)) {
    errors.name = "Invalid name: Only alphabets and spaces allowed";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};

const ProfileForm = ({ userInfo, dispatch }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInfo ? userInfo.name : "",
      email: userInfo ? userInfo.email : "",
      password: "",
      confirmPassword: "",
    },
    validate,

    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${userInfo._id}`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast("Profile updated successfully.", {
          style: {
            color: "green",
            background: "#cefad0",
            border: "1px solid green",
          },
        });

        dispatch(
          updateUserProfile({
            _id: userInfo._id,
            name: values.name,
            email: values.email,
            password: values.password,
            token: localStorage.getItem("token"),
          })
        );
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  return (
    <div>

    <Form onSubmit={formik.handleSubmit} noValidate>
      <ProfileNameField formik={formik} />
      <ProfileEmailField formik={formik} />
      <ProfilePasswordField formik={formik} />
      <ProfileConfirmPasswordField formik={formik} />
      <Button type="submit" variant="primary" className="mt-3">
        UPDATE
      </Button>
    </Form>
    <FAQS/>
    </div>
    
  );
};

export default ProfileForm;
