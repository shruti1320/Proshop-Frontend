import React, { useEffect, useState } from "react";
import axios from "axios";
const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerAddress, setMarkerAddress] = useState("");
  const [userLocation, setUserLocation] = useState("");
  useEffect(() => {
    if (!userLocation) {
      // Get current location using Geolocation API if user location is not provided
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
        //   console.log(position,'positiuons')
          setCurrentLocation({ latitude, longitude });
          fetchAddress(latitude, longitude); // Fetch address based on current location
        //   console.log(fetchAddress(latitude, longitude),'address')
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      // Fetch address based on user-provided location
      fetchAddressForUserLocation(userLocation);
    }
  }, [userLocation]);
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d32e4bed59f340a1bd75adce25415d64`
      );
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted;
        setMarkerAddress(address);
      } else {
        console.error("Address not found");
        setMarkerAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const fetchAddressForUserLocation = async (location) => {
    console.log(location,'location')
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=d32e4bed59f340a1bd75adce25415d64`
      );
      if (response.data.results.length > 0) {
        const { lat, lng, formatted } = response.data.results[0].geometry;
        setCurrentLocation({ latitude: lat, longitude: lng });
        setMarkerAddress(formatted);
      } else {
        console.error("Location not found");
        setMarkerAddress("Location not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const handleUserLocationChange = (event) => {
    setUserLocation(event.target.value);
  };
  const gMap = currentLocation
    ? `https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    : "https://maps.google.com/maps?q=city_name&t=&z=13&ie=UTF8&iwloc=&output=embed"; // Fallback to default location
  return (
    <div>
      <div className="gmap">
        <iframe
        title="map"
          className="ifram"
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
      <div className="marker-address">
        {markerAddress}
        {!currentLocation && (
          <div>
            <label htmlFor="userLocation">Enter your location:</label>
            <input
              type="text"
              id="userLocation"
              value={userLocation}
              onChange={handleUserLocationChange}
              placeholder="e.g., 394105"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MapComponent;