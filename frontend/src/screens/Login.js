import React from "react";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Context/storeContext";
import { BsPersonCircle } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Store);
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  const [inputErr, setInputErr] = useState("");

  const loginHandler = () => {
    if (email === "") {
      setInputErr("Please enter your email");
    } else if (password === "") {
      setInputErr("Please enter your password");
    } else {
      login();
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3019/login-user", {
        email,
        password,
      });

      if (response.data.auth) {
        setSignIn(true);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("token", "Beared " + response.data.token);
        dispatch({ type: "SIGN_IN", payload: response.data });
        navigate("/");
      } else {
        setSignIn(false);
      }
    } catch (err) {
      if (err.response.status === 404) {
        setInputErr(err.response.data.message);
        setPassword("");
      } else {
        console.log("Error with login");
        setInputErr("An unexpected error has occured");
        setPassword("");
      }
    }
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
          <BsPersonCircle className="login-icon" />
          <div className="login-input-container">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="login-inputs"
            ></input>{" "}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="login-inputs"
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
          <div className="login-button">
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
