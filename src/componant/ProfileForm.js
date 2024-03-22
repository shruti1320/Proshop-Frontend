import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import Joi from "@hapi/joi";
import ProfileNameField from "./profile/profileField/ProfileNameField";
import ProfileEmailField from "./profile/profileField/ProfileEmailField";
import ProfilePasswordField from "./profile/profileField/ProfilePasswordField";
import ProfileConfirmPasswordField from "./profile/profileField/ProfileConfirmPasswordField";
import { updateUserProfile } from "../Slices/userSlice";
import { updateUserProfileByIdHandler } from "../service/user";
// import { handleUpdateUser } from "../utils/socket";
import { validateFormValues } from "./joi_validation/validation";
import FAQS from "./profile/sidebarAndFaqs/FAQ'S";

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
        const { data } = await updateUserProfileByIdHandler({id:userInfo._id, name:values.name, email:values.email, password : values.password})
        
        // if(data){
        //   handleUpdateUser(data)
        // }
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
