// FilterButton.js
import React from "react";

const FilterButton = ({ handleFilterButtonClick, priceRange }) => {
  return (
    <div>
      <div className="float-end mt-4">
        ${priceRange[0]} - ${priceRange[1]}
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary mt-3 border-start-0"
        onClick={handleFilterButtonClick}
      >
        Filter
      </button>
    </div>
  );
};

export default FilterButton;
