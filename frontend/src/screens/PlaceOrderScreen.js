import React, { useEffect, useContext, useState, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Store } from "../Context/storeContext";
import axios from "axios";

const reducer = (state, action) => {
  switch (state.type) {
    case "ORDER_REQUEST":
      console.log("ORder_Req");
      return { ...state, loader: true };
    case "ORDER_SUCCESS":
      console.log("ORDER_SUCCESS");
      return { ...state, loader: false };
    case "ORDER_ERROR":
      return { ...state, loader: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const { state: stxte, dispatch: dxpatch } = useContext(Store);
  const [state, dispatch] = useReducer(reducer, { loader: false });
  const shippingInfo = stxte.cart.shippingInfo;
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  console.log("State", stxte);

  useEffect(() => {
    if (!localStorage.getItem("shippingInfo")) {
      navigate("/shipping");
    }
  }, [navigate]);

  useEffect(() => {
    let calculation = 0;
    let tot;
    let tx;
    stxte.cart.cartItems.map(
      (item, index) => (calculation += item.quantity * item.value.price)
    );
    setSubTotal(calculation.toFixed(2));
    tx = Number((calculation * 0.13).toFixed(2));
    tot = tx + calculation;
    setTax(tx);
    setTotal(tot);
  }, [stxte.cart.cartItems]);

  const createPayout = async () => {
    dispatch({ type: "ORDER_REQUEST" });
    try {
      const data = await axios.post(
        "http://localhost:3019/api/orders",
        {
          orderItems: stxte.cart.cartItems,
          shippingInfo: stxte.cart.shippingInfo,
          itemsPrice: subTotal,
          shippingPrice: 0,
          taxPrice: tax,
          totalPrice: total,
          user: stxte.userInfo,
        },
        {
          headers: {
            authorization: `Bearer ${stxte.userInfo.token}`,
          },
        }
      );

      dxpatch({ type: "CLEAR_CART" });
      dispatch({ type: "SUCCESS" });
      alert("Order has been created");
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.data.order._id}`);
    } catch (err) {
      dispatch({ type: "ORDER_ERROR" });
      alert("Problem creating your order");
    }
  };

  return (
    <>
      <Container className="placeOrderScreenContainer">
        <Row>
          <h1>Preview Order</h1>
          <Col lg={8}>
            <div className="placeOrderShipping">
              <h4>Shipping</h4>
              <span>
                <strong>Name:</strong> {shippingInfo.name}
              </span>
              <br></br>
              <span>
                <strong>Address:</strong> {shippingInfo.address},{" "}
                {shippingInfo.city}, {shippingInfo.postalCode},{" "}
                {shippingInfo.country}
              </span>
              <br></br>
              <Link to="/shipping">Edit</Link>
            </div>

            <div className="placeOrderItems">
              <h4>Items</h4>
              {stxte.cart.cartItems.map((item, index) => (
                <div key={index} className="placeOrderItem">
                  <img src={item.value.image} alt={item.value.name} />
                  <span>
                    <Link to={"/product/" + item.value.slug}>
                      {item.value.name}
                    </Link>
                  </span>
                  <span className="placeOrderQuanPrice">{item.quantity}</span>
                  <span className="placeOrderQuanPrice">
                    ${item.value.price}
                  </span>
                  <hr></hr>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <div className="placeOrder">
              <h4>Order Summary</h4>
              <span>Items: ${subTotal}</span>
              <hr></hr>
              <span>Shipping: $0.00</span>
              <hr></hr>
              <span>Tax: ${tax}</span> <hr></hr>
              <span>
                <strong>Total: ${total}</strong>
              </span>
              <hr></hr>
              {stxte.cart.cartItems.length == 0 ? (
                <button disabled>Payout</button>
              ) : (
                <button onClick={createPayout}>Payout</button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
