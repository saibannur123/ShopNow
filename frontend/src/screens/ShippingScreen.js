import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Context/storeContext";
import Alert from "react-bootstrap/Alert";

export default function ShippingScreen() {
  const localInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const [name, setName] = useState(localInfo ? localInfo.name : "");
  const [address, setAddress] = useState(localInfo ? localInfo.address : "");
  const [city, setCity] = useState(localInfo ? localInfo.city : "");
  const [postalCode, setPostalCode] = useState(
    localInfo ? localInfo.postalCode : ""
  );
  const [country, setCountry] = useState(localInfo ? localInfo.country : "");
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);
  const [inputErr, setInputErr] = useState("");

  const validateShipping = () => {
    if (name === "") {
      setInputErr("Please enter your name");
    } else if (address === "") {
      setInputErr("Please enter your address");
    } else if (city === "") {
      setInputErr("Please enter your city");
    } else if (postalCode === "") {
      setInputErr("Please enter your postal code");
    } else if (country === "") {
      setInputErr("Please enter your country");
    } else {
      const shippingInfo = { name, address, city, postalCode, country };
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      dispatch({
        type: "ADD_SHIPPING_ADDRESS",
        payload: { name, address, city, postalCode, country },
      });
      navigate("/placeorder");
    }
  };

  return (
    <div className="shippingScreenContainer">
      <h1>Shipping Address</h1>
      <br></br>
      <input
        placeholder="Full Name"
        className="screen-inputs"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Address"
        className="screen-inputs"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        placeholder="City"
        className="screen-inputs"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        placeholder="Postal Code"
        className="screen-inputs"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        placeholder="Country"
        className="screen-inputs"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      {inputErr !== "" && (
        <>
          <Alert className="alert" variant="danger">
            {inputErr}
          </Alert>
        </>
      )}
      <button onClick={() => validateShipping()} className="log-button">
        Continue
      </button>
    </div>
  );
}
