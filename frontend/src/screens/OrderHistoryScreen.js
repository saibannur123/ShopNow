import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { Store } from "../Context/storeContext";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { BsCart4} from "react-icons/bs";

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
  const { state: stxte, dispatch: dxspatch } = useContext(Store);
  const [state, dispatch] = useReducer(reducer, {
    loader: true,
    orders: {},
    error: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "ORDERS_REQUEST" });

      try {
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

        dispatch({ type: "ORDERS_SUCCESS", payload: response.data.orders });
      } catch (err) {
        dispatch({ type: "ORDERS_ERROR", payload: err });
        alert("Error fetch order");
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {state.loader ? (
        <h1>LOADING</h1>
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
                {state.orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      <Link
                        className={
                          item.isPaid
                            ? item.isDelivered
                              ? "btn btn-success"
                              : "btn btn-info"
                            : "btn btn-danger"
                        }
                        to={`/order/${item._id}`}
                      >
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
      ) : 
      
      <div className="OrderHistoryScreen">
            <h1>Order History</h1>

      <Alert variant="info" className="cart-error">
        No Purchase History
      </Alert>

      <div className="cart-screen-empty">
      <BsCart4 className="order-history-icon" />
        <h4>Check back once you have created your first order!</h4>
        <button onClick={() => navigate("/")} className="cart-shop">
          Continue Shopping
        </button>
      </div>
    </div>}
    </>
  );
}
