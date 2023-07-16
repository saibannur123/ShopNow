import React from "react";
import { FaHandPaper } from "react-icons/fa";

// Error component receives `props` as an argument
export default function Error(props) {
  const { response } = props.value; // Extract the respons` property from the props object
  const statusText = response ? response.statusText : "Unknown Error"; // Get the status text from the response
  const status = response ? response.status : "Unknown Status"; // Get the status code from the response
  const message = response ? response.data.message : "Unknown Error Message"; // Get the error message from the response data

  return (
    <div className="error-outer">
      <div className="error-container">
        <div className="error-heading">
          <p className="status-code">{status}</p>
          <h2 className="status-text">{statusText}</h2>
          <FaHandPaper className="error-icon" />
          <p className="error-message">{message}</p>
        </div>
      </div>
    </div>
  );
}
