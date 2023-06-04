import React from 'react';
import Data from '../data';
import Product from "../components/Product";

export default function Home() {
  return (
    <div>

      <div className="productsContainer">
        {Data.products.map((data, index) => 
          <Product value={data} key={index}/>

        )}
      </div>



    </div>
  )
}
