import React from 'react'
import {Link} from 'react-router-dom'

export default function Product(props) {
  return (
    <div className="product">
         
         <Link to={`/${props.value.slug}`}>
          <img className="productImg" src={props.value.image} alt={props.value.description}></img>
        </Link>
        <div className="productText">
        <Link to={`/${props.value.slug}`}>{props.value.name}</Link>
        <p>${props.value.price}</p>
        <button className="addCart">Add to Cart</button>
        </div>
    
    
    </div>
  )
}
