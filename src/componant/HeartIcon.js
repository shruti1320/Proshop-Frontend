import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiHeart } from 'react-icons/bi';

const HeartIcon = ({ handleMouseEnterHeart, handleMouseLeaveHeart }) => {
  const [isClicked, setIsClicked] = useState(false);
  //let isClicked = localStorage.getItem('heart-icon') || false

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the clicked state
    //isClicked=isClicked? false : true;
    //localStorage.setItem('heart-icon', isClicked)
  };

  return (
    <div
      className={`heart-icon-container ${isClicked ? 'active' : ''}`} // Add active class based on isClicked state
      onMouseEnter={handleMouseEnterHeart}
      onMouseLeave={handleMouseLeaveHeart}
      // style={{ color: " red"}}
      onClick={(e) => {
        e.stopPropagation();
        toast(" hey theree ") // Prevent event propagation
        handleClick(); // Call the handleClick function
      }}
    >
      <BiHeart className="heart-icon" color={isClicked ? 'red' : 'black'} /> {/* Change color based on isClicked state */}

    </div>
    
  );
};

export default HeartIcon;
