// PriceRangeSlider.js
import React from "react";
import { Range } from "react-range";

const PriceRangeSlider = ({ priceRange, handleRangeChange }) => {
  return (
    <div className="mt-3">
      <Range
        step={100}
        min={20}
        max={10000}
        values={priceRange}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "5px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "17px",
              width: "17px",
              backgroundColor: "black",
              borderRadius: "50%",
            }}
          />
        )}
      />
    </div>
  );
};

export default PriceRangeSlider;
