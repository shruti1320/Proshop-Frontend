import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { removeFromFavourite } from "../Slices/favouriteSlice";
import { useNavigate } from "react-router";
import { addToWishlistProductHandler, removeWishlistProductHandler } from "../service/product";

const HeartIcon = ({ product }) => {

  const [isClicked, setIsClicked] = useState(product.isFavourite);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (userInfo && Object.keys(userInfo).length > 0) {

      setIsClicked(!isClicked);
      toast.success("Product added to wishlist"); // Toggle the clicked state
      try {
        const token = localStorage.getItem("token");
        const response = await addToWishlistProductHandler({productId: product._id,
          userId: userInfo._id,})
       
      } catch (error) {
        console.log("::::::::: error ", error);
      }
    }
    else{
      navigate("/login");
    }


  };


  const removeFromFavouriteList = async (productId) => {

    setIsClicked(!isClicked);
    try {
      toast("Product removed from wishlist")
      const token = localStorage.getItem("token");
      const response = await removeWishlistProductHandler({productId: product._id,
        userId: userInfo._id,})
      
      dispatch(removeFromFavourite({productId:productId}))
    } catch (error) {
      toast("Error in removing product from wishlist");
      console.log(error, " error ");
    }
  };

  return (
    <div>
      {isClicked ? (
        <FavoriteIcon className="heart-icon" onClick={removeFromFavouriteList} />
      ) : (
        <FavoriteBorderIcon className="heart-icon" onClick={handleClick} />
      )}
    </div>
    
  );
};

export default HeartIcon;
