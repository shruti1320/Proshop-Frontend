import { Modal } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MerchantPageProductDetails from "./index";

const MerchantInfo = () => {
  
 
  
  const location = useLocation();
  var state = location.search;
  state = state.split('=')
 
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  console.log(userInfo,'merchant page');
  
 
  return (
    <div>
      <h4>Welcom {userInfo?.name}</h4>
      <h2>Product Details</h2>
      <MerchantPageProductDetails/>
    </div>
  )
}

export default MerchantInfo