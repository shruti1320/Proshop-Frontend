import React from "react";

export default function FooterSection4() {
  return (
    <div>

      <div className="follow-us mb-4 text-center">
        <span className="text-light">Follow Us</span>
        <div className="social-icons mt-2">
          <button>
            <i className="fa-brands fa-youtube"></i>
          </button>
          <button>
            <i className="fa-brands fa-linkedin"></i>
          </button>
          <button>
            <i className="fa-brands fa-twitter"></i>
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
        <span className="text-light mb-2">Download App</span>
        <div className="d-flex">
          <button className="btn btn-outline-light me-2">
            <i className="fa-brands fa-apple"></i> App Store
          </button>
          <button className="btn btn-outline-light me-5 p-3">
            <i className="fa-brands fa-google-play"></i> Google Play
          </button>
        </div>
      </div>
      
    </div>
  );
}
