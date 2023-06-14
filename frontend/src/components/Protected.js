import React from "react";
import { Store } from "../Context/storeContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { state } = useContext(Store);

  return state.userInfo ? children : <Navigate to="/login-page"></Navigate>;
}
