import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiHeart } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { removeFromFavourite } from "../Slices/favouriteSlice";

const HeartIcon = ({ product }) => {
  // console.log("product", product);
  const [isClicked, setIsClicked] = useState(product.isFavourite);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  // console.log(product.isFavourite," checking the field of fav ---------------------------------- ")
  const handleClick = async () => {
    setIsClicked(!isClicked);
    toast.success("Product added to wishlist"); // Toggle the clicked state
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


  const removeFromFavouriteList = async (productId) => {
    setIsClicked(!isClicked);
    try {
      toast("Product removed from wishlist")
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/removeFav`,
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
      dispatch(removeFromFavourite({productId:productId}))
    } catch (error) {
      toast("Error in removing product from wishlist");
      console.log(error, " error ");
    }
  };

  return (
    <div>
      {isClicked ? (
        <FavoriteIcon className="heart-icon" style={{ color: "red" }} onClick={removeFromFavouriteList} />
      ) : (
        <FavoriteBorderIcon className="heart-icon" onClick={handleClick} />
      )}
    </div>
    
  );
};

export default HeartIcon;
