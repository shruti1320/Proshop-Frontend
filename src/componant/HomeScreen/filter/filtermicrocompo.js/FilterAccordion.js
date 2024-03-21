import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setBrandFilter, setRatingFilter } from "../../../../Slices/productSlice";

export default function Accordion() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const selectedBrand=useSelector((state)=>state.product.selectedBrand);
  const selectedRating=useSelector((state)=>state.product.selectedRating);
  console.log("selected rating",selectedRating)

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

  const handleRatingFilter=(rating)=>{
    dispatch(setRatingFilter(rating))
    console.log("rating",rating)
  }


  return (
    <div>
      <div className="accordion mt-4" id="accordionExample">


        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCategory"
              aria-expanded="true"
              aria-controls="collapseCategory"
            >
              Category
            </button>
          </h2>
          <div
            id="collapseCategory"
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
              data-bs-target="#collapseColor"
              aria-expanded="false"
              aria-controls="collapseColor"
            >
              Color
            </button>
          </h2>
          <div
            id="collapseColor"
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
              data-bs-target="#collapseRating"
              aria-expanded="false"
              aria-controls="collapseRating"
            >
              Rating
            </button>
          </h2>
          <div
            id="collapseRating"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rating1"                
                  checked={selectedRating === 1}
                  onChange={() => handleRatingFilter(1)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  1.0 and above
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rating2"                
                  checked={selectedRating === 2}
                  onChange={() => handleRatingFilter(2)}
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
                  id="rating3"                
                  checked={selectedRating === 3}
                  onChange={() => handleRatingFilter(3)}
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
                  id="rating4"                
                  checked={selectedRating === 4}
                  onChange={() => handleRatingFilter(4)}
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
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBrand"
              aria-expanded="false"
              aria-controls="collapseBrand"
            >
              Brand
            </button>
          </h2>
          <div
            id="collapseBrand"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div>
                <h4>Smart Phone Brands</h4>
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
                    Apple iPhone
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
                    OnePlus
                  </label>
                </div>
              </div>
              <div>
                <h4>Camera Brands</h4>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="canon"
                    id="flexCheckDefault"
                    onClick={() => handleBrandFilter('canon')}
                    checked={selectedBrand === 'canon'}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Canon
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="nikon"
                    id="flexCheckDefault"
                    onClick={() => handleBrandFilter('nikon')}
                    checked={selectedBrand === 'nikon'}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Nikon
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="sony"
                    id="flexCheckDefault"
                    onClick={() => handleBrandFilter('sony')}
                    checked={selectedBrand === 'sony'}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Sony
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
}
