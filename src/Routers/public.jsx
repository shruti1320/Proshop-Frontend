import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("previousPath", previousPath, location.pathname);
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = jwtDecode(localStorage.getItem("token"));

        // eslint-disable-next-line no-debugger
       // socket.emit("login", userData?._id);
       // dispatch(startLoader());
        const user = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/${userData?._id}`);
        //dispatch(endLoader());
        if (user) {
          //dispatch(setUserDetail(user?.data));
        }
        if (user?.position === "superAdmin") {
          navigate("/superAdmin");
        } else {
          navigate("/");
        }

        // if (previousPath === "/notfound" && location.pathname !== "/notfound") {
        //   if (user?.position === "superAdmin") {
        //     navigate("/superAdmin");
        //   } else {
        //     navigate("/");
        //   }
        // } 
      }
    } catch (error) {
     // dispatch(endLoader());
      console.log("error in ROUTE", error);
    }
  };

  return (
    <>
      {children}
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          position: "inherit",
          bottom: "0",
          right: "0",
          width: "100%",
          backdropFilter: "blur(50px)",
          background: "rgba(255, 255, 255)",
        }}
      >
        © {new Date().getFullYear()} Agrippon. Pro Practice Solutions Company.
        All Rights Reserved.
      </div>
    </>
  );
};

export default PublicContainer;
