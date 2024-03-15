import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setBrandFilter } from "../../../../Slices/productSlice";

export default function Accordion() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const selectedBrand=useSelector((state)=>state.product.selectedBrand);
  console.log("selected brand",selectedBrand)

  const handleSmartPhoneClick = () => {
   navigate("/smartphone")
  };

  const handleSmartCameraClick = () => {
    navigate("/camera")
   };

   const handleBrandFilter = (brand) => {
    dispatch(setBrandFilter(brand));
    console.log("brand",brand)
    // navigate(`/products?brand=${brand}`);
  };


  return (
    <div>
      <div className="accordion mt-4" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Category
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={handleSmartPhoneClick}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Smart Phone
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  onClick={handleSmartCameraClick}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Camera
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Color
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <h1>
                <span className="badge rounded-pill text-bg-light fw-light fs-5">
                  black
                </span>
              </h1>
              <h1>
                <span className="badge rounded-pill text-bg-light fw-light fs-5">
                  White
                </span>
              </h1>
              <h1>
                <span className="badge rounded-pill text-bg-light fw-light fs-5">
                  Rosegold
                </span>
              </h1>
              <h1>
                <span className="badge rounded-pill text-bg-light fw-light fs-5">
                  Grey
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Rating
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  2.0 and above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  3.0 and above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  4.0 and above
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Brand
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="apple"
              id="flexCheckDefault"
              onClick={() => handleBrandFilter('apple')}
                checked={selectedBrand === 'apple'}
              />
            
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Apple Iphone
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="nokia"
              id="flexCheckDefault"
              onClick={() => handleBrandFilter('nokia')}
                checked={selectedBrand === 'nokia'}
              />
            
            <label className="form-check-label" htmlFor="flexCheckDefault">
             Nokia
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="One Plus"
              id="flexCheckDefault"
              onClick={() => handleBrandFilter('One Plus')}
                checked={selectedBrand === 'One Plus'}
              />
            
            <label className="form-check-label" htmlFor="flexCheckDefault">
              One Plus
            </label>
          </div>
      
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
