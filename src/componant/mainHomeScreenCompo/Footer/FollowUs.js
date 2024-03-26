
export default function FooterSection4() {
  return (
    <div>
      <div className="follow-us mb-4  responsive">
        <ul className="text-dark fw-bold">Follow Us</ul>
        <div className="social-icons mt-2  align-items-center ms-0 d-flex  flex-wrap">
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

      <div className="download-app">
        <ul className="text-dark fw-bold">Download App</ul>
        <div className="d-flex  flex-wrap">
          <button className="btn btn-outline-light mb-2 me-2">
            <i className="fa-brands fa-apple"></i> App Store
          </button>
          <button className="btn btn-outline-light mb-2">
            <i className="fa-brands fa-google-play"></i> Google Play
          </button>
        </div>
      </div>
    </div>
  );
}