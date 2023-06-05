import React from 'react';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {Store} from '../Context/storeContext'

export default function Product(props) {

  const {state, dispatch} = useContext(Store);

  const addToCart = () => {
    
   // if(!inCart()){
      dispatch({type: "ADD_TO_CART", payload: props.value})
    //}   
  } 

  const removeFromCart = () => {
    dispatch({type: "REMOVE_FROM_CART", payload: props.value})
  
  }

  const inCart = (propItem) => {
    const data = state.cart.cartItems;
    if( data.find(item => item._id === propItem.value._id)){
        return true;
    }
    return false;
  }

  return (
    <div className="product">
         
         <Link to={`/product/${props.value.slug}`}>
          <img className="productImg" src={props.value.image} alt={props.value.description}></img>
        </Link>
        <div className="productText">
          <Link to={`/product/${props.value.slug}`}>{props.value.name}</Link>
          <p>${props.value.price}</p>
          {inCart(props) ? <button className="removeCart" onClick={removeFromCart}>Remove from Cart</button> : <button className="addCart" onClick={addToCart}>Add to Cart</button>
          }

        </div>   
    </div>
  )
}
