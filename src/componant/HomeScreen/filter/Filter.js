import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, setFilteredProducts } from "../../../Slices/productSlice";

function Example(props) {

  const pro=useSelector((state)=>state.product.productList.products);

 console.log("proo",pro)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [priceRange, setPriceRangeChange] = useState([20, 10000]);
  const handleRangeChange = (newPriceRange) => {
    setPriceRangeChange(newPriceRange);
  };
 
  // if (typeof props.filterRange === 'function') {
  //   props.filterRange(priceRange);
  // }
  
  useEffect(()=>{
    listProducts();
  },[dispatch])

  const handleFilterButtonClick = () => {
    console.log("pricerange",priceRange);
    // dispatch(setFilteredProducts(piceRange));
    console.log("filteredproducts",pro)
    handleClose();
  
    return priceRange
  };

  if(typeof props.handleFilter==="function"){
    props.handleFilter(handleFilterButtonClick())
  }
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
}
export default Example;







