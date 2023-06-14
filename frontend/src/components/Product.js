import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Context/storeContext";
import axios from "axios";

export default function Product(props) {
  const { state, dispatch } = useContext(Store);

  // const addToCart = () => {
  //   // if(!inCart()){
  //   dispatch({ type: "ADD_TO_CART", payload: props.value });
  //   //}
  // };
  const { product } = props;


  const addToCart = async (item) => {
    console.log("ITEM", item)
    console.log(state.cart)
    const existItem = state.cart.cartItems.find((x) => x.value._id === props.value._id);
    console.log("cart", state.cart.cartItems)
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // TODO: Introduce this code below similar to AMAZON website example
    // TODO: BUG NOT READING IN/LOADING IN ALL DATA INTO CART!!
   const { data } = await axios.get(`http://localhost:3019/api/products/${item.value._id}`);
   console.log("data", data);
   console.log(quantity);


    if (data.inStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: props.value });
  };

  const inCart = (propItem) => {
    const data = state.cart.cartItems;
    if (data.find((item) => item._id === propItem.value._id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="product">
     
      <Link to={`/product/${props.value.slug}`}>
        <img
          className="productImg"
          src={props.value.image}
          alt={props.value.description}
        ></img>
      </Link>
      <div className="productText">
        <Link to={`/product/${props.value.slug}`}>{props.value.name}</Link>
        <p>${props.value.price}</p>
        {/* {inCart(props) ? (
          <button className="removeCart" onClick={removeFromCart}>
            Remove from Cart
          </button>
        ) : (
          <button className="addCart" onClick={addToCart}>
            Add to Cart
          </button>
        )} */}
            <button className="addCart" onClick={() => addToCart(props)}>
            Add to Cart
          </button>
      </div>
    </div>
  );
}
