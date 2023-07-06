import React from "react";
import { useState, useContext } from "react";
import { Store } from "../Context/storeContext";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { PiUserSwitchDuotone } from "react-icons/pi";

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [inputErr, setInputErr] = useState("");

  const { state } = useContext(Store);
  const email = state.userInfo.email;

  const analyzePassword = async () => {
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

    const result = await axios.post(
      "http://localhost:3019/api/user/change-password",
      { email, currentPass, newPass }
    );
    console.log(result);
    if (result.data.status === "success") {
      alert(result.data.message);
    } else {
      setInputErr(result.data.message);
    }
    setNewPass("");
    setNewPassConfirm("");
    setCurrentPass("");
  };

  return (
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
