// Importing necessary libraries and components
import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { Store } from "../Context/storeContext";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Error from "../components/Error";
import { RotatingLines } from "react-loader-spinner";

// Reducer function to handle state changes for fetching orders
const reducer = (state, action) => {
  switch (action.type) {
    case "ORDERS_REQUEST":
      return { ...state, loader: true };
    case "ORDERS_SUCCESS":
      return { ...state, orders: action.payload, loader: false };
    case "ORDERS_ERROR":
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  // Extracting state and dispatch from the global store using Context API
  const { state: stxte } = useContext(Store);
  // Setting up a local reducer to manage component state
  const [state, dispatch] = useReducer(reducer, {
    loader: true,
    orders: {},
    error: "",
  });
  // Getting the navigation function to move to different routes
  const navigate = useNavigate();

  // Fetching user order history on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      // Dispatching action to indicate order fetching is in progress
      dispatch({ type: "ORDERS_REQUEST" });

      try {
        // Sending a request to the server to fetch the order history for the current user
        const response = await axios.get(
          "http://localhost:3019/api/orders/history",
          {
            params: {
              user: stxte.userInfo.user_id,
            },
            headers: {
              authorization: `Bearer ${stxte.userInfo.token}`,
            },
          }
        );

        // Dispatching action to indicate successful retrieval of orders
        dispatch({ type: "ORDERS_SUCCESS", payload: response.data.orders });
      } catch (err) {
        // Dispatching action to indicate an error occurred while fetching orders
        dispatch({ type: "ORDERS_ERROR", payload: err });
      }
    };

    // Calling the fetchOrders function to initiate the order fetching process
    fetchOrders();
  }, [stxte.userInfo.token, stxte.userInfo.user_id]);

  return (
    <>
      {state.loader ? (
        <div className="load-container margin-top">
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
      ) : state.orders.length !== 0 ? (
        <div className="OrderHistoryScreen">
          <h1>Order History</h1>

          <div className="OrderHistoryTable">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping over orders and displaying each order in a row */}
                {state.orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      <Link
                        // Setting the link style based on the order status
                        className={
                          item.isPaid
                            ? item.isDelivered
                              ? "btn btn-success"
                              : "btn btn-info"
                            : "btn btn-danger"
                        }
                        to={`/order/${item._id}`}
                      >
                        {/* Displaying appropriate action text based on the order status */}
                        {item.isPaid
                          ? item.isDelivered
                            ? "None"
                            : "View"
                          : "Pay"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // If no orders exist, display a message with a cart icon and a "Continue Shopping" button
        <div className="OrderHistoryScreen">
          <h1>Order History</h1>

          <Alert variant="info" className="cart-error">
            No Order History
          </Alert>

          <div className="cart-screen-empty">
            <BsCart4 className="order-history-icon" />
            <h4>Check back once you have created your first order!</h4>
            <button onClick={() => navigate("/")} className="cart-shop">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}
