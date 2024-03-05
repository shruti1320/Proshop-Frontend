import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../Slices/cartSlice";
import "../scss/IncrementDecrementBtn.scss";
import axios from "axios";

const IncrementDecrementBtn = ({ minValue, maxValue = 100, counts, productId, userId }) => {
  const [count, setCount] = useState(counts);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleIncrementCounter = async () => {
    if (count < maxValue) {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        // console.log("New count:", newCount);
        return newCount;
      });
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/updateqty`,
          {
            userId: userInfo._id,
            productId,
            newQuantity: count + 1, // Use count + 1 here to send the updated count
          }
        );
        dispatch(updateCart(response?.data?.changedItems));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleDecrementCounter = async () => {
    if (count > minValue) {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        // console.log("New count:", newCount);
        return newCount;
      });
  
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_PATH}/api/users/updateqty`,
          {
            userId: userInfo._id,
            productId,
            newQuantity: count - 1, // Use count - 1 here to send the updated count
          }
        );
        dispatch(updateCart(response?.data?.changedItems));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="btn-group w-50 mt-2">
      <button className="increment-btn pe-2" onClick={handleIncrementCounter}>
        <span>+</span>
      </button>
      <p className="m-auto">{count}</p>
      <button className="decrement-btn pe-2" onClick={handleDecrementCounter}>
        <span>-</span>
      </button>
    </div>
  );
};

export default IncrementDecrementBtn;
