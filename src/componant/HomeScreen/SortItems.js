import React from "react";

export default function SortItems({ onSortChange }) {
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    onSortChange(selectedSortOption);
  };
  
    return (
    <div className="d-flex justify-content-center mb-3">
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleSortChange}
      >
        <option value="priceLowToHigh">Sort by price: low to high</option>
        <option value="priceHighToLow">Sort by price: high to low</option>
        <option value="nameAZ">Sort by name: A to Z</option>
        <option value="nameZA">Sort by name: Z to A</option>
      </select>
    </div>
  );
}
