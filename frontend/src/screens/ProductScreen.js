import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Store } from "../Context/storeContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loader: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loader: false,
        product: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: "error fetching data",
        loader:false,
      };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const param = useParams().slug;
  const [state, dispatch] = useReducer(reducer, {
    loader: false,
    product: [],
    error: "",
  });
  const { state: stxte, dispatch: dxpatch } = useContext(Store);

  const addToCart = () => {
    dxpatch({ type: "ADD_TO_CART", payload: state.product });
  };

  const removeFromCart = () => {
    dxpatch({ type: "REMOVE_FROM_CART", payload: state.product });
  };

  const inCart = (propItem) => {
    console.log("State", state);
    console.log("Stxte", stxte);

    const data = stxte.cart.cartItems;
    if (data.find((item) => item._id === propItem._id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:3019/api/slug/${param}`
        );
        console.log("SUCCESS");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        console.log("ERROR");
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    fetchProduct();
  }, [param]);

  return (
    <div className="productScreen">
      {state.loader ? (
        <div className="loader">Loading...</div>
      ) : state.error !== "" ? (
      
      <div className="productScreenNotFound">
        <h3>Product not found</h3>
      </div>):(
        <Container className="productScreenContainer">
          <Row>
            <Col lg={6} className="productScreenImg">
              <img src={state.product.image} alt={state.product.name} />
            </Col>
            <Col lg={6} className="productScreenContent">
              <h1>
                {state.product.name}
                <br></br>
                <hr></hr>
              </h1>
              <h5>Price: ${state.product.price}</h5>
              <hr></hr>
              <h5>
                Review: <strong>{state.product.rating} / 5</strong> (
                {state.product.numReviews} Reviews)
              </h5>{" "}
              <hr></hr>
              <h5>Description: {state.product.description}</h5> <hr></hr>
              <h5>
                Status:{" "}
                {state.product.inStock > 0 ? (
                  <span variant="success" className="badge bg-success">
                    Available
                  </span>
                ) : (
                  <span variant="danger" className="badge bg-danger">
                    Out of Stock
                  </span>
                )}
              </h5>{" "}
              <hr></hr>
              {inCart(state.product) ? (
                <button className="removeCart" onClick={removeFromCart}>
                  Remove from Cart
                </button>
              ) : (
                <button className="addCart" onClick={addToCart}>
                  Add to Cart
                </button>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
