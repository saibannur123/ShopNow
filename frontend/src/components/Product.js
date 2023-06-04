import React from 'react'

export default function Product(props) {
  return (
    <div className="product">
         
        <img className="productImg" src={props.value.image} alt={props.value.description}></img>
        <div className="productText">
        <a href="">{props.value.name}</a>
        <p>${props.value.price}</p>
        <button>Add to Cart</button>
        </div>
    
    
    </div>
  )
}
