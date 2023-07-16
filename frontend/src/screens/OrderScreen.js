import React, { useEffect, useContext, useState, useReducer } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Store } from "../Context/storeContext";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { RotatingLines } from 'react-loader-spinner'

const reducer = (state, action) => {
  switch (action.type) {
    case "ORDER_REQUEST":
      console.log("ORDER_REQUEST");
      return { ...state, loader: true };
    case "ORDER_SUCCESS":
      console.log("ORDER_SUCCESS");
      return { ...state, order: action.payload, loader: false };
    case "ORDER_ERROR":
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderScreen() {
  const orderId = useParams().order;
  const { state: stxte, dispatch: dxspatch } = useContext(Store);
  const [orderInfo, setOrderInfo] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    loader: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "ORDER_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:3019/api/orders/${orderId}`,
          { 
            headers: { authorization: `Bearer ${stxte.userInfo.token}` }, 
          },
          
        );
        console.log("Result", result.data.order);
        dispatch({ type: "ORDER_SUCCESS", payload: result.data.order });
      } catch (err) {
        dispatch({ type: "ORDER_ERROR", payload: err });
      }
    };
    fetchOrder();
  }, [orderId, stxte.userInfo]);

  const payOrder = async () => {
    console.log("HERE");
    try {
      const result = await axios.post(
        `http://localhost:3019/api/orders/${orderId}/payment`,
        {},
        { headers: { authorization: `Bearer ${stxte.userInfo.token}` } }
      );

      if (result.status === 200) {
        window.location.href = result.data.url;
      } else {
        console.log("Fail", result);
      }
    } catch (err) {
      console.log("ERR", err);
    }
  };

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
      ) : state.error != "" ? <Error value={state.error} /> : (
        <Container className="orderScreen">
          <Row>
            <h1>Order {state.order[0]._id}</h1>
            <Col lg={8}>
              <div className="order-screen-shipping">
                <h4>Shipping</h4>
                <span>
                  <strong className="underline">Name:</strong>
                  <br></br> {state.order[0].shippingInfo.name}
                </span>
                <br></br>
                <span>
                  <strong className="underline">Address:</strong>
                  <br></br> {state.order[0].shippingInfo.address},{" "}
                  {state.order[0].shippingInfo.city},{" "}
                  {state.order[0].shippingInfo.postalCode},{" "}
                  {state.order[0].shippingInfo.country}
                </span>
                <br></br>
              </div>
            </Col>

            <Col lg={4}>
              <div className="placeOrder">
                <h4 className="center">Order Summary</h4>
                <div>
                  Item(s):{" "}
                  <span className="float-right">
                    ${state.order[0].itemsPrice?.toFixed(2)}
                  </span>
                </div>
                <div>
                  Shipping:{" "}
                  <span className="float-right text-success">FREE</span>
                </div>
                <div className="place-border">
                  Tax:{" "}
                  <span className="float-right">
                    ${state.order[0].taxPrice?.toFixed(2)}
                  </span>
                </div>
                <div>
                  <strong>
                    Total:
                    <span className="float-right">
                      ${state.order[0].totalPrice?.toFixed(2)}
                    </span>
                  </strong>
                </div>
                {state.order[0].isPaid ? (
                  <button
                    className="payout-button"
                    onClick={() => navigate("/")}
                  >
                    Already Paid, Continue Shopping :)
                  </button>
                ) : (
                  <button className="payout-button" onClick={payOrder}>
                    Pay with Stripe
                  </button>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="order-screen-alert-container">
                {!state.order[0].isPaid ? (
                  <Alert className="order-screen-alert" variant="danger">
                    Waiting for your payment
                  </Alert>
                ) : (
                  <Alert className="order-screen-alert" variant="success">
                    Payment completed
                  </Alert>
                )}
                {state.order[0].isPaid ? (
                  !state.order[0].isDelivered ? (
                    <Alert className="order-screen-alert" variant="danger">
                      Not Delivered
                    </Alert>
                  ) : (
                    <Alert className="order-screen-alert" variant="success">
                      Delivered
                    </Alert>
                  )
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="order-screen-items">
                <h3 className="center">Item(s) Overview</h3>
                {state.order[0].orderItems.map((item, index) => (
                  <div key={index} className="placeOrderItem">
                    <img src={item.image} alt={item.name} />
                    <span>
                      <Link to={"/product/" + item.slug}>{item.name}</Link>
                    </span>
                    <span className="placeOrderQuanPrice">{item.quantity}</span>
                    <span className="placeOrderQuanPrice">${item.price}</span>
                    <hr></hr>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
