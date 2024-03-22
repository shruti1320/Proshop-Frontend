import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfileHandler } from "../service/user";

const PrivateContainer = ({ children, roles }) => {

  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();
  
 
  useEffect(() => {
    checkAuth();
  
  }, [navigate,roles]);

  const checkAuth = async () => {
    try {
      
      const getUserData = await getUserProfileHandler()
    
      const user = getUserData;
      
      setData(getUserData.data);
      
      if (roles.includes(user?.data?.role)) {
        setIsAuthenticated(true);
        if(isAuthenticated)
        {
            if(location.pathname === "/login")
            {
              navigate("/")
            }
        }
      } 
      else{
        navigate("/login")
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