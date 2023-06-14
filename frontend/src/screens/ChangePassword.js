import React from "react";
import { useState, useContext } from "react";
import { Store } from "../Context/storeContext";
import axios from "axios";

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const { state } = useContext(Store);
  const email = state.userInfo.email;

  const analyzePassword = async () => {
    if (newPass !== newPassConfirm) {
      alert("New Password does not match the confirm password");
      setNewPass("");
      setNewPassConfirm("");
      setCurrentPass("");
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
      alert(result.data.message);
    }
    setNewPass("");
    setNewPassConfirm("");
    setCurrentPass("");
  };

  return (
    <>
      <div className="changePasswordContainer">
        <h1>Change Password </h1>
        <input
          placeholder="Current Password"
          value={currentPass}
          type="password"
          className="changePaswordInput"
          onChange={(e) => setCurrentPass(e.target.value)}
        />{" "}
        <br></br>
        <input
          placeholder="New Password"
          value={newPass}
          type="password"
          className="changePaswordInput"
          onChange={(e) => setNewPass(e.target.value)}
        />{" "}
        <br></br>
        <input
          placeholder="New Password confirm"
          value={newPassConfirm}
          type="password"
          className="changePaswordInput"
          onChange={(e) => setNewPassConfirm(e.target.value)}
        />
        <br></br>
        <button onClick={analyzePassword}>Set New Password</button>
      </div>
    </>
  );
}
