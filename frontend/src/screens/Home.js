import React from "react";
import Product from "../components/Product";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { FaTruck } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import Error from "../components/Error";
import { RotatingLines } from "react-loader-spinner";

// Reducer function to manage the state for fetching products
const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loader: true,
      };
    case "FETCH_SUCCESS":
      return {
        productz: action.payload,
        loader: false,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        productz: [],
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default function Home() {
  // State management using the productReducer
  const [state, dispatch] = useReducer(productReducer, {
    productz: [],
    loader: false,
    error: "",
  });

  // Fetch products data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:3019/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div id="imgContainer">
        <div className="bg"></div>
      </div>

      <div className="homeCardContainer">
        <div className="homeCard">
          <FaTruck className="homeIcon" />
          <h4>Free Shipping</h4>
          <p>Free shipping on all online orders</p>
        </div>
        <div className="homeCard">
          <FaHandsHelping className="homeIcon" />
          <h4>24/7 Support</h4>
          <p>Contact us anything for your problem</p>
        </div>
        <div className="homeCard">
          <FaRegCreditCard className="homeIcon" />
          <h4>Secure Payment</h4>
          <p>Safe online payments through Stripe</p>
        </div>
      </div>

      <div className="homeText">
        <h3>What We Offer</h3>
        <h6>
          We provide all types of clothing and accessories with affordable
          pricing
        </h6>
      </div>

      <div className="productsContainer">
        {state.loader ? (
          <div className="load-container">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="36"
              visible={true}
            />
          </div>
        ) : state.error !== "" ? (
          <Error value={state.error} />
        ) : (
          state.productz.map((data, index) => (
            <Product value={data} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
