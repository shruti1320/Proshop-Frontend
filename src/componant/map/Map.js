import React, { useEffect, useState } from "react";
import axios from "axios";
const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerAddress, setMarkerAddress] = useState("");
  const [userProvidedLocation, setUserProvidedLocation] = useState("");
  useEffect(() => {
    if (!userProvidedLocation) {
      // Get current location using Geolocation API only if user hasn't provided one
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchAddress(latitude, longitude); // Fetch address based on current location
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      // Use user-provided location
      fetchAddressFromInput(userProvidedLocation);
    }
  }, [userProvidedLocation]);
  // Function to fetch address from coordinates
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      if (response.data.display_name) {
        setMarkerAddress(response.data.display_name);
      }
      console.log("Fetched address:", response.data.display_name);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  // Function to fetch address from user-provided input
  const fetchAddressFromInput = async (location) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`
      );
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setCurrentLocation({ latitude: lat, longitude: lon });
        setMarkerAddress(display_name);
      } else {
        console.error("Location not found");
        setMarkerAddress("Location not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  // Function to handle user-provided location
  const handleUserLocationChange = (event) => {
    setUserProvidedLocation(event.target.value);
  };
  // Render map with current location
  const gMap = currentLocation
    ? `https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    : "https://maps.google.com/maps?q=city_name&t=&z=13&ie=UTF8&iwloc=&output=embed"; // Fallback to default location
  return (
    <div>
      <div className="gmap">
        <iframe
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
              value={userProvidedLocation}
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