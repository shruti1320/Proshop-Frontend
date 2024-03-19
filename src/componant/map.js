export default function Map({ gMap }) {
  return (
    <div className="gmap">
      <iframe
        className="iframe"
        style={{
          height: "500px",
          frameBorder: "0",
          scrolling: "no",
          marginHeight: "0",
          marginWidth: "0",
        }}
        id="gmap_canvas"
        src={gMap}
      ></iframe>
    </div>
  );
}
