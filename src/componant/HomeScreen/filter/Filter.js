import React, { useState, useEffect, useCallback } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Range } from "react-range";

const Filter = ({ handleFilter }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [priceRange, setPriceRange] = useState([20, 10000]);
  
  const handleRangeChange = useCallback((newPriceRange) => {
    setPriceRange(newPriceRange);
  }, []);

  const handleFilterButtonClick = useCallback(() => {
    handleFilter(priceRange);
    handleClose();
  }, [handleFilter, priceRange]);
  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="btn btn-outline-secondary mt-3 border-start-0 bg-transparent text-dark"
      >
        Filter
      </button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mt-5 fs-2">Filter by price</div>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Filter;