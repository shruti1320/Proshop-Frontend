import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import Joi from "@hapi/joi";
import ProfileNameField from "./profile/ProfileNameField";
import ProfileEmailField from "./profile/ProfileEmailField";
import ProfilePasswordField from "./profile/ProfilePasswordField";
import ProfileConfirmPasswordField from "./profile/ProfileConfirmPasswordField";
import { updateUserProfile } from "../Slices/userSlice";
import FAQS from "./ProfileScreenMicro/FAQ'S";
import { validateFormValues } from "./joi_validation/validation";

// Joi schema for validation
// const schema = Joi.object({
//   name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required().messages({
//     "string.pattern.base": "Invalid name: Only alphabets allowed",
//     "any.required": "Name is required",
//   }),
//   email: Joi.string().email({ tlds: false }).required().messages({
//     "string.email": "Invalid email address",
//     "any.required": "Email is required",
//   }),
//   password: Joi.string().required().messages({
//     "any.required": "Please enter password",
//   }),
//   confirmPassword: Joi.string()
//     .valid(Joi.ref("password"))
//     .required()
//     .messages({
//       "any.required": "Please confirm password",
//       "any.only": "Passwords must match",
//     }),
// });

const ProfileForm = ({ userInfo, dispatch }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInfo ? userInfo.name : "",
      email: userInfo ? userInfo.email : "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => validateFormValues(values),
    
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
      <FAQS />
    </div>
  );
};

export default ProfileForm;
