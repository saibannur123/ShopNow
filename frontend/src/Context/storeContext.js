import React from "react";
import { useReducer, createContext } from "react";
import { storeReducer } from "./storeReducer";

// Create a new context called "Store"
export const Store = createContext();

// Define the initial state for the application
const inititialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : "",
  },
};

// Create a provider component called "StoreProvider"
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, inititialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
