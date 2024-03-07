import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const PrivateContainer = ({ children, roles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({});
  
  const style = {
    position: "relative",
    maxWidth: 500,
    width: "auto",
    margin: "1.75rem auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 3,
  };

  useEffect(() => {
    checkAuth();
  
  }, [navigate,roles]);

  
  const token=localStorage.getItem("token")
  const checkAuth = async () => {
    try {
      
      const getUserData = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
    
      const user = getUserData;
      
      setData(getUserData.data);
      
   
      console.log("roles",roles);
     
      if (roles.includes(user?.data?.role)) {
        setIsAuthenticated(true);
      } 
      else{
        navigate("/")
      }
    } catch (e) {
      
     
      console.log("error: ", e);
    }
  };

  if(isAuthenticated){
    return (
      <>
      
  
        {children}
        
       
      </>
      
  
    ) 
  }
  else{
   return (
    <>Something went wrong</>
   )
  }
 
};

export default PrivateContainer;
