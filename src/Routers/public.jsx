import { useEffect, useState } from "react";



const PublicContainer = ({ children }) => {
 
  useEffect(() => {
    checkAuth();
   
  }, []);
  
  const checkAuth = async () => {
    try {
      //const token = localStorage.getItem("accessToken");
      const token=JSON.parse(localStorage.getItem("proshopToken"));
      
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
