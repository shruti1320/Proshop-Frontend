import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiHeart } from 'react-icons/bi';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HeartIcon = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const handleClick = async () => {
    setIsClicked(!isClicked);
    toast.success("Product added to favourite"); // Toggle the clicked state
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTofavourite`,
        {
          productId: product._id,
          userId: userInfo._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
    } catch (error) {
      console.log("::::::::: error ", error);
    }
  };

  const removeFromFavouriteList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTofavourite`,
        {
          productId: product._id,
          userId: userInfo._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch(error) {
      toast("Error in removing product from wishlist")
      console.log(error, " error ")
    }
  }

  return (
    <div>
      {isClicked ? (
        <BiHeart className="heart-icon" />
      ) : (
        <BiHeart className="heart-icon" onClick={handleClick}></BiHeart>
      )}
    </div>
  );
};

export default HeartIcon;
