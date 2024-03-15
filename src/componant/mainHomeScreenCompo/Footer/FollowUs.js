import React from "react";

export default function FooterSection4() {
  return (
    <div>
      <div
        className="follow-us mb-4 text-center responsive"
      >
        <ul className="text-dark fw-bold ">Follow Us</ul>
        <div className="social-icons mt-2 d-flex justify-content-center ms-0">
          <button>
            <i className="fa-brands fa-youtube"></i>
          </button>
          <button>
            <i className="fa-brands fa-linkedin"></i>
          </button>
          <button>
            <i className="fa-brands fa-facebook"></i>
          </button>
          <button>
            <i className="fa-brands fa-instagram"></i>
          </button>
        </div>
      </div>

      <div className="download-app text-center">
        <ul className="text-dark fw-bold mb-2">Download App</ul>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-light">
            <i className="fa-brands fa-apple"></i> App Store
          </button>
          <button className="btn btn-outline-light">
            <i className="fa-brands fa-google-play"></i> Google Play
          </button>
        </div>
      </div>
    </div>
  );
}
