import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { Store } from "../Context/storeContext";
import { Link } from "react-router-dom";


const reducer = (state, action) => {
    
    switch(action.type){
        case "ORDERS_REQUEST":
            return {...state, loader: true}
        case "ORDERS_SUCCESS":
            return {...state, orders: action.payload, loader: false}
        case "ORDERS_ERROR":
            return {...state, loader: false, error: action.payload}
        default:
            return state;
    }
}


export default function OrderHistoryScreen() {

  const { state: stxte, dispatch: dxspatch } = useContext(Store);
  const [state, dispatch] = useReducer(reducer, { 
    loader: true,
    orders: {},
    error: '',
    });


  //console.log("State", stxte);


  useEffect(() => {
    const fetchOrders = async () => {
        dispatch({type: "ORDERS_REQUEST"})

      try {
        const response = await axios.get(
          "http://localhost:3019/api/orders/history",
          {
            params: {
              user: stxte.userInfo.user_id,
            },
            headers: {
              authorization: `Bearer ${stxte.userInfo.token}`,
            },
          }
        );

        dispatch({type: "ORDERS_SUCCESS", payload: response.data.orders})

      } catch (err) {
        dispatch({type: "ORDERS_ERROR", payload: err})
        alert("Error fetch order");

      }
    };

    fetchOrders();
  }, []);

  return ( 
    <>
    {state.loader ? <h1>LOADING</h1> : <div className="OrderHistoryScreen">
        
        <h1 >Order History</h1>
        
        <div className="OrderHistoryTable">
         <table>
         <tbody>
            <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
            </tr>
            
            { 

             state.orders.map((item, key) => 
                <tr key={key}>
                <td>{item._id}</td>
                <td>{(item.createdAt).substring(0,10)}</td>
                <td>${item.totalPrice}</td>
                <td>{item.isPaid ? "Yes" : "No"}</td>
                <td>{item.isDelivered ? "Yes" : "No"}</td>
                <td><Link to={`/order/${item._id}`}>ACTION</Link></td>
                
                 </tr> 
                
                )
             }
             </tbody>
        </table>

    </div>
 
    
    
    </div>
}
    </>
            
  );
}
