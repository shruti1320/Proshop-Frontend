import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../componant/FormContainer";
import { useDispatch, useSelector } from "react-redux";

import CheckOutSteps from "../componant/CheckOutSteps";
import { useNavigate } from "react-router-dom";
import Map from "../componant/map";

const ShippingScreen = () => {
  // const cart = useSelector((state) => state.cart);
  // const { shippingAddress } = cart;
  const navigate = useNavigate();

  //(shippingAddress.address || "") it means
  // if there is no value in shippingAddress.address then default value  assign as empty string
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const[mapping, setMapping] = useState(false);
  // const dispatch = useDispatch();



  const obj = {
    address: address,
    city: city,
    postalCode: postalCode,
    country: country,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country })
    );
    navigate("/payment");
  };

  const iframe = `https://maps.google.com/maps?q=surat&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shopping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PostalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          Continue
        </Button>

        <br></br>
        <span>OR</span>
        <br></br>
      </Form>
      <Button
        className="mt-3"
        type="submit"
        variant="primary"
        onClick={() => {setMapping(true)}}
      >
        Select Location
      </Button>

      {mapping?<Map gMap={iframe} className="mt-5" />:<></>}
    </FormContainer>
  );
};

export default ShippingScreen;
