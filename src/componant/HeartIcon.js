import React from 'react';
import { BiHeart } from 'react-icons/bi';

const HeartIcon = ({ hoveredheart, handleMouseEnterHeart, handleMouseLeaveHeart }) => {

  const handleClick = () => {
    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.classList.toggle('active');
  };

  return (
    <div
      className="heart-icon-container"
      onMouseEnter={handleMouseEnterHeart}
      onMouseLeave={handleMouseLeaveHeart}
      onClick={handleClick}
    >
      <BiHeart className="heart-icon" />
    </div>
  );
};

export default HeartIcon;
