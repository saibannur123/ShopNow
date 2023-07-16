import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessScreen() {
  const navigate = useNavigate();

  // Use useEffect to redirect back to the home page after a timeout
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="successScreen">
      <h1>Thank You!</h1>
      <h4>Payment Done Successfully</h4>
      <div className="svgContainer">
        <img
          src="/images/check-mark.svg"
          className="successSVG"
          alt="My Happy SVG"
        />
      </div>

      <h5>
        You will be redirected to the home page shortly or click here to return
        to the home page
      </h5>

      <button className="successHome" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}
