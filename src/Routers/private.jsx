import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";


const PrivateContainer = ({ children, roles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
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
 
  }, []);

  // checkAuth check token
  const checkAuth = async () => {
    
    try {
      const userData = jwtDecode(localStorage.getItem("proshopToken"));
      console.log(userData,'token user data from private');

      if(userData){
        setIsAuthenticated(true)
      }
      else{
        navigate('/login')
      }
    
     }
      catch (e) {
    
       navigate("/login");
   
     }
  };

  return isAuthenticated  &&  (
    <>
      
        
      {children}
      
    </>
  ) 
 
};

export default PrivateContainer;
