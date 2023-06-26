import React from "react";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Context/storeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Store);
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3019/login-user", { email, password })
      .then((response) => {
        console.log(response);
        console.log(response.data);

        if (response.data.auth) {
          setSignIn(true);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          localStorage.setItem("token", "Beared " + response.data.token);
          dispatch({ type: "SIGN_IN", payload: response.data });
          navigate("/");
        } else {
          setSignIn(false);
        }
      });
  };

  const userAuth = () => {
    axios
      .get("http://localhost:3019/isAuth", {
        headers: {
          authentication: localStorage.getItem("token"),
        },
      })
      .then((res) => {});
  };

  return (
    <div id="signin-container">
      <div className="form-login">
        <div className="format-input">
          <h1>Welcome Back</h1>
          <div className="login-input-container">
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            className="login-inputs"></input>{" "}
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            className="login-inputs"></input>
          </div>
          <div className="login-button">
            <button onClick={login} className="log-button">Submit</button>
          </div>
          <span>Don't have an account?</span>
          <Link to="/register-page">Register</Link>
        </div>
      </div>
    </div>
  );
}
