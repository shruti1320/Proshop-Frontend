import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUserProfileHandler } from "../service/user";
//import { setUserDetail } from "../store/userSlice";
//import apiClient from "../service/service";
//import socket from "../utils/socket";
//import { endLoader, startLoader } from "src/store/loaderSlice";

const PublicContainer = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    checkAuth();

  }, []);
  
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = jwtDecode(localStorage.getItem("token"));
        //console.log(userData, 'proshop user data');

        const user = await getUserProfileHandler()
       
 
        if (user?.data?.role == "admin") {
          navigate("/admin");
        } 
        else {
          navigate(previousPath);
        }


      }
    } catch (error) {
     
      console.log("error in ROUTE", error);
    }
  };

  return (
    <>
      {children}

    </>
  );
};

export default PublicContainer;