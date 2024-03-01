import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
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
  console.log("previousPath", previousPath, location.pathname);
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = jwtDecode(localStorage.getItem("token"));
        console.log(userData, 'proshop user data');
        
        const user = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        console.log('get user data', user)
        //dispatch(endLoader());
        if (user?.data?.role=='merchant') {
          navigate('/merchant') 
        }
        else if (user?.data?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        
      }
    } catch (error) {
      // dispatch(endLoader());
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
