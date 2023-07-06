import React from "react";
import Product from "../components/Product";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { FaTruck } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";

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
      console.log("FETCH_ERROR");
      return {
        productz: [],
        loader: false,
        error: "Error",
      };
    default:
      console.log("productReducer Default");
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(productReducer, {
    productz: [],
    loader: false,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:3019/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        console.log("ERROR");
        dispatch({ type: "FETCH_ERROR", error: "Error loading products" });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div id="imgContainer">
        <div className="bg"></div>
      </div>

      {/* <div className="homeTopSection">

      </div> */}

      <div className="homeCardContainer">
        <div className="homeCard">
          <FaTruck className="homeIcon" />
          <h4>Free Shipping</h4>
          <p>Free shipping on all online orders</p>
        </div>
        <div className="homeCard">
          <FaHandsHelping className="homeIcon" />
          <h4>24/7 Support</h4>
          <p>Contact us anything for you problem</p>
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
          <h4>Loading...</h4>
        ) : (
          state.productz.map((data, index) => (
            <Product value={data} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
