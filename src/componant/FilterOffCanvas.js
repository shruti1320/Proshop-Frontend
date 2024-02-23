import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Range } from "react-range";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import { filterProducts } from "../Slices/productSlice";

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch =useDispatch();
  const [priceRange, setPriceRange] = useState([20, 10000]);

  const handleRangeChange = (newRange) => {
    setPriceRange(newRange);
    dispatch(setPriceRange(newRange));
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
          <Link
            to="/allproductScreen"
            className="text-danger"
          >
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
              onClick={handleRangeChange}
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
