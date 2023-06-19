import React from "react";
import { useReducer, createContext } from "react";
import { storeReducer } from "./storeReducer";

export const Store = createContext();

const inititialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : "",
  },
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, inititialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
