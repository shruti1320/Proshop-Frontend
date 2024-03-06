import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Range } from "react-range";
import { useDispatch } from "react-redux";
import { setFilteredProducts } from "../Slices/productSlice";
import { Link } from "react-router-dom";
function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [priceRange, setPriceRangeChange] = useState([20, 10000]);

  const handleRangeChange = (newPriceRange) => {
    // console.log("pricerange", newPriceRange);
    setPriceRangeChange(newPriceRange);
  };

  const handleFilterButtonClick = () => {
    // console.log("price range :::::", priceRange);
    dispatch(setFilteredProducts(priceRange));
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-3 mt-3">
            <div>Product Categories</div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/allproductScreen" className="text-danger">
            Electrics
          </Link>
          <div className="text-danger mt-3">Clothes</div>
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
                    backgroundColor: "#F2295B",
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
}

export default Example;
