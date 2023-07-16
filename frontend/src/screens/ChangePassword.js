import React from "react";
import { useState, useContext } from "react"; // Import necessary hooks from React
import { Store } from "../Context/storeContext"; // Import the Store context
import axios from "axios"; // Import axios for making API requests
import Alert from "react-bootstrap/Alert"; // Import the Alert component from React Bootstrap
import { PiUserSwitchDuotone } from "react-icons/pi"; // Import the PiUserSwitchDuotone icon from react-icons/pi

export default function ChangePassword() {
  // Define and initialize state variables
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [inputErr, setInputErr] = useState("");

  // Access the Store context using useContext hook
  const { state } = useContext(Store);
  const email = state.userInfo.email; // Get the email from the context's state

  // Function to analyze the password and perform password change
  const analyzePassword = async () => {
    // Check for input errors and display error messages if needed
    if (currentPass === "") {
      setInputErr("Please enter your existing password");
      return;
    } else if (newPass === "") {
      setInputErr("Please enter your new password");
      return;
    } else if (newPassConfirm === "") {
      setInputErr("Please confirm your new password");
      return;
    } else if (newPass !== newPassConfirm) {
      setInputErr("New Password does not match the new confirm password");
      setNewPass("");
      setNewPassConfirm("");
      return;
    }

    try {
      // Make an API call to change the password
      const result = await axios.post("http://localhost:3019/api/user/change-password", { email, currentPass, newPass });
      alert(result.data.message); // Show the success message returned from the API
    } catch (err) {
      setInputErr(err.response.data.message); // Display the error message received from the API
    }
    // Clear the input fields after the password change attempt
    setNewPass("");
    setNewPassConfirm("");
    setCurrentPass("");
  };

  return (
    // Render the change password form
    <div className="screen-container">
      <div className="form-screen">
        <div className="format-input">
          <h1>Change Password </h1>
          <PiUserSwitchDuotone className="icon" />
          <div className="center-change-inputs">
            <input
              placeholder="Current Password"
              value={currentPass}
              type="password"
              className="screen-inputs"
              onChange={(e) => setCurrentPass(e.target.value)}
            />{" "}
            <br></br>
            <input
              placeholder="New Password"
              value={newPass}
              type="password"
              className="screen-inputs"
              onChange={(e) => setNewPass(e.target.value)}
            />{" "}
            <br></br>
            <input
              placeholder="New Password confirm"
              value={newPassConfirm}
              type="password"
              className="screen-inputs"
              onChange={(e) => setNewPassConfirm(e.target.value)}
            />
          </div>
          {inputErr !== "" && (
            <>
              <br></br>
              <br></br>
              <Alert className="alert" variant="danger">
                {inputErr}
              </Alert>
              <br></br>
              <br></br>
            </>
          )}
          <br></br>
          <button onClick={analyzePassword} className="log-button">
            Set New Password
          </button>
        </div>
      </div>
    </div>
  );
}
