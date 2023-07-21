import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Context/storeContext";
import { BsPersonCircle } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const [inputErr, setInputErr] = useState("");

  // Function to handle login form submission
  const loginHandler = () => {
    if (email === "") {
      setInputErr("Please enter your email");
    } else if (password === "") {
      setInputErr("Please enter your password");
    } else {
      login(); // Call the login function when the form is valid
    }
  };

  // Function to make an async login request to the server
  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3019/login-user", {
        email,
        password,
      });

      if (response.data.auth) {
        // If login is successful, save user info and token to local storage,
        // dispatch the SIGN_IN action to the context, and navigate to the home page.
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("token", "Bearer " + response.data.token);
        dispatch({ type: "SIGN_IN", payload: response.data });
        navigate("/");
      } else {
        // Handle unsuccessful login if necessary
      }
    } catch (err) {
      // Handle errors during login process
      if (err.response.status === 404) {
        setInputErr(err.response.data.message);
        setPassword("");
      } else {
        console.log("Error with login");
        setInputErr("An unexpected error has occurred");
        setPassword("");
      }
    }
  };

  return (
    <div className="screen-container">
      <div className="form-screen">
        <div className="format-input">
          <h1>Welcome Back</h1>
          <BsPersonCircle className="icon" />
          <div className="screen-input-container">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="screen-inputs"
            ></input>{" "}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
            <button onClick={loginHandler} className="log-button">
              Submit
            </button>
          </div>
          <div className="register-now-prompt">
            <span>Don't have an account? </span>
            <Link to="/register-page">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
