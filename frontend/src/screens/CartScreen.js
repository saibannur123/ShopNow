import React from "react";
import { Store } from "../Context/storeContext";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { HiShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const cartItems = state.cart.cartItems;
  const [totalCost, setTotalCost] = useState();
  const navigate = useNavigate();

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const incQuantity = (item) => {
    const quantity = item.quantity + 1;
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const decQuantity = (item) => {
    const quantity = item.quantity - 1;
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const redirectToShipping = () => {
    window.location.href = "/shipping";
  };

  useEffect(() => {
    let tempPrice = 0;
    cartItems.map((item) => (tempPrice += item.value.price * item.quantity));
    setTotalCost(tempPrice);
  }, [cartItems]);

  return (
 
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img
              className="cart-img"
              src={item.value.image}
              alt={item.value.name}
            />

            <div className="cart-content">
              <span className="cart-name">
                <Link to={"/product/" + item.value.slug}>
                  {item.value.name}
                </Link>
              </span>

              <span className="cart-quantity">
                {item.quantity === 1 ? (
                  <button className="cart-icon-disabled" disabled>
                    <AiOutlineMinus />
                  </button>
                ) : (
                  <button
                    className="cart-icon"
                    onClick={() => decQuantity(item)}
                  >
                    <AiOutlineMinus />
                  </button>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;{item.quantity}&nbsp;&nbsp;&nbsp;&nbsp;
                {/* TODO: Change so it pulls  inStock from database so it is the latest */}
                {item.quantity === item.value.inStock ? (
                  <button className="cart-icon-disabled" disabled>
                    <AiOutlinePlus />
                  </button>
                ) : (
                  <button
                    className="cart-icon"
                    onClick={() => incQuantity(item)}
                  >
                    <AiOutlinePlus />
                  </button>
                )}
              </span>

              <span className="cartScreenPrice cart-price">
                ${item.value.price.toFixed(2)}
              </span>

              <button
                className="cart-icon cart-trash"
                onClick={() => removeItem(item)}
              >
                <BsTrashFill />
              </button>
            </div>
          </div>
        ))}
      </div>

      {state.cart.cartItems.length !== 0 ? (
        <div className="cart-calculation">
          <div className="cart-calc-container">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span className="cart-total">
                <strong>${totalCost?.toFixed(2)}</strong>
              </span>
              <p>
                {" "}
                <span>Items:</span>
                <span className="cart-total">
                  <strong>
                    {state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </strong>
                </span>
              </p>
            </div>
            <div>
              <button
                className="cart-checkout"
                onClick={() => redirectToShipping()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Alert variant="info" className="cart-error">
            Looks like your cart is empty!
          </Alert>

          <div className="cart-screen-empty">
            <HiShoppingBag className="cart-screen-icon" />
            <h4>Click the button below to continue shopping at ShopNow</h4>
            <button onClick={() => navigate("/")} className="cart-shop">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
