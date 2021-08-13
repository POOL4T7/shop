import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormConatiner";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAdress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full address"
            value={address}
            required
            onChange={(e) => setAdress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City name"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="country name"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
