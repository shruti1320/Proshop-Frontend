import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";


// second logic for role routing
import React, { Fragment } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { getAllowedRoutes } from "./intersection";
import { PrivateRoutesConfig } from "./privateRoutesConfing";
//import { TopNav } from "components/common";
//import MapAllowedRoutes from "routes/MapAllowedRoutes";
const userDatainf = jwtDecode(localStorage.getItem("proshopToken"));
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


export function PrivateRoutes() {
  const match = useRouteMatch("/app");
  let allowedRoutes = [];

  if (userDatainf) {
    allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
  } else {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {/* <TopNav routes={allowedRoutes} path={match.path} className="bg-white" />
      <MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound /> */}
    </Fragment>
  );
}


// useRouteMatch in reacct router dom
// The useRouteMatch hook attempts to match the current URL in the same way that a <Route> would. It’s mostly useful for getting access to the match data without  actually rendering a <Route>.


