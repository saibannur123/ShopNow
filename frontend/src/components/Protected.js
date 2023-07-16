import React from "react";
import { Store } from "../Context/storeContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  // Accessing the global state from the context
  const { state } = useContext(Store);

  // If the user is authenticated (userInfo exists), render the component children
  // Otherwise, redirect to the login page using Navigate from react-router-dom
  return state.userInfo ? children : <Navigate to="/login-page"></Navigate>;
}
