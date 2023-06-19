import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Context/storeContext";
import axios from "axios";

export default function Product(props) {
  const { state, dispatch } = useContext(Store);


  // TODO: WHEN CHANGING THE QUANTITY FEATURE, I MAY HAVE INTRODUCED SOME BUGS! WATCH OUT
  const addToCart = async (item) => {
    const existItem = state.cart.cartItems.find((x) => x.value._id === props.value._id);
    console.log("cart", state.cart.cartItems)
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // TODO: Introduce this code below similar to AMAZON website example
    // TODO: BUG NOT READING IN/LOADING IN ALL DATA INTO CART!!
   const { data } = await axios.get(`http://localhost:3019/api/products/${item.value._id}`);

    if (data.inStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

  // const removeFromCart = () => {
  //   dispatch({ type: "REMOVE_FROM_CART", payload: props.value });
  // };

  // const inCart = (propItem) => {
  //   const data = state.cart.cartItems;
  //   if (data.find((item) => item._id === propItem.value._id)) {
  //     return true;
  //   }
  //   return false;
  // };

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
            <button className="addCart" onClick={() => addToCart(props)}>
            Add to Cart
          </button>
      </div>
    </div>
  );
}
