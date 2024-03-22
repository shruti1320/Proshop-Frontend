import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../../../Slices/cartSlice";
import "../../../scss/IncrementDecrementBtn.scss";

import { deleteFromCart } from "../cartFunction/deleteFromCart";
import { updateCartQuantityHandler } from "../../../service/product";

const IncrementDecrementBtn = ({
  minValue,
  maxValue,
  counts,
  productId,
  userId,
}) => {
  const [count, setCount] = useState(counts);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleIncrementCounter = async () => {
    if (count < maxValue) {
      try {
       
        const response = await updateCartQuantityHandler({
          userId: userInfo._id,
          productId,
          newQuantity: count + 1, // Use count + 1 here to send the updated count
        })
        
         console.log("response?.data", response?.data);
        dispatch(updateCart(response?.data?.changedItems));
        setCount((prevCount) => {
          const newCount = prevCount + 1;

          return newCount;
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleDecrementCounter = async () => {
    if (count > minValue) {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        return newCount;
      });

      try {
        const response = await updateCartQuantityHandler({
          userId: userInfo._id,
          productId,
          newQuantity: count - 1, // Use count - 1 here to send the updated count
        })
                
        dispatch(updateCart(response?.data?.changedItems));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const dustbin = async () => {
    await deleteFromCart(userInfo._id, productId, dispatch);
  };

  return (
    <div className="btn-group w-50 mt-2">
      <button className="increment-btn pe-2" onClick={handleIncrementCounter}>
        <span>+</span>
      </button>
      <p className="m-auto">{count}</p>
      <button className="decrement-btn pe-2" onClick={handleDecrementCounter}>
        <span>{count === 1 ?  <i className="fas fa-trash" onClick={dustbin}></i> : "-"}</span>
      </button>
    </div>
  );
};

export default IncrementDecrementBtn;
