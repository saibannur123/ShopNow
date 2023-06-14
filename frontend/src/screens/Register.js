import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3019/register", { name, email, password })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  return (
    <div className="form-login">
      <div className="format-input">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        ></input>{" "}
        <br></br>
        <br></br>
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>{" "}
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        ></input>
        <br></br>
        <br></br>
        <Button className="login-button" onClick={register}>
          Submit
        </Button>
      </div>
    </div>
  );
}
