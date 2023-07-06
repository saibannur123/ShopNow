import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputErr, setInputErr] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (name === "") {
      setInputErr("Please enter your username");
    } else if (email === "") {
      setInputErr("Please enter your email");
    } else if (password === "") {
      setInputErr("Please enter a password");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInputErr("Please enter an appropriate email");
      setEmail("");
    } else if (confirmPassword === "") {
      setInputErr("Please enter your confirm password");
    } else if (password !== confirmPassword) {
      setInputErr("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
    } else {
      tryRegister();
    }
  };

  const tryRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3019/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/login-page");
      }
    } catch (err) {
      if (err.response.status === 409) {
        setInputErr(err.response.data);
      } else {
        console.log("Error registering", err);
        setInputErr("An unexpected error has occured");
      }
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setName("");
    }
  };

  return (
    <div className="screen-container">
      <div className="form-screen">
        <div className="format-input">
          <h1>Register</h1>
          <BsFillPersonPlusFill className="icon" />
          <div className="screen-input-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="screen-inputs"
            ></input>{" "}
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className="screen-inputs"
            ></input>{" "}
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="screen-inputs"
            ></input>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="screen-inputs"
            ></input>
          </div>

          {inputErr !== "" && (
            <>
              <br></br>
              <br></br>
              <Alert className="alert" variant="danger">
                {inputErr}
              </Alert>
            </>
          )}
          <div className="screen-button">
            <button className="log-button" onClick={register}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
