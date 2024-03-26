
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MerchantPageProductDetails from "./index";

const MerchantInfo = () => {
  
  const location = useLocation();
  var state = location.search;
  state = state.split('=')
  console.log(state,'state')
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  return (
    <div>
      <h4>Welcom {userInfo?.name}</h4>
      <h2>Product Details</h2>
      <MerchantPageProductDetails/>
    </div>
  )
}

export default MerchantInfo