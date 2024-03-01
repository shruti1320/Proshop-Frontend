import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiHeart } from 'react-icons/bi';

const HeartIcon = ({ handleMouseEnterHeart, handleMouseLeaveHeart }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the clicked state
    toast.success("Product added to favourite");
  };

  return (
    <div
      className={`heart-icon-container ${isClicked ? 'active' : ''}`}
      onMouseEnter={handleMouseEnterHeart}
      onMouseLeave={handleMouseLeaveHeart}
      onClick={(e) => {
        e.stopPropagation();
        // handleClick();
      }}
    >
      {isClicked ? (
        <BiHeart className="heart-icon " onClick={handleClick()} color="" />
      ) : (
        <BiHeart className =" heart-icon  active"></BiHeart>
      )}
    </div>
  );
};

export default HeartIcon;
